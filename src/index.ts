import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { Application } from "express";
import { Server } from "http";
import ApiRoute from "routes/api";

config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", ApiRoute);

app.get("/", async (req, res) => {
  res.send("Hello from ts");
});

app.get("*", async (req, res) => {
  res.status(500).json({});
});

const server: Server = app.listen(port, () => {
  console.log(`Ứng dụng: http://localhost:${port}/`);
});
