import { create } from "zustand";

interface PostCreateDTO {
  title: string;
  date: number;
  text: string | null | undefined;
}

interface User {
  id: number;
}

export interface Post {
  id: number;
  title: string;
  date: Date;
  text: string;
  medias: {
    name: string;
    base64: string;
  }[];
  isPublic: boolean;
  user: User;
}

interface PostStore {
  posts: Post[];
  create: (data: PostCreateDTO) => Promise<Response>;
  all: () => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export const usePostStore = create<PostStore>()((set) => ({
  posts: [],
  create: async (data: PostCreateDTO) => {
    return await fetch("http://localhost:3000/api/v1/post/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  all: async () => {
    const response = await fetch("http://localhost:3000/api/v1/post/all");
    const posts = await response.json();

    return set({ posts });
  },
  delete: async (id: number) => {
    await fetch(`http://localhost:3000/api/v1/post/${id}/delete`, {
      method: "DELETE",
    });
  },
}));
