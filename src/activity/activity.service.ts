import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Status } from 'src/appointment/dto/create-appointment.dto'
import { PrismaService } from 'src/prisma.service'

import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'

@Injectable()
export class ActivityService {
  constructor(private prismaService: PrismaService) {}
  async create(createActivityDto: CreateActivityDto) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      const psychologistExist = await prisma.psychologist.findUnique({
        where: {
          id: createActivityDto.psychologistId,
        },
      })

      if (!psychologistExist) {
        throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      const patientExist = await prisma.patient.findUnique({
        where: {
          id: createActivityDto.patientId,
        },
      })

      if (!patientExist) {
        throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      await prisma.activity.create({
        data: {
          ...createActivityDto,
          status: Status.PENDING,
          updatedAt: null,
        },
      })
    })
  }

  async findAll() {
    const activities = await this.prismaService.activity.findMany()

    if (!activities.length) {
      throw new HttpException('ACTIVITIES_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return activities
  }

  async findOne(id: number) {
    const activity = await this.prismaService.activity.findUnique({
      where: { id: Number(id) },
    })

    if (!activity) {
      throw new HttpException('ACTIVITY_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return activity
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.prismaService.activity.findUnique({
      where: { id: Number(id) },
    })

    if (!activity) {
      throw new HttpException('ACTIVITY_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.activity.update({
      where: { id: Number(id) },
      data: {
        ...updateActivityDto,
        updatedAt: new Date(),
      },
    })
  }

  async remove(id: number) {
    const activity = await this.prismaService.activity.findUnique({
      where: { id: Number(id) },
    })

    if (!activity) {
      throw new HttpException('ACTIVITY_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.activity.delete({
      where: { id: Number(id) },
    })
  }
}
