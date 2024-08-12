import { AppDataSource } from "../db";

import { Post, User } from "../entity";

class UserRepositories {
  /**
   * create
   */
  // @ts-ignore
  public async create(data): Promise<User> {
    const instance = AppDataSource.manager.create(User, data);
    const user = await AppDataSource.manager.save(instance);

    return user;
  }

  public async getById(telegramId: string): Promise<User | null> {
    return await AppDataSource.manager.findOneBy(User, { telegramId });
  }

  public async all(): Promise<User[]> {
    return await AppDataSource.manager.find(User);
  }
}

export default new UserRepositories();
