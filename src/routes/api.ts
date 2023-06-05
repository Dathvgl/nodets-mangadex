import { Router } from "express";
import UserRoute from "./user/userRoute";
import MangadexRoute from "./mangadex/mangadexRoute";

export const jwtSecret = process.env.JWT_SECRET ?? "fs-jwt";

const router = Router();

router.use("/user", UserRoute);
router.use("/mangadex", MangadexRoute);

export default router;
