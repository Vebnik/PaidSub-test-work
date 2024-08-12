import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";

import { User } from "./User";
import { Media } from "./Media";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  // @ts-ignore
  title: string;

  @Column({ nullable: true })
  // @ts-ignore
  channelId: string;

  @Column({ nullable: true })
  // @ts-ignore
  messageId: string;

  @Column()
  // @ts-ignore
  date: Date;

  @Column({ nullable: true })
  // @ts-ignore
  text: string;

  @Column({ default: false })
  // @ts-ignore
  isPublic: boolean;

  @OneToMany(() => Media, (media) => media.post, { onDelete: "CASCADE" })
  // @ts-ignore
  medias: Media[];

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  // @ts-ignore
  user: User;
} 
