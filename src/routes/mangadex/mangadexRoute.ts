import { Router } from "express";
import { MangadexController } from "./mangadexContoller";

const router = Router();

router.get("/home", MangadexController.getHome);
router.get("/manga/:id", MangadexController.getManga);
router.get("/mangaTag", MangadexController.getMangaTag);
router.get("/mangaSearch", MangadexController.getMangaSearch);
router.get("/mangaFeed/:id", MangadexController.getMangaFeed);
router.get("/mangaAggregate/:id", MangadexController.getMangaAggregate);
router.get("/cover/:id", MangadexController.getCover);
router.get("/image/:id", MangadexController.getImage);

export default router;
