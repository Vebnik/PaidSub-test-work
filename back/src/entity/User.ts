import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  // @ts-ignore
  telegramId: string;

  @Column()
  // @ts-ignore
  name: string;

  @Column()
  // @ts-ignore
  isActive: boolean;
}
