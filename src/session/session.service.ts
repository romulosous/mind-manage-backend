import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { builderFilter } from 'src/utils/filterSession'

import { CreateSessionDto } from './dto/create-session.dto'
import { SearchSession } from './dto/filterSession'
import { UpdateSessionDto } from './dto/update-session.dto'

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  private async findSessionOrThrow(id: number) {
    const session = await this.prismaService.session.findUnique({
      where: { id },
    })
    if (!session) {
      throw new HttpException('SESSION_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return session
  }

  private async checkSessionExists(patientId: number, sessionDate: string) {
    const session = await this.prismaService.session.findFirst({
      where: { patientId, sessionDate },
    })
    if (session) {
      throw new HttpException('SESSION_ALREADY_EXISTS', HttpStatus.BAD_REQUEST)
    }
  }

  async create(createSessionDto: CreateSessionDto) {
    await this.checkSessionExists(
      createSessionDto.patientId,
      createSessionDto.sessionDate,
    )
    await this.prismaService.session.create({
      data: { ...createSessionDto, createdAt: new Date().toLocaleString() },
    })
  }

  async searchSession(filter: SearchSession) {
    const filters = builderFilter(filter)
    const limit =
      filter.limit && filter.limit > 0 && filter.limit <= 10 ? filter.limit : 10

    const sessions = await this.prismaService.session.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
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
      orderBy: { createdAt: 'asc' },
    })

    if (!sessions.length) {
      throw new HttpException('NO_SESSIONS_FOUND', HttpStatus.NOT_FOUND)
    }

    return sessions
  }

  async findOne(id: number) {
    return this.findSessionOrThrow(id)
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    await this.findSessionOrThrow(id)
    await this.prismaService.session.update({
      where: { id },
      data: { ...updateSessionDto, updatedAt: new Date().toLocaleString() },
    })
  }

  async remove(id: number) {
    await this.findSessionOrThrow(id)
    await this.prismaService.session.delete({ where: { id } })
  }
}
