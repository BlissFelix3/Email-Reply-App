import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required!' })
  username: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  @IsString()
  password: string;
}
