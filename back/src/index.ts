import "reflect-metadata";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import BotClient from "./bot";
import config from "./utils/config";
import { AppDataSource } from "./db";

// app routes
import { routers } from "./router"
// import songRouter from "./routers/song";

async function main(): Promise<undefined> {
  // init env and config
  dotenv.config();
  const cfg = config.getConfig();

  // app inition
  const app = express();
  const port = cfg.port;

  // db init
  await AppDataSource.initialize()
    .then(() => {
      console.log("⚡️[db]: Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("⚡️[db]: Error during Data Source initialization", err);
    });

  // app predefenition
  app.use(express.json({ limit: "52428800kb" }));
  app.use(bodyParser.json({ limit: "52428800kb" }));
  app.use(bodyParser.raw({ limit: "52428800kb" }));
  app.use(cors());

  // init tg bot
  const client = BotClient.init(cfg.tgBotKey);

  app.set("tgClient", client);

  // expose routes
  app.use("/api/v1", routers.post);
  app.use("/api/v1", routers.channel);
  app.use("/api/v1", routers.user);

  // app listen
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();
