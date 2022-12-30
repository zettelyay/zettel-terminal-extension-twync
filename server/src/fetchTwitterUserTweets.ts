import axios from "axios";
import { TWITTER_API_URL, TWITTER_BEARER_TOKEN } from "./constants";
import { Tweet } from "./types";

export async function fetchTwitterUserTweets(
  userId: string,
  lastSynchronizedTimestamp?: string
): Promise<Tweet[] | null> {
  try {
    const response = await axios({
      url: `${TWITTER_API_URL}/users/${userId}/tweets?tweet.fields=created_at&max_results=10${
        lastSynchronizedTimestamp
          ? `&start_time=${lastSynchronizedTimestamp}`
          : ""
      }`,
      headers: {
        authorization: `bearer ${TWITTER_BEARER_TOKEN}`,
      },
    });
    const { data }: any = await response.data;
    return data || [];
  } catch (error) {
    console.error(error);
    return null;
  }
}
