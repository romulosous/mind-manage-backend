import { CreatePatientDto } from './dto/create-patient.dto'
import { SearchPatient } from './dto/filterPatient'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { builderFilter } from 'src/utils/filterPatient'

@Injectable()
export class PatientService {
  constructor(private prismaService: PrismaService) {}

  private patientSelect = {
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
    createdBy: true,
    education: true,
    difficulty: true,
    series: true,
    attachment: true,
    relationship: true,
    psychologicalDisorder: true,
  }

  private async findPatientOrThrow(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
      select: this.patientSelect,
    })
    if (!patient) {
      throw new HttpException('PATIENT_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return patient
  }

  private async checkPatientExists(email: string) {
    const patient = await this.prismaService.patient.findFirst({
      where: { email },
    })
    if (patient) {
      throw new HttpException('PATIENT_ALREADY_EXISTS', HttpStatus.CONFLICT)
    }
  }

  async create(createPatientDto: CreatePatientDto) {
    await this.checkPatientExists(createPatientDto.email)

    await this.prismaService.patient.create({
      data: {
        ...createPatientDto,
        password: hashSync(createPatientDto.password, 10),
        updatedAt: null,
      },
    })
  }

  async searchPatients(filter: SearchPatient) {
    const filters = builderFilter(filter)

    console.log(filters)

    const limit =
      filter.limit && filter.limit > 0 && filter.limit <= 10 ? filter.limit : 10

    const patients = await this.prismaService.patient.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      skip: filter.offset ? Number(filter.offset) : 0,
      take: Number(limit),
      select: this.patientSelect,
    })

    if (!patients.length) {
      throw new HttpException('PATIENTS_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return { count: patients.length, data: patients }
  }
  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.findPatientOrThrow(id)
    await this.prismaService.patient.update({
      where: { id },
      data: {
        ...updatePatientDto,
      },
    })
  }

  async remove(id: number) {
    await this.findPatientOrThrow(id)
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.appointment.deleteMany({ where: { patientId: id } })
      await prisma.session.deleteMany({ where: { patientId: id } })
      await prisma.patient.delete({ where: { id } })
    })
  }

  async findByEmail(email: string) {
    const patient = await this.checkPatientExists(email)
    return patient
  }
}
