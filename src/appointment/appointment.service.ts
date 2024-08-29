import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { CreateAppointmentDto, Status } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
  constructor(private prismaService: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointmentExist = await this.prismaService.appointment.findFirst({
      where: {
        patientId: createAppointmentDto.patientId,
        appointmentDate: createAppointmentDto.appointmentDate,
      },
    })

    if (appointmentExist) {
      throw new HttpException('APPOINTMENT_ALREADY_EXIST', HttpStatus.CONFLICT)
    }

    await this.prismaService.appointment.create({
      data: {
        ...createAppointmentDto,
        updatedAt: null,
        status: Status.PENDING,
      },
    })
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
