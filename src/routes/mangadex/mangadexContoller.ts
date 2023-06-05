import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { ImageResponseMangadex } from "types";

const baseUrl = "https://api.mangadex.org";

export abstract class MangadexController {
  static async getHome(req: Request, res: Response) {
    try {
      const newsChapter = (await axios.get(`${baseUrl}/manga`)).data;
      const popularManga = (
        await axios.get(`${baseUrl}/manga`, {
          params: { order: { year: "desc", followedCount: "desc" } },
        })
      ).data;
      res.json({ popularManga, newsChapter });
    } catch {
      res.status(500).json({});
    }
  }

  static async getMangaSearch(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const response = await axios.get(`${baseUrl}/manga`, {
        params: JSON.parse(query as string),
      });
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getManga(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(`${baseUrl}/manga/${id}`);
      res.json(response.data);
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

  static async getMangaFeed(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { query } = req.query;
      const response = await axios.get(`${baseUrl}/manga/${id}/feed`, {
        params: JSON.parse(query as string),
      });
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }

  static async getMangaAggregate(req: Request, res: Response) {
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

  static async getImage(req: Request, res: Response) {
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

  static async getMangaTag(req: Request, res: Response) {
    try {
      const response = await axios.get(`${baseUrl}/manga/tag`);
      res.json(response.data);
    } catch {
      res.status(500).json({});
    }
  }
}
