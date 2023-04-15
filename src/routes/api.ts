import { Router } from "express";
import MangadexRoute from "./mangadex/mangadexRoute";

// try {
// } catch {
//   res.status(500).json({});
// }

const router = Router();

router.use("/mangadex", MangadexRoute);

export default router;
