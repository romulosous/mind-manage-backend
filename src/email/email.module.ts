import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { EmailController } from './email.controller'
import { EmailService } from './email.service'

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@gmail.com>',
      },
    }),
  ],
})
export class EmailModule {}
