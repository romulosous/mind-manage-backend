import { $Enums, Activity } from '@prisma/client'
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateActivityDto implements Activity {
  @IsInt()
  @IsOptional()
  id: number
  @IsString()
  @IsNotEmpty()
  activityName: string
  @IsString()
  @IsNotEmpty()
  description: string
  @IsInt()
  @IsNotEmpty()
  psychologistId: number
  @IsInt()
  @IsNotEmpty()
  patientId: number
  @IsEnum($Enums.Status)
  @IsOptional()
  status: $Enums.Status
  @IsDate()
  @IsOptional()
  createdAt: Date
  @IsDate()
  @IsOptional()
  updatedAt: Date
}
