import { importNewTweetsForPage } from "./importNewTweetsForPage";
import { zettelExtensionRestService } from "./zettelExtensionRestService";

export async function importNewTweets(): Promise<void> {
  const { pages } = await zettelExtensionRestService.getPages({
    withExtensionInstalled: true,
  });
  await Promise.all(pages.map(importNewTweetsForPage));
}
