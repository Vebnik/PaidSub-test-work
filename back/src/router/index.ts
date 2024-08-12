import postRouter from "./post.router";
import channelRouter from "./channel.router";
import userRouter from "./user.router";

export const routers = {
  post: postRouter,
  channel: channelRouter,
  user: userRouter,
};