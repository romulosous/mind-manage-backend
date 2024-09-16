import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

import { AppointmentController } from './appointment.controller'
import { AppointmentService } from './appointment.service'

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService,JwtService],
  exports: [AppointmentModule],
})
export class AppointmentModule {}
