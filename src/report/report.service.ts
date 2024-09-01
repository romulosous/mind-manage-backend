import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService) {}

  async generateReport(filters: {
    startDate?: string
    endDate?: string
    gender?: string
    minAge?: number
    maxAge?: number
  }) {}
}
