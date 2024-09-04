import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { PrismaService } from 'src/prisma.service'
import { builderFilter } from 'src/utils/filterAppointment'

import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { SearchAppointment } from './dto/filterAppointment'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'

@Injectable()
export class AppointmentService {
  constructor(private prismaService: PrismaService) {}

  private async checkPatientExists(patientId: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id: patientId },
    })
    if (!patient) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
  }

  private async checkPsychologistExists(psychologistId: number) {
    const psychologist = await this.prismaService.psychologist.findUnique({
      where: { id: psychologistId },
    })
    if (!psychologist) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
  }

  private async checkAppointmentExists(id: number) {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id },
    })
    if (!appointment) {
      throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return appointment
  }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      if (
        createAppointmentDto.type !== 'ADMINISTRATIVE_RECORDS' &&
        createAppointmentDto.type !== 'COLLECTIVE_ACTIVITIES'
      ) {
        await this.checkPatientExists(createAppointmentDto.patientId)
      }
      await this.checkPsychologistExists(createAppointmentDto.psychologistId)

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

  async searchAppointment(filter: SearchAppointment) {
    const filters = builderFilter(filter)
    const limit =
      filter.limit && filter.limit > 0 && filter.limit <= 10 ? filter.limit : 10

    try {
      const appointments = await this.prismaService.appointment.findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        skip: filter.offset ? Number(filter.offset) : 0,
        take: Number(limit),
      })

      if (!appointments.length) {
        throw new HttpException('APPOINTMENTS_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      return appointments
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new HttpException('APPOINTMENTS_NOT_FOUND', HttpStatus.NOT_FOUND)
      }
      throw new HttpException('APPOINTMENTS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number) {
    return this.checkAppointmentExists(id)
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.checkAppointmentExists(id)

    try {
      await this.prismaService.appointment.update({
        where: { id: Number(id) },
        data: {
          ...updateAppointmentDto,
          updatedAt: new Date().toLocaleString(),
        },
      })
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
      }
      throw new HttpException('APPOINTMENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
  }

  async remove(id: number) {
    await this.checkAppointmentExists(id)

    await this.prismaService.appointment.delete({
      where: { id: Number(id) },
    })
  }
}
