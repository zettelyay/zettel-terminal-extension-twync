import { ZettelServices, ZettelTypes } from "@zettelproject/api-server";
import { PageExtensionData } from "../../shared/types";
import { ZETTEL_SERVICES_EXTENSION_WS_GET_UPDATES_OPTIONS } from "./constants";
import { importNewTweetsForPage } from "./importNewTweetsForPage";

export function watchForPageChanges(): void {
  const client = new ZettelServices.Extension.Ws.GetUpdates({
    ...ZETTEL_SERVICES_EXTENSION_WS_GET_UPDATES_OPTIONS,
    onMutation(entity) {
      switch (entity.type) {
        case ZettelTypes.Model.Type.Page:
          {
            const page =
              entity as ZettelTypes.Services.Extension.PageEntityForExtension<PageExtensionData>;
            if (page.extensionManagedData?.userName) {
              importNewTweetsForPage(page);
            }
          }
          break;
      }
    },
    onStatusChange(status) {
      console.log("WS Connection Status =", status);
    },
  });
}
