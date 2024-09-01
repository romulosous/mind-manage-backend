import { Psychologist } from '@prisma/client'
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePsychologistDto implements Psychologist {
  @IsOptional()
  @IsInt()
  id: number
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsString()
  @IsNotEmpty()
  password: string
  @IsString()
  @IsNotEmpty()
  crp: string
  @IsString()
  specialty: string
  @IsString()
  @IsOptional()
  phone: string
  @IsString()
  @IsOptional()
  createdAt: string
  @IsString()
  @IsOptional()
  updatedAt: string
}
