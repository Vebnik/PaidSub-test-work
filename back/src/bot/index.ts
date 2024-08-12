import TelegramBot, { InputMedia } from "node-telegram-bot-api";

import userRepositories from "../repositories/user.repositories";
import postRepositories from "../repositories/post.repositories";
import channelRepositories from "../repositories/channel.repositories";

class BotClient {
  client: TelegramBot | undefined;
  token: string | undefined;

  /**
   * init tg bot instance
   */
  public init(token: string): TelegramBot {
    this.token = token;
    this.client = new TelegramBot(token, { polling: true });

    console.log("⚡️[bot] Inited client");

    this.initHandlers();
    this.initTasks();

    return this.client;
  }

  /**
   * init tg event handlers
   */
  private initHandlers() {
    if (!this.client) throw "Not found client";

    this.client.on("my_chat_member", async (event) => {
      const channel = await channelRepositories.getById(
        event.chat.id.toString()
      );

      if (channel) {
        console.log(`⚡️[bot] Existed channel: ${channel.title}`);
        // @TODO Implement update channel
      } else {
        const data = {
          telegramId: event.chat.id.toString(),
          title: event.chat.title || "No name",
          joinDate: new Date(event.date * 10 ** 3),
          isActive: event.new_chat_member.status === "left" ? false : true,
        };

        await channelRepositories.create(data);
      }
    });

    this.client.on("message", async (event) => {
      if (event.text?.includes("/start")) {
        const user = await userRepositories.getById(
          event.from?.id.toString() || ""
        );

        if (user) {
          console.log(`⚡️[bot] Existed user: ${user.name}`);
        } else {
          await userRepositories.create({
            telegramId: event.from?.id.toString(),
            isActive: true,
            name: event.from?.username || "No name",
          });
        }
      }
    });

    console.log("⚡️[bot] Inited handlers");
  }

  /**
   * init tg bg tasks
   */
  private initTasks() {
    setInterval(async () => {
      const posts = (await postRepositories.all()).filter(
        (post) => !post.isPublic && new Date() > post.date
      );
      const channels = await channelRepositories.all();

      for (const post of posts) {
        for (const channel of channels) {
          const chat = await this.client?.getChat(channel.telegramId);
          const text = `${post.title}\n${post.text}`;

          if (!chat?.id) throw "Not found chat id";

          const message = await this.client?.sendPhoto(
            chat?.id,
            post.medias[0].path,
            { caption: text }
          );

          if (!message) throw "Message not sended";

          await postRepositories.updateById(post.id, {
            isPublic: true,
            channelId: channel.telegramId,
            messageId: message.message_id.toString(),
          });
        }
      }

      console.log(
        `⚡️[bot - tasks] Find posts: ${posts.length} | channels: ${channels.length}`
      );
    }, 5000);

    console.log("⚡️[bot] Inited tasks");
  }
}

export default new BotClient();
