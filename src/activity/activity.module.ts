import { Module } from '@nestjs/common'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
})
export class ActivityModule {}
