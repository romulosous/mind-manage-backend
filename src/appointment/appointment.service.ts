import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { CreateAppointmentDto, Status } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
  constructor(private prismaService: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      const patientExist = await prisma.patient.findUnique({
        where: {
          id: createAppointmentDto.patientId,
        },
      })

      if (!patientExist) {
        throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
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
          status: Status.PENDING,
          updatedAt: null,
        },
      })

      return appointment
    })

    return result
  }

  async findAll() {
    const appointments = await this.prismaService.appointment.findMany()

    if (!appointments) {
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
      data: { ...updateAppointmentDto, updatedAt: new Date() },
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
}
