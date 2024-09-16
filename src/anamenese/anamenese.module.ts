import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

import { AnameneseController } from './anamenese.controller';
import { AnameneseService } from './anamenese.service';

@Module({
  controllers: [AnameneseController],
  providers: [AnameneseService,PrismaService,JwtService],
})
export class AnameneseModule {}
