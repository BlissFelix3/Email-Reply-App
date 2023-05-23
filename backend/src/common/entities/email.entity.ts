import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ReplyEntity } from './reply.entity';
import { BaseEntity } from './base-entity';
import { Exclude } from 'class-transformer';

@Entity('emails')
export class EmailEntity extends BaseEntity {
  @Column()
  subject: string;

  @Column('text')
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.emails)
  user: UserEntity;

  @OneToMany(() => ReplyEntity, (reply) => reply.email)
  replies: ReplyEntity[];

  @Exclude()
  @Column()
  userId: string;
}
