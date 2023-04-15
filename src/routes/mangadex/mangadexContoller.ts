import axios from "axios";
import { Request, Response } from "express";
import { ImageResponseMangadex } from "../../types";

const baseUrl = "https://api.mangadex.org";

export abstract class MangadexModel {
  static async getHome(req: Request, res: Response) {
    try {
      const newsChapter = (await axios.get(`${baseUrl}/manga`)).data;
      const popularManga = { result: "error" };
      // const popularManga = (
      //   await axios.get(`${baseUrl}/manga`, {
      //     params: { order: { year: "desc", followedCount: "desc" } },
      //   })
      // ).data;
      res.json({ popularManga, newsChapter });
    } catch {
      res.status(500).json({});
    }
  }

  static async getSearch(req: Request, res: Response) {
    try {
      const { title } = req.query;
      const response = await axios.get(`${baseUrl}/manga`, {
        params: { title },
      });
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getManga(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { sort } = req.query;

      const manga = (await axios.get(`${baseUrl}/manga/${id}`)).data;
      const chapters = (
        await axios.get(`${baseUrl}/manga/${id}/feed`, {
          params: { order: { volume: sort, chapter: sort } },
        })
      ).data;
      res.json({ manga, chapters });
    } catch {
      res.status(500).json({});
    }
  }

  static async getCover(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(`${baseUrl}/cover/${id}`);
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getFeed(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(`${baseUrl}/manga/${id}/feed`);
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getChapter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { limit } = req.query;
      const response = await axios.get(`${baseUrl}/manga/${id}/feed`, {
        params: { limit, order: { updatedAt: "desc" } },
      });
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getChapterAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lang } = req.query;
      const response = await axios.get(`${baseUrl}/manga/${id}/aggregate`, {
        params: { translatedLanguage: [lang] },
      });
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getImageAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: ImageResponseMangadex = (
        await axios.get(`${baseUrl}/at-home/server/${id}`)
      ).data;

      if (data.result == "ok") {
        const { baseUrl, chapter } = data;
        const hash = chapter?.hash ?? "";
        const dataSaver = chapter?.dataSaver ?? [];

        res.json({
          data: dataSaver.map(
            (item) => `${baseUrl}/data-saver/${hash}/${item}`
          ),
        });
      } else {
        res.status(500).json({});
      }
    } catch {
      res.status(500).json({});
    }
  }
}
