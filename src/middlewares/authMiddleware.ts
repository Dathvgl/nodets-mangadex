import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { userCollection } from "models/mongo";
import { ObjectId } from "mongodb";
import { jwtSecret } from "routes/api";
import { JwtPayloadExtra, RequestExtra, UserMongo } from "types";

export const authProtect = asyncHandler(
  async (req: RequestExtra, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayloadExtra;
        const _id = new ObjectId(decoded.userId);
        req.user = await userCollection.findOne<UserMongo>({ _id });

        next();
      } catch (error) {
        res.status(401).json({ message: "Not authorized, invalid token" });
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  }
);
