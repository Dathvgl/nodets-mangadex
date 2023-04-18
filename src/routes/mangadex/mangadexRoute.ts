import { Router } from "express";
import { MangadexModel } from "./mangadexContoller";

const router = Router();

router.get("/home", MangadexModel.getHome);
router.get("/search/", MangadexModel.getSearch);
router.get("/manga/:id", MangadexModel.getManga);
router.get("/mangaChapter/:id", MangadexModel.getMangaChapter);
router.get("/cover/:id", MangadexModel.getCover);
router.get("/feed/:id", MangadexModel.getFeed);
router.get("/chapter/:id", MangadexModel.getChapter);
router.get("/chapterAll/:id", MangadexModel.getChapterAll);
router.get("/image/:id", MangadexModel.getImageAll);

export default router;
