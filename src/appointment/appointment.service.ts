import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

import { StatusApointment } from '../appointment/dto/Enum'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { typeAppointment } from './dto/Enum'
import { SearchAppointment } from './dto/filterAppointment'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

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
          createdAt: new Date().toLocaleString(), // 03/09/2024, 13:38
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

  private buildFiltersQuery(
    filter: SearchAppointment,
  ): Prisma.AppointmentWhereInput {
    const filters: Prisma.AppointmentWhereInput = {}

    if (filter.type) {
      filters.type = filter.type as typeAppointment
    }

    if (filter.status) {
      filters.status = filter.status as StatusApointment
    }

    if (filter.appointmentDate) {
      const [day, month, year] = filter.appointmentDate.split('/').map(Number)

      const startOfDay = `${String(day - 1).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 00:00:00`
      const endOfDay = `${String(day + 1).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 23:59:59`

      filters.appointmentDate = {
        gte: startOfDay,
        lte: endOfDay,
      }
    }

    return filters
  }

  async searchAppointment(filter: SearchAppointment) {
    const filters = this.buildFiltersQuery(filter)

    const limit =
      filter.limit && filter.limit > 0 && filter.limit <= 10 ? filter.limit : 10

    const appointments = await this.prismaService.appointment.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc',
      },
      skip: filter.offset ? Number(filter.offset) : 0,
      take: Number(limit),
    })

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
}
