import {
  ExtensionScope,
  WindowWithExtensionFunction,
} from "@zettelproject/terminal-extension-api";
import { PageExtensionData } from "../../shared/types";

void ((window as WindowWithExtensionFunction).extensionFunction = function (
  api
) {
  this.while("activated", function ({ activatedApi }) {
    this.while("signedIn", function ({ signedInApi }) {
      this.while("pagePanelRendered", function ({ pagePanelRenderedApi }) {
        if (!this.scopes.includes(ExtensionScope.Page)) return;

        let pageExtensionData: PageExtensionData;

        const loadingIndicatorRegistration = this.register(
          pagePanelRenderedApi.registry.loadingIndicator(
            "Getting twitter user data..."
          ),
          { initiallyInactive: true }
        );

        const quickActionRegistration = this.register(
          pagePanelRenderedApi.registry.quickAction({
            title: "Twitter sync v2",
            description: "Synchronize all twitters from a Twitter account", // 'Loading...',
            avatarUrl: api.extensionHeader.avatar.file
              ? api.getFileUrl(api.extensionHeader.avatar.file)
              : api.extensionHeader.avatar.dataUrl,
            disabled: true,
            switchChecked: false,
            async onClick() {
              setDisabled(true);
              await tryToConnect();
              setDisabled(false);
            },
            async onToggleSwitch(checked) {
              setDisabled(true);
              if (checked) {
                await tryToConnect();
              } else {
                await setPageExtensionData(undefined);
              }
              setDisabled(false);
            },
          })
        );

        const tipMessageRegistration = this.register(
          pagePanelRenderedApi.registry.message<PageExtensionData>({
            state: undefined,
            render: ({ state }) => {
              if (!state) return "<p></p>";
              return `
<div>
  <p style="display: flex; align-items: center; gap: 10px;">
    <img src="${api.getFileUrl("idea.png")}" alt="tip" />
    All new tweets of "${state.userName}" are
    automatically imported into this page.
  </p>
  <p>
    Click on the extension's quick action to disable
    the behavior or change the twitter account.
  </p>
</div>
`;
            },
            variant: "information",
          })
        );

        this.register(
          pagePanelRenderedApi.watch(
            (data) =>
              data.page.extensionManagedData[
                api.extensionHeader.id
              ] as PageExtensionData,
            (newValue, oldValue) => applyPageExtensionData(newValue)
          )
        );

        applyPageExtensionData(
          pagePanelRenderedApi.data.page.extensionManagedData[
            api.extensionHeader.id
          ] as PageExtensionData
        );

        function setDisabled(disabled: boolean): void {
          quickActionRegistration.reference.update?.({ disabled });
        }

        function applyPageExtensionData(
          newPageExtensionData: PageExtensionData
        ): void {
          pageExtensionData = newPageExtensionData;
          if (pageExtensionData?.userName && !pageExtensionData.userId) {
            loadingIndicatorRegistration.activate();
          } else {
            loadingIndicatorRegistration.deactivate();
          }
          quickActionRegistration.reference.update?.({
            disabled: false,
            switchChecked: Boolean(pageExtensionData?.userName),
          });
          tipMessageRegistration.reference.update?.({
            hidden: !pageExtensionData,
            state: pageExtensionData,
          });
        }

        async function setPageExtensionData(
          newPageExtensionData: PageExtensionData
        ): Promise<void> {
          try {
            await signedInApi.access.setPageExtensionData<PageExtensionData>(
              pagePanelRenderedApi.target.pageId,
              newPageExtensionData
            );
          } catch {
            // Do nothing!
          }
        }

        async function tryToConnect(): Promise<void> {
          let userName: string;
          try {
            userName = await activatedApi.access.commandBarInputString({
              prompt: "Insert your Twitter user name",
              placeholder: "username",
              initialValue: pageExtensionData?.userName,
            });
          } catch {
            return;
          }
          if (
            userName === pageExtensionData?.userName ||
            (!userName && !pageExtensionData?.userName)
          )
            return;
          await setPageExtensionData(userName ? { userName } : undefined);
        }
      });
    });
  });
});
