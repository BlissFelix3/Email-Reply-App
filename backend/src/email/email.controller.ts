import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateEmailDto } from './dto/create-email.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('emails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createEmail(@Request() request, @Body() createEmailDto: CreateEmailDto) {
    return this.emailService.createEmail(request.user.username, createEmailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getEmails(@Request() req) {
    return this.emailService.getEmails(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getEmailById(@Request() req, @Param('id') id: string) {
    return this.emailService.getEmailById(req.user.username, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reply')
  replyEmail(
    @Request() req,
    @Param('id') id: string,
    @Body('reply') reply: string,
  ) {
    return this.emailService.replyEmail(req.user.username, id, reply);
  }
}
