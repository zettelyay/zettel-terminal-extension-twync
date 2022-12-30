import { ZettelTypes } from "@zettelproject/api-server";
import { PageExtensionData } from "../../shared/types";
import { fetchTwitterUserId } from "./fetchTwitterUserId";
import { fetchTwitterUserTweets } from "./fetchTwitterUserTweets";
import { Tweet } from "./types";
import { zettelExtensionRestService } from "./zettelExtensionRestService";

export async function importNewTweetsForPage(
  page: ZettelTypes.Services.Extension.PageEntityForExtension<PageExtensionData>
): Promise<void> {
  let extensionManagedData = page.extensionManagedData as PageExtensionData;
  try {
    if (!extensionManagedData?.userName) return;

    if (!extensionManagedData.userId) {
      const userId = await fetchTwitterUserId(extensionManagedData.userName);
      if (!userId) return;
      extensionManagedData = { ...extensionManagedData, userId };
    }

    const tweets = await fetchTwitterUserTweets(
      extensionManagedData.userId!,
      extensionManagedData.lastSynchronizedTimestamp
    );
    if (!tweets || tweets.length === 0) return;

    const lastTweet: Tweet | undefined = tweets[0];
    if (
      lastTweet.created_at !== extensionManagedData.lastSynchronizedTimestamp
    ) {
      extensionManagedData = {
        ...extensionManagedData,
        lastSynchronizedTimestamp: lastTweet.created_at,
      };
    }

    await Promise.all(
      tweets
        .filter(
          (tweet) =>
            tweet.created_at !== extensionManagedData?.lastSynchronizedTimestamp
        )
        .map((tweet) =>
          zettelExtensionRestService.addCard({
            card: {
              ownerId: page.ownerId,
              pageId: page.id,
              text: tweet.text,
            },
          })
        )
    );
  } finally {
    if (extensionManagedData !== page.extensionManagedData) {
      await zettelExtensionRestService.setPageExtensionManagedData({
        pageId: page.id,
        data: extensionManagedData,
      });
    }
  }
}
