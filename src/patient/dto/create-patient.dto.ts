import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    enum: $Enums.Difficulty,
    required: false,
    type: 'array',
    description: 'Pacient difficulty',
  })
  @IsEnum($Enums.Difficulty, { each: true })
  @IsOptional()
  difficulty: $Enums.Difficulty[]
  @ApiProperty({
    enum: $Enums.attachment,
    required: false,
    type: 'array',
    description: 'Attachment releaded to the patient',
  })
  @IsEnum($Enums.attachment, { each: true })
  @IsOptional()
  attachment: $Enums.attachment[]
  @IsEnum($Enums.psychologicalDisorder, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: $Enums.psychologicalDisorder,
    required: false,
    type: 'array',
    description: 'Psychological disorder of the patient',
  })
  psychologicalDisorder: $Enums.psychologicalDisorder[]
  @IsOptional()
  @IsEnum($Enums.Relationship, { each: true })
  @ApiProperty({
    enum: $Enums.Relationship,
    required: false,
    type: 'array',
    description: 'Relationship',
  })
  relationship: $Enums.Relationship[]
  @IsInt()
  @IsOptional()
  @ApiProperty({
    type: 'number',
    required: false,
    description: 'Patient ID',
  })
  id: number
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Patient name',
  })
  name: string
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Patient email',
  })
  email: string
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Patient password',
  })
  password: string
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Patient registration',
  })
  registration: string
  @IsEnum($Enums.Courses)
  @IsOptional()
  @ApiProperty({
    enum: $Enums.Courses,
    required: false,
    type: 'array',
    description: 'Patient course',
  })
  course: $Enums.Courses
  @IsEnum($Enums.Education, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: $Enums.Education,
    required: false,
    type: 'array',
    description: 'Patient education',
  })
  education: $Enums.Education
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    required: true,
    description: 'Patient age',
  })
  age: number
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Patient phone',
  })
  phone: string
  @IsDate()
  @IsOptional()
  @ApiProperty({
    type: 'date',
    required: false,
    description: 'Patient birth',
  })
  birth: Date
  @IsEnum($Enums.Gender, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: $Enums.Gender,
    required: false,
    type: 'array',
    description: 'Gender of the patient',
  })
  gender: $Enums.Gender
  @IsEnum($Enums.PatientType, { each: true })
  @IsOptional()
  @ApiProperty({
    enum: $Enums.PatientType,
    required: false,
    type: 'array',
    description: 'Patient type',
  })
  patientType: $Enums.PatientType
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Patient series',
  })
  series: string
  @IsDate()
  @IsOptional()
  @ApiProperty({
    type: 'date',
    required: false,
    description: 'Patient createdAt',
  })
  createdAt: Date
  @IsDate()
  @IsOptional()
  @ApiProperty({
    type: 'date',
    required: false,
    description: 'Patient updatedAt',
  })
  updatedAt: Date
  @IsEnum($Enums.CreatedBy)
  @IsOptional()
  @ApiProperty({
    enum: $Enums.CreatedBy,
    required: false,
    type: 'array',
    description: 'Patient createdBy',
  })
  createdBy: $Enums.CreatedBy
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    required: false,
    description: 'Patient isActive',
  })
  isActive: boolean
}
