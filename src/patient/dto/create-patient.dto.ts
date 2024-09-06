import { $Enums, Patient } from '@prisma/client'
import {
  IsBoolean,
  IsDate,
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
  @IsEnum($Enums.Courses)
  @IsOptional()
  course: $Enums.Courses
  @IsEnum($Enums.Education)
  @IsOptional()
  education: $Enums.Education
  @IsInt()
  @IsNotEmpty()
  age: number
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone: string
  @IsEnum($Enums.Gender)
  @IsOptional()
  gender: $Enums.Gender
  @IsEnum($Enums.PatientType)
  @IsOptional()
  patientType: $Enums.PatientType
  @IsString()
  @IsOptional()
  series: string
  @IsDate()
  @IsOptional()
  createdAt: Date
  @IsDate()
  @IsOptional()
  updatedAt: Date
  @IsEnum($Enums.CreatedBy)
  @IsOptional()
  createdBy: $Enums.CreatedBy
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
