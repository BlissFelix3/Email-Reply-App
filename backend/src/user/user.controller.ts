import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from 'src/common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<UserEntity | undefined> {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserEntity | undefined> {
    return this.usersService.findById(id);
  }
}
