import fs from "fs";

import { AppDataSource } from "../db";

import { Post, User } from "../entity";
import { PostCreateDTO } from "../interafces/post.interface";
import mediaRepositories from "./media.repositories";
import { DeleteResult } from "typeorm";

class PostRepositories {
  /**
   * create
   */
  public async create(data: PostCreateDTO): Promise<Post> {
    const instance = AppDataSource.manager.create(Post, {
      title: data.title,
      text: data.text,
      date: new Date(data.date),
      isPublic: false,
    });

    const post = await AppDataSource.manager.save(instance);

    fs.mkdir(`${__dirname}/../../data/${post.id}`, (err) => {
      console.error(err);
    });

    for (const file of data.medias) {
      const path = `${__dirname}/../../data/${post.id}/${file.name}`;

      fs.writeFile(
        path,
        file.base64.replace(/^data:image\/png;base64,/, ""),
        "base64",
        (err) => {
          console.error(err);
        }
      );

      await mediaRepositories.create({
        name: file.name,
        base64: file.base64,
        postId: post.id,
        path,
      });
    }

    return post;
  }

  public async getByUser(user: User): Promise<Post | null> {
    return await AppDataSource.manager.findOneBy(Post, { user });
  }

  public async getById(id: number): Promise<Post | null> {
    return await AppDataSource.manager.findOneBy(Post, { id });
  }

  public async all(): Promise<Post[]> {
    return await AppDataSource.manager.find(Post, {
      relations: ["medias"],
    });
  }

  public async updateStatusById(id: number, isPublic: boolean): Promise<void> {
    await AppDataSource.manager.update(Post, { id }, { isPublic });
  }

  public async deleteById(id: number): Promise<DeleteResult> {
    return await AppDataSource.manager.delete(Post, { id });
  }

  public async updateById(
    id: number,
    data: { isPublic: boolean; channelId: string; messageId: string }
  ): Promise<void> {
    await AppDataSource.manager.update(Post, { id }, data);
  }
}

export default new PostRepositories();
