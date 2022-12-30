export type PageExtensionData =
  | undefined
  | {
      readonly userName: string;
      readonly userId?: string;
      readonly lastSynchronizedTimestamp?: string;
    };
