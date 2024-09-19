import { Session } from '@prisma/client'
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSessionDto implements Session {
  @IsInt()
  @IsOptional()
  id: number

  @IsInt()
  @IsNotEmpty()
  psychologistId: number

  @IsInt()
  @IsNotEmpty()
  patientId: number

  @IsDate()
  @IsNotEmpty()
  sessionDate: Date

  @IsString()
  @IsOptional()
  intervention: string

  @IsString()
  @IsOptional()
  referrals: string

  @IsString()
  @IsNotEmpty()
  complaint: string

  @IsString()
  @IsOptional()
  difficulty: string

  @IsDate()
  @IsOptional()
  createdAt: Date

  @IsDate()
  @IsOptional()
  updatedAt: Date
}
