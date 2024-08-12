import { Router } from "express";

import channelRepositories from "../repositories/channel.repositories";
import { PostCreateDTO } from "../interafces/post.interface";

const router = Router();

router.get("/channel/all", async (req, res) => {
  try {
    const channels = await channelRepositories.all();

    res.json(channels);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
