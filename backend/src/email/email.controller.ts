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
import { SesService } from './AWS/ses.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('emails')
export class EmailController {
  constructor(
    private emailService: EmailService,
    private sesService: SesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createEmail(@Request() request, @Body() createEmailDto: CreateEmailDto) {
    return this.emailService.createEmail(request.user.username, createEmailDto);
  }

  @Get('test')
  async testSesService() {
    try {
      const response = await this.sesService.sendEmail(
        'test@example.com',
        'Test Subject',
        'This is a test email.',
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
  async replyEmail(
    @Request() req,
    @Param('id') id: string,
    @Body('reply') reply: string,
  ) {
    const result = await this.emailService.replyEmail(
      req.user.username,
      id,
      reply,
    );
    return result;
  }
}
