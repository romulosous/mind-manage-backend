import { $Enums, Patient } from '@prisma/client'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator'

export class CreatePatientDto implements Patient {
  @IsInt()
  @IsOptional()
  id: number
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  registration: string

  @IsString()
  @IsOptional()
  course: string

  @IsInt()
  @IsNotEmpty()
  age: number

  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string

  @IsEnum($Enums.Gender)
  @IsNotEmpty()
  gender: $Enums.Gender

  @IsEnum($Enums.PatientType)
  @IsNotEmpty()
  patientType: $Enums.PatientType

  @IsEnum($Enums.Sector)
  @IsOptional()
  sector: $Enums.Sector

  @IsOptional()
  createdAt: Date

  @IsOptional()
  updatedAt: Date

  @IsEnum($Enums.CreatedBy)
  @IsNotEmpty()
  createdBy: $Enums.CreatedBy

  @IsInt()
  @IsNotEmpty()
  psychologistId: number
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
