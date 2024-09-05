import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'

import { CreatePsychologistDto } from './dto/create-psychologist.dto'
import { UpdatePsychologistDto } from './dto/update-psychologist.dto'

@Injectable()
export class PsychologistService {
  constructor(private prismaService: PrismaService) {}

  private async findPsychologistOrThrow(id: number) {
    const psychologist = await this.prismaService.psychologist.findUnique({
      where: { id },
    })
    if (!psychologist) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return psychologist
  }

  private async checkPsychologistExists(email: string) {
    const psychologist = await this.prismaService.psychologist.findFirst({
      where: { email },
    })
    if (psychologist) {
      throw new HttpException(
        'PSYCHOLOGIST_ALREADY_EXISTS',
        HttpStatus.CONFLICT,
      )
    }
  }

  async create(createPsychologistDto: CreatePsychologistDto) {
    await this.checkPsychologistExists(createPsychologistDto.email)
    await this.prismaService.psychologist.create({
      data: {
        ...createPsychologistDto,
        password: hashSync(createPsychologistDto.password, 10),
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
      },
    })
  }

  async findAll() {
    const psychologists = await this.prismaService.psychologist.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        crp: true,
        specialty: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (psychologists.length === 0) {
      throw new HttpException('PSYCHOLOGISTS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return psychologists
  }

  async findOne(id: number) {
    return this.findPsychologistOrThrow(id)
  }

  async update(id: number, updatePsychologistDto: UpdatePsychologistDto) {
    await this.findPsychologistOrThrow(id)
    await this.prismaService.psychologist.update({
      where: { id },
      data: {
        ...updatePsychologistDto,
        updatedAt: new Date().toLocaleString(),
        password: hashSync(updatePsychologistDto.password, 10),
      },
    })
  }

  async remove(id: number) {
    await this.findPsychologistOrThrow(id)
    await this.prismaService.$transaction([
      this.prismaService.appointment.deleteMany({
        where: { psychologistId: id },
      }),
      this.prismaService.session.deleteMany({ where: { psychologistId: id } }),
      this.prismaService.psychologist.delete({ where: { id } }),
    ])
  }

  async findByEmail(email: string) {
    const psychologist = await this.prismaService.psychologist.findFirst({
      where: { email },
      select: {
        id: true,
        password: true,
        name: true,
        email: true,
      },
    })
    if (!psychologist) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return psychologist
  }
}
