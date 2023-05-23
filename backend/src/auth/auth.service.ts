import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtPayload } from 'src/user/interface/user.interface';
import { E_INCORRECT_CREDENTIALS } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return user;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; username: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!(await user?.validatePassword(password))) {
      throw new HttpException(E_INCORRECT_CREDENTIALS, 400);
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { username: user.username, accessToken };
  }

  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserEntity | undefined> {
    return this.usersService.findById(payload.id);
  }
}
