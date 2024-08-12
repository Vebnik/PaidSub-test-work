import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  // @ts-ignore
  telegramId: string;

  @Column()
  // @ts-ignore
  title: string;

  @Column({ type: "timestamptz" })
  // @ts-ignore
  joinDate: Date;

  @Column({ default: true })
  // @ts-ignore
  isActive: boolean;
}
