import axios from "axios";
import { TWITTER_API_URL, TWITTER_BEARER_TOKEN } from "./constants";

export async function fetchTwitterUserId(
  userName: string
): Promise<string | null> {
  try {
    const response = await axios({
      url: `${TWITTER_API_URL}/users/by/username/${userName}`,
      headers: {
        authorization: `bearer ${TWITTER_BEARER_TOKEN}`,
      },
    });
    const { data }: any = response.data;
    return data?.id ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
