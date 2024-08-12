import { Router } from "express";

import postRepositories from "../repositories/post.repositories";
import { PostCreateDTO } from "../interafces/post.interface";
import TelegramBot from "node-telegram-bot-api";

const router = Router();

router.get("/post", async (req, res) => {
  try {
    const post = await postRepositories.all();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/post/all", async (req, res) => {
  try {
    const post = await postRepositories.all();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/post/create", async (req, res) => {
  try {
    const postData: PostCreateDTO = req.body

    const post = await postRepositories.create(postData);

    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/post/:id/delete", async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const post = await postRepositories.getById(postId);

    if (!post) throw "Not found post"

    // @ts-ignore
    const client: TelegramBot = req.app.get("tgClient");
    await client.deleteMessage(Number(post.channelId), Number(post.messageId));

    const result = await postRepositories.deleteById(postId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
