export interface PostCreateDTO {
  title: string;
  text: string;
  date: Date;
  medias: {
    name: string,
    base64: string
  }[];
  user: string | undefined;
}