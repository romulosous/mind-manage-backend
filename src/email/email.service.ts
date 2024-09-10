import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private prismaService: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async checkAndSendEmails() {
    let tommorow = new Date()
    tommorow.setDate(tommorow.getDate() + 1)

    const pendingEmails = await this.prismaService.appointment.findMany({
      where: {
        appointmentDate: {
          lte: new Date(),
          lt: tommorow,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        Patient: {
          isActive: true,
        },
      },
      include: {
        Patient: {
          select: {
            email: true,
            name: true,
          },
        },
        EmailSchedule: true,
      },
    })

    for (const appointment of pendingEmails) {
      const { Patient } = appointment
      const defaultSubject = 'Lembrete de Consulta'
      const defaultContent = `Olá ${Patient.name}, este é um lembrete da sua consulta marcada para ${appointment.appointmentDate.toLocaleString()}.`

      try {
        const emailAlreadySend =
          await this.prismaService.emailSchedule.findFirst({
            where: {
              isSent: true,
              appointmentId: appointment.id,
            },
          })

        if (!emailAlreadySend) {
          await this.mailerService.sendMail({
            to: Patient.email,
            subject: defaultSubject,
            text: defaultContent,
          })

          await this.prismaService.emailSchedule.create({
            data: {
              sendAt: new Date(),
              isSent: true,
              appointmentId: appointment.id,
            },
          })
        } else {
          console.log('Email already sent !')
        }
      } catch (error) {
        console.error(`Erro ao enviar e-mail para ${Patient.email}:`, error)
      }
    }
  }
}
