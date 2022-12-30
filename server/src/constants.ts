import { ZettelServices } from "@zettelproject/api-server";

// Change this flag according the workflow:
export const LOCAL_DEVELOPMENT = false;

export const EXTENSION_ACCESS_KEY = LOCAL_DEVELOPMENT
  ? "bfd944f3-c4ec-4365-9d00-d6a5a901d8cf"
  : "d61b3f97-d724-483d-aee6-2d230136b8bc";

export const ZETTEL_SERVICES_EXTENSION_REST_OPTIONS: ZettelServices.Extension.Rest.Options =
  {
    extensionAccessKey: EXTENSION_ACCESS_KEY,
    extensionRestApiBaseUrl: LOCAL_DEVELOPMENT
      ? "http://localhost:3001"
      : undefined, // To the default base URL
  };
export const ZETTEL_SERVICES_EXTENSION_WS_GET_UPDATES_OPTIONS: ZettelServices.Extension.Ws.GetUpdates.Options =
  {
    extensionAccessKey: EXTENSION_ACCESS_KEY,
    extensionWsApiBaseUrl: LOCAL_DEVELOPMENT
      ? "ws://localhost:3001"
      : undefined, // To the default base URL
    startInitially: true,
    retryConnectionTimeoutMilliseconds: 10 * 1000,
  };

export const PULL_INTERVAL_MILLISECONDS = 2 * 60 * 1000;

export const TWITTER_API_URL = "https://api.twitter.com/2";
export const TWITTER_API_KEY = "i0Qh25zNKDDgQgItrDO4WVqQ3";
export const TWITTER_API_KEY_SECRET =
  "QRDZhDkbT3IpMAukMkimFQ6gwpu19BK4aTUfVWoNbiiJOEjesu";
export const TWITTER_BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAPrkgAEAAAAABiiWNzn4UzSg0hKMQXKJZdGPi30%3DqxlJN0ypATjXXDdeR1eykjvnU9NNoFGhS3rPS79DPIbJcdV74F";
