import { IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  to: string;

  @IsString()
  from: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
