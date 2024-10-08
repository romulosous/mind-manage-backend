import { PsychologistController } from './psychologist.controller'
import { PsychologistService } from './psychologist.service'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [PsychologistController],
  providers: [PsychologistService, PrismaService, JwtService],
  exports: [PsychologistService],
})
export class PsychologistModule {}
