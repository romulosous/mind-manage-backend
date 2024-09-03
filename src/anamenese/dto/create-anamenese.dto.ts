import { Anamenese } from '@prisma/client'
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateAnameneseDto implements Anamenese {
  @IsInt()
  @IsOptional()
  id: number

  @IsInt()
  @IsNotEmpty()
  patientId: number

  @IsString()
  @IsNotEmpty()
  familyHistory: string

  @IsString()
  @IsNotEmpty()
  infancy: string

  @IsString()
  @IsNotEmpty()
  adolescence: string

  @IsString()
  @IsNotEmpty()
  illnesses: string

  @IsString()
  @IsNotEmpty()
  acompaniment: string

  @IsDateString()
  @IsOptional()
  createdAt: string

  @IsDateString()
  @IsOptional()
  updatedAt: string
}
