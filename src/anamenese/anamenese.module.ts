import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { AnameneseController } from './anamenese.controller';
import { AnameneseService } from './anamenese.service';

@Module({
  controllers: [AnameneseController],
  providers: [AnameneseService,PrismaService],
})
export class AnameneseModule {}
