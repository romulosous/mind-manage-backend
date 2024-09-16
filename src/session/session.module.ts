import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

import { SessionController } from './session.controller'
import { SessionService } from './session.service'

@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaService,JwtService],
})
export class SessionModule {}
