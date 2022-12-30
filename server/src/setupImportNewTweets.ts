import { PULL_INTERVAL_MILLISECONDS } from "./constants";
import { importNewTweets } from "./importNewTweets";

export async function setupImportNewTweets(): Promise<void> {
  await importNewTweets().catch();
  setTimeout(setupImportNewTweets, PULL_INTERVAL_MILLISECONDS);
}
