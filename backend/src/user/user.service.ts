import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { E_EMAIL_EXISTS } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) throw new HttpException(E_EMAIL_EXISTS, 400);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
