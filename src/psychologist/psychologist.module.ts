import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { PsychologistController } from './psychologist.controller'
import { PsychologistService } from './psychologist.service'

@Module({
  controllers: [PsychologistController],
  providers: [PsychologistService, PrismaService],
  imports: [PsychologistModule],
  exports: [PsychologistService, PrismaService],
})
export class PsychologistModule {}
