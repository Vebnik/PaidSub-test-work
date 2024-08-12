import { DataSource } from "typeorm";

import { User, Channel, Post, Media } from "../entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "tg_db",
  synchronize: true,
  logging: false,
  entities: [User, Channel, Post, Media],
  subscribers: [],
  migrations: [],
});
