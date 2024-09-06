import { $Enums, Session } from '@prisma/client'
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

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

  @IsString()
  @IsNotEmpty()
  sessionDate: string

  @IsString()
  @IsOptional()
  intervention: string

  @IsString()
  @IsOptional()
  referrals: string

  @IsString()
  @IsOptional()
  attachment: string

  @IsString()
  @IsNotEmpty()
  complaint: string

  @IsEnum($Enums.psychologicalDisorder)
  @IsNotEmpty()
  psychologicalDisorder: $Enums.psychologicalDisorder

  @IsString()
  @IsOptional()
  difficulty: string

  @IsEnum($Enums.Relationship)
  @IsNotEmpty()
  relationship: $Enums.Relationship

  @IsDate()
  @IsOptional()
  createdAt: Date

  @IsDate()
  @IsOptional()
  updatedAt: Date
}
