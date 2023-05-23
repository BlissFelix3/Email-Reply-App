import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email is required!' })
  @IsEmail({}, { message: ' Provide a valid email address!' })
  email: string;

  @IsNotEmpty({ message: 'password is required!' })
  password: string;
}
