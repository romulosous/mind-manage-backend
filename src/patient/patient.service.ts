import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'

import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'

@Injectable()
export class PatientService {
  constructor(private prismaService: PrismaService) {}
  async create(createPatientDto: CreatePatientDto) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      const patientExist = await prisma.patient.findFirst({
        where: {
          email: createPatientDto.email,
        },
      })

      if (patientExist) {
        throw new HttpException('PATIENT_ALREADY_EXISTS', HttpStatus.CONFLICT)
      }

      const patient = await prisma.patient.create({
        data: {
          ...createPatientDto,
          password: hashSync(createPatientDto.password, 10),
          createdAt: new Date().toLocaleString(),
          updatedAt: null,
        },
      })

      return patient
    })

    return result
  }

  async findAll() {
    const patients = await this.prismaService.patient.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        phone: true,
        course: true,
        registration: true,
        gender: true,
        patientType: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        education: true,
        series: true,
        Anamenese: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
        },
        Session: {
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!patients.length) {
      throw new HttpException('NO_PATIENTS_FOUND', HttpStatus.NOT_FOUND)
    }

    return patients
  }

  async findOne(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        phone: true,
        course: true,
        registration: true,
        gender: true,
        patientType: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!patient) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return patient
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.prismaService.patient.findUnique({
      where: {
        id,
      },
    })

    if (!patient) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.patient.update({
      where: {
        id,
      },
      data: {
        ...updatePatientDto,
        updatedAt: new Date().toLocaleString(),
      },
    })
  }

  async remove(id: number) {
    const patientExist = await this.prismaService.patient.findUnique({
      where: {
        id,
      },
    })

    if (!patientExist) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.appointment.deleteMany({
        where: {
          patientId: id,
        },
      })

      await this.prismaService.session.deleteMany({
        where: {
          patientId: id,
        },
      })
      await prisma.patient.delete({
        where: {
          id,
        },
      })
    })
  }

  async findByEmail(email: string) {
    const patientExist = await this.prismaService.patient.findUnique({
      where: {
        email,
      },
    })

    if (!patientExist) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return patientExist
  }

  async findRecentPatients(params: { skip?: number; take?: number }) {
    const { skip, take } = params
    const patients = await this.prismaService.patient.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: skip,
      take: take < 10 ? 10 : take,
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        phone: true,
        course: true,
        registration: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    })

    if (!patients.length) {
      throw new HttpException('NO_PATIENTS_FOUND', HttpStatus.NOT_FOUND)
    }

    return patients
  }

  async findPatientsByName(name: string) {
    if (!name) {
      throw new HttpException(
        'Name parameter is required',
        HttpStatus.BAD_REQUEST,
      )
    }

    const patients = await this.prismaService.patient.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        phone: true,
        course: true,
        registration: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    })

    if (!patients.length) {
      throw new HttpException(
        `PATIENT_NOT_FOUND_WITH_NAME: ${name}`,
        HttpStatus.NOT_FOUND,
      )
    }

    return patients
  }
}
