import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { EmailEntity } from './email.entity';
import { BaseEntity } from './base-entity';

@Entity()
export class ReplyEntity extends BaseEntity {
  @Column('text')
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.replies)
  user: UserEntity;

  @ManyToOne(() => EmailEntity, (email) => email.replies)
  email: EmailEntity;
}
