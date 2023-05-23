import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    const user = this.authService.signUp(userDto);
    return {
      success: true,
      data: {
        username: (await user).username,
        message: 'Signup Successful',
      },
    };
  }

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }
}
