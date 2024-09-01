import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { log } from 'console'

@Injectable()
export class AppointmentService {
  constructor(private prismaService: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      if (
        createAppointmentDto.type !== 'ADMINISTRATIVE_RECORDS' &&
        createAppointmentDto.type !== 'COLLECTIVE_ACTIVITIES'
      ) {
        const patientExist = await prisma.patient.findUnique({
          where: {
            id: createAppointmentDto.patientId,
          },
        })

        if (!patientExist) {
          throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
        }
      }
      const psychologistExist = await prisma.psychologist.findUnique({
        where: {
          id: createAppointmentDto.psychologistId,
        },
      })

      if (!psychologistExist) {
        throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      const appointment = await prisma.appointment.create({
        data: {
          ...createAppointmentDto,
          updatedAt: null,
          createdAt: new Date().toLocaleString(),
          patientId:
            createAppointmentDto.type === 'SESSION'
              ? createAppointmentDto.patientId
              : null,
        },
      })

      return appointment
    })

    return result
  }

  async findAll() {
    const appointments = await this.prismaService.appointment.findMany()

    if (!appointments.length) {
      throw new HttpException('APPOINTMENTS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return appointments
  }

  async findOne(id: number) {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id: Number(id) },
    })

    if (!appointment) {
      throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return appointment
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id: Number(id) },
    })

    if (!appointment) {
      throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.appointment.update({
      where: { id: Number(id) },
      data: { ...updateAppointmentDto, updatedAt: new Date().toLocaleString() },
    })
  }

  async remove(id: number) {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id: Number(id) },
    })

    if (!appointment) {
      throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.appointment.delete({
      where: { id: Number(id) },
    })
  }

  async getAppointmentsForDayRange(
    date: string,
    daysOffset: number = 0,
    limit: number = 10,
  ) {
    const [day, month, year] = date.split('/').map(Number)

    const selectedDate = new Date(year, month - 1, day)

    const previousDate = new Date(selectedDate)
    previousDate.setDate(selectedDate.getDate() - 1)
    const previousDateString = `${String(previousDate.getDate()).padStart(2, '0')}/${String(previousDate.getMonth() + 1).padStart(2, '0')}/${previousDate.getFullYear()}`

    const nextDate = new Date(selectedDate)
    nextDate.setDate(selectedDate.getDate() + 1)
    const nextDateString = `${String(nextDate.getDate()).padStart(2, '0')}/${String(nextDate.getMonth() + 1).padStart(2, '0')}/${nextDate.getFullYear()}`

    const appointments = await this.prismaService.$queryRaw`
      SELECT "id", "psychologistId", "patientId", "appointmentDate", "status", "reason", "name", "typeAcctivity", "type", "observation", "obejective", "createdAt", "updatedAt"
      FROM "public"."Appointment"
      WHERE "appointmentDate" LIKE ${previousDateString} || '%'
      OR "appointmentDate" LIKE ${date} || '%'
      OR "appointmentDate" LIKE ${nextDateString} || '%'
      ORDER BY "appointmentDate" DESC
      LIMIT ${limit} OFFSET ${daysOffset};`
    return appointments
  }
}
