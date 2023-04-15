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
