import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class MessageModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;
}
