import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailEntity } from 'src/common/entities/email.entity';
import { UserEntity } from 'src/common/entities/user.entity';
import { ReplyEntity } from 'src/common/entities/reply.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { SES } from 'aws-sdk';

@Injectable()
export class EmailService {
  private ses: SES;
  constructor(
    @InjectRepository(EmailEntity)
    private emailRepository: Repository<EmailEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ReplyEntity)
    private readonly replyRepository: Repository<ReplyEntity>,
  ) {
    // this.ses = new SES({
    //   apiVersion: '2010-12-01',
    //   endpoint: 'http://localstack:4579',
    //   region: 'us-east-1',
    //   accessKeyId: 'test',
    //   secretAccessKey: 'test',
    // });
  }

  async createEmail(
    username: string,
    emailDto: CreateEmailDto,
  ): Promise<EmailEntity> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    const recipientUser = await this.userRepository.findOne({
      where: { email: emailDto.to },
    });

    if (!recipientUser) {
      throw new NotFoundException('Recipient email not found, please sign up');
    }

    const newEmail = this.emailRepository.create({ ...emailDto, user: user });

    await this.emailRepository.save(newEmail);

    return newEmail;
  }

  async getEmails(username: string): Promise<EmailEntity[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return this.emailRepository.find({ where: { userId: user.id } });
  }

  async getEmailById(username: string, id: string): Promise<EmailEntity> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return this.emailRepository.findOne({ where: { id: id, userId: user.id } });
  }

  async replyEmail(
    username: string,
    emailId: string,
    body: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    const email = await this.emailRepository.findOne({
      where: { id: emailId },
    });

    if (email) {
      const reply = new ReplyEntity();
      reply.body = body;
      reply.user = user;
      reply.email = email;

      await this.replyRepository.save(reply);
      return { message: 'Reply has been sent.' };
    } else {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }
  }
}
