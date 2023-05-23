import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailEntity } from 'src/common/entities/email.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import { ReplyEntity } from 'src/common/entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailEntity, UserEntity, ReplyEntity])],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
