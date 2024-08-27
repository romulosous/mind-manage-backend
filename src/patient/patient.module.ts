import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { PatientController } from './patient.controller'
import { PatientService } from './patient.service'

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientModule],
})
export class PatientModule {}
