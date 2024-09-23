import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common'

import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail() {
    try {
      await this.emailService.checkAndSendEmails()

      return { message: 'EMAILS_SEND_SUCCESSFULLY', statusCode: HttpStatus.OK }
    } catch (error) {
      console.error('ERROR_SENDIG_EMAIL', error)
      throw new HttpException(
        'ERROR_SENDING_EMAILS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
