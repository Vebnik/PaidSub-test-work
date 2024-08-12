import { IConfig } from "../interafces";

export class Config {
  getConfig(): IConfig {
    if (!process.env.TG_BOT_KEY) throw "Not found TG_BOT_KEY in .env";

    return {
      tgBotKey: process.env.TG_BOT_KEY,
      port: Number(process.env.PORT) || 3000,
    };
  }
}

export default new Config();