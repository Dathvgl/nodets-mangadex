import { Router } from "express";
import { MangadexModel } from "./mangadexContoller";

const router = Router();

router.get("/home", MangadexModel.getHome);
router.get("/manga/:id", MangadexModel.getManga);
router.get("/mangaTag", MangadexModel.getMangaTag);
router.get("/mangaSearch", MangadexModel.getMangaSearch);
router.get("/mangaFeed/:id", MangadexModel.getMangaFeed);
router.get("/mangaAggregate/:id", MangadexModel.getMangaAggregate);
router.get("/cover/:id", MangadexModel.getCover);
router.get("/image/:id", MangadexModel.getImage);
router.post("/auth", MangadexModel.postAuth);

export default router;
