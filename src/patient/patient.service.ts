import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PrismaService } from 'src/prisma.service'
import { hashSync } from 'bcrypt'

@Injectable()
export class PatientService {
  constructor(private prismaService: PrismaService) {}
  async create(createPatientDto: CreatePatientDto) {
    const patientExist = await this.prismaService.patient.findUnique({
      where: {
        email: createPatientDto.email,
      },
    })

    if (patientExist) {
      throw new HttpException('PATIENT_ALREADY_EXISTS', HttpStatus.CONFLICT)
    }

    const patient = await this.prismaService.patient.create({
      data: {
        ...createPatientDto,
        password: hashSync(createPatientDto.password, 10),
        updatedAt: null,
      },
    })
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
        sector: true,
        createdAt: true,
        updatedAt: true,
        psychologistId: true,
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
        sector: true,
        createdAt: true,
        updatedAt: true,
        psychologistId: true,
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
        password: hashSync(updatePatientDto.password, 10),
        updatedAt: new Date(),
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

    await this.prismaService.patient.delete({
      where: {
        id,
      },
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
}
