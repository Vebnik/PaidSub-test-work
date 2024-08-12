import { AppDataSource } from "../db";

import { Post, Media } from "../entity";
import { MediaCreateDTO } from "../interafces/media.interface";
import postRepositories from "./post.repositories";

class PostRepositories {
  /**
   * create
   */
  public async create(data: MediaCreateDTO): Promise<Media> {
    const post = await postRepositories.getById(data.postId);

    if (!post) throw "Nor found post";

    const instance = AppDataSource.manager.create(Media, {
      name: data.name,
      base64: data.base64,
      post: post,
      path: data.path,
    });
    const media = await AppDataSource.manager.save(instance);

    return media;
  }

  public async all(): Promise<Media[]> {
    return await AppDataSource.manager.find(Media);
  }
}

export default new PostRepositories();
