import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { CreateSessionDto } from './dto/create-session.dto'
import { UpdateSessionDto } from './dto/update-session.dto'
import { SearchSession } from './dto/filterSession'
import { Prisma } from '@prisma/client'

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}
  async create(createSessionDto: CreateSessionDto) {
    const session = await this.prismaService.session.findFirst({
      where: {
        patientId: createSessionDto.patientId,
        sessionDate: createSessionDto.sessionDate,
      },
    })

    if (session) {
      throw new HttpException('SESSION_ALREADY_EXISTS', HttpStatus.BAD_REQUEST)
    }

    await this.prismaService.session.create({
      data: { ...createSessionDto, createdAt: new Date().toLocaleString() },
    })
  }

  private buildFiltersQuery(filter: SearchSession): Prisma.SessionWhereInput {
    const filters: Prisma.SessionWhereInput = {}

    if (filter.relationship) {
      filters.relationship = filter.relationship
    }

    if (filter.difficulty) {
      filters.difficulty = filter.difficulty
    }

    if (filter.psychologicalDisorder) {
      filters.psychologicalDisorder = filter.psychologicalDisorder
    }

    return filters
  }

  async searchSession(filter: SearchSession) {
    const filters = this.buildFiltersQuery(filter)

    const limit =
      filter.limit && filter.limit > 0 && filter.limit <= 10 ? filter.limit : 10

    const sessions = await this.prismaService.session.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc',
      },
      skip: filter.offset ? Number(filter.offset) : 0,
      take: Number(limit),
    })

    if (!sessions.length) {
      throw new HttpException('SESSIONS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return sessions
  }

  async findAll() {
    const sessions = await this.prismaService.session.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (!sessions.length) {
      throw new HttpException('NO_SESSIONS_FOUND', HttpStatus.NOT_FOUND)
    }

    return sessions
  }

  async findOne(id: number) {
    const session = await this.prismaService.session.findUnique({
      where: { id },
    })

    if (!session) {
      throw new HttpException('SESSION_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return session
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.prismaService.session.findUnique({
      where: { id },
    })

    if (!session) {
      throw new HttpException('SESSION_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.session.update({
      where: { id },
      data: { ...updateSessionDto, updatedAt: new Date().toLocaleString() },
    })
  }

  async remove(id: number) {
    const session = await this.prismaService.session.findUnique({
      where: { id },
    })

    if (!session) {
      throw new HttpException('SESSION_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.session.delete({
      where: { id },
    })
  }
}
