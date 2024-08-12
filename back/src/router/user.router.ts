import { Router } from "express";

import userRepositories from "../repositories/user.repositories";

const router = Router();

router.get("/user", async (req, res) => {
  try {
    const post = await userRepositories.all();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/user/all", async (req, res) => {
  try {
    const post = await userRepositories.all();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
