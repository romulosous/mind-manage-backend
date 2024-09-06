import { CreateAnameneseDto } from './dto/create-anamenese.dto'
import { UpdateAnameneseDto } from './dto/update-anamenese.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AnameneseService {
  constructor(private prismaService: PrismaService) {}

  private async findAnameneseById(id: number) {
    const anamenese = await this.prismaService.anamenese.findUnique({
      where: { id },
    })

    if (!anamenese) {
      throw new HttpException('ANAMENESE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return anamenese
  }

  async create(createAnameneseDto: CreateAnameneseDto) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id: createAnameneseDto.patientId,
        createdAt: createAnameneseDto.createdAt,
      },
    })

    if (!patient) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    const result = await this.prismaService.$transaction(async (prisma) => {
      await prisma.anamenese
        .create({
          data: {
            ...createAnameneseDto,
            updatedAt: null,
          },
        })
        .catch((error) => {
          if (error.code === 'P2002') {
            throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
          }
        })
    })

    return result
  }

  async findAll() {
    const anameneses = await this.prismaService.anamenese.findMany()

    if (!anameneses.length) {
      throw new HttpException('NO_ANAMENESES_FOUND', HttpStatus.NOT_FOUND)
    }

    return anameneses
  }

  async findOne(id: number) {
    const anamenese = await this.findAnameneseById(id)
    return anamenese
  }

  async update(id: number, updateAnameneseDto: UpdateAnameneseDto) {
    await this.findAnameneseById(id)

    await this.prismaService.anamenese.update({
      where: { id },
      data: {
        ...updateAnameneseDto,
      },
    })
  }

  async remove(id: number) {
    await this.findAnameneseById(id)

    const result = await this.prismaService.anamenese.delete({
      where: { id },
    })

    return result
  }
}
