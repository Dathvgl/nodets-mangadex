import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export type JwtPayloadExtra = JwtPayload & {
  userId: string;
};

export type RequestExtra = Request & {
  user?: UserMongo | null;
};

export type UserMongo = {
  _id: string;
  email: string;
  password: string;
};
