import { AppDataSource } from "../db";

import { Channel } from "../entity"

class ChannelRepositories {
  /**
   * create
   */
  // @ts-ignore
  public async create(data): Promise<Channel> {
    const instance = AppDataSource.manager.create(Channel, data);
    const channel = await AppDataSource.manager.save(instance);

    return channel;
  }

  public async getById(telegramId: string): Promise<Channel | null> {
    return await AppDataSource.manager.findOneBy(Channel, { telegramId });
  }

  public async all(): Promise<Channel[]> {
    return await AppDataSource.manager.find(Channel);
  }
}

export default new ChannelRepositories();