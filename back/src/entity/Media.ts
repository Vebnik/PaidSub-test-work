import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  // @ts-ignore
  base64: string;

  @Column()
  // @ts-ignore
  name: string;

  @ManyToOne(() => Post, (author) => author.medias, { onDelete: "CASCADE" })
  // @ts-ignore
  post: Post;

  @Column({ nullable: true })
  // @ts-ignore
  path: string;
}

