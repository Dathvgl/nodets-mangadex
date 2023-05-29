export type ResultMangadex = {
  result?: "ok" | "error";
};

export type ImageResponseMangadex = ResultMangadex & {
  baseUrl?: string;
  chapter?: {
    hash?: string;
    data?: string[];
    dataSaver?: string[];
  };
};

export type ReCaptchaResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
};
