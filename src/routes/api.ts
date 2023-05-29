import { Router } from "express";
import MangadexRoute from "./mangadex/mangadexRoute";

const router = Router();

router.use("/mangadex", MangadexRoute);

export default router;
