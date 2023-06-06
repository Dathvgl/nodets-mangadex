import bycrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userCollection } from "models/mongo";
import { ObjectId } from "mongodb";
import { jwtSecret } from "routes/api";
import { RequestExtra, UserMongo } from "types";

const expire = 3 * 24 * 60 * 60;

const initToken = (userId: string) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: expire });
};

const cookieToken = (res: Response, id: string) => {
  res.cookie("jwt", initToken(id), {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
    maxAge: expire * 1000,
  });
};

const initBycrypt = async (str: string) => {
  const salt = await bycrypt.genSalt(10);
  return await bycrypt.hash(str, salt);
};

export abstract class UserController {
  static init(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const newPassword = await initBycrypt(password);
      const user = await userCollection
        .insertOne({ email, password: newPassword })
        .then((result) =>
          userCollection.findOne<UserMongo>({ _id: result.insertedId })
        );

      if (!user) throw Error("User null");
      cookieToken(res, user._id.toString());
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(401).send("Invalid email or password");
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userCollection.findOne<UserMongo>({ email });
      if (!user) throw Error("User null");
      const match = await bycrypt.compare(password, user.password);

      if (!match) {
        res.status(401).send("Wrong password");
      } else {
        cookieToken(res, user._id.toString());
        res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(401).send("Wrong email or password");
    }
  }

  static logout(req: Request, res: Response) {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).send("User logged out");
  }

  static getProfile(req: RequestExtra, res: Response) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log(error);
      res.status(404).send("User not found");
    }
  }

  static async putProfile(req: RequestExtra, res: Response) {
    const updates = req.body as UserMongo;
    let password = undefined;

    try {
      if (updates.password) {
        password = await initBycrypt(updates.password);
      }

      const doc = await userCollection.findOneAndUpdate(
        { _id: new ObjectId(req.user?._id) },
        { $set: { ...updates, password } }
      );

      const user = doc.value as UserMongo | null;
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).send("User not found");
    }
  }
}
