import { config } from "dotenv";
import { MongoClient } from "mongodb";

config();

const mongoClient = new MongoClient(process.env.MONGO_URL ?? "");
mongoClient.connect().then(() => console.log("MongoDB connect"));
const mongoDB = mongoClient.db(process.env.MONGO_DB);

export const userCollection = mongoDB.collection("user");
