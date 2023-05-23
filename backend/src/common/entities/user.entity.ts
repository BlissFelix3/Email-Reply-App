import {
  Entity,
  Column,
  Unique,
  BeforeInsert,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { EmailEntity } from './email.entity';
import { ReplyEntity } from './reply.entity';
import { BaseEntity } from './base-entity';

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => ReplyEntity, (reply) => reply.user)
  replies: ReplyEntity[];

  @OneToMany(() => EmailEntity, (email) => email.user)
  emails: EmailEntity;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
