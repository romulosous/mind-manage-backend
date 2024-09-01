import { CreatePsychologistDto } from './dto/create-psychologist.dto'
import { UpdatePsychologistDto } from './dto/update-psychologist.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PsychologistService {
  constructor(private prismaService: PrismaService) {}

  async create(createPsychologistDto: CreatePsychologistDto) {
    const psychologistExists = await this.prismaService.psychologist.findFirst({
      where: { email: createPsychologistDto.email },
    })

    if (psychologistExists) {
      throw new HttpException(
        'PSYCHOLOGIST_ALREADY_EXISTS',
        HttpStatus.CONFLICT,
      )
    }

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
    const psychologistsExists = await this.prismaService.psychologist.findMany({
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

    if (psychologistsExists.length === 0) {
      throw new HttpException('PSYCHOLOGISTS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return psychologistsExists
  }

  async findOne(id: number) {
    const psychologistExists = await this.prismaService.psychologist.findUnique(
      {
        where: { id: Number(id) },
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
      },
    )

    if (!psychologistExists) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return psychologistExists
  }

  async update(id: number, updatePsychologistDto: UpdatePsychologistDto) {
    const psychologistExists = await this.prismaService.psychologist.findUnique(
      {
        where: { id: Number(id) },
      },
    )

    if (!psychologistExists) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.psychologist.update({
      where: { id: Number(id) },
      data: {
        ...updatePsychologistDto,
        updatedAt: new Date().toLocaleString(),
      },
    })
  }

  async remove(id: number) {
    const psychologistExists = await this.prismaService.psychologist.findUnique(
      {
        where: { id: Number(id) },
      },
    )

    if (!psychologistExists) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.$transaction([
      this.prismaService.appointment.deleteMany({
        where: { psychologistId: Number(id) },
      }),
      this.prismaService.psychologist.delete({
        where: { id: Number(id) },
      }),
    ])
  }

  async findByEmail(email: string) {
    const psychologistExists = await this.prismaService.psychologist.findFirst({
      where: { email },
    })

    if (!psychologistExists) {
      throw new HttpException('PSYCHOLOGIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return psychologistExists
  }
}
