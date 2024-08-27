import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PatientModule } from 'src/patient/patient.module'
import { PatientService } from 'src/patient/patient.service'
import { PrismaService } from 'src/prisma.service'
import { PsychologistModule } from 'src/psychologist/psychologist.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt-strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PsychologistModule,
    PatientModule,
  ],
  providers: [AuthService, JwtStrategy, PatientService, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
