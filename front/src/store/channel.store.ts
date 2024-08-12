import { create } from "zustand";

export interface Channel {
  id: number;
  telegramId: string;
  title: string;
  joinDate: Date;
  isActive: boolean;
}

interface PostStore {
  channels: Channel[];
  all: () => Promise<void>;
}

export const useChannelStore = create<PostStore>()((set) => ({
  channels: [],
  all: async () => {
    const response = await fetch("http://localhost:3000/api/v1/channel/all");
    const channels = await response.json();

    return set({ channels });
  },
}));
