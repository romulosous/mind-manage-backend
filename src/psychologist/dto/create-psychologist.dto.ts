import { ApiProperty } from '@nestjs/swagger'
import { Psychologist } from '@prisma/client'
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePsychologistDto implements Psychologist {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Id of the psychologist autoincremented by the database',
    nullable: false,
    required: true,
    type: 'integer',
    example: 1,
  })
  id: number
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: 'João da Silva',
  })
  name: string
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: 'joao@gmail.com',
  })
  email: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: 'Abcd123!',
  })
  password: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CRP of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: '12345',
  })
  crp: string
  @IsString()
  @ApiProperty({
    description: 'Specialty of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: 'Psicologia Clínica',
  })
  specialty: string
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Phone of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: '89999999999',
  })
  phone: string
  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'Address of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: '2024-09-07T10:45:12.989Z',
  })
  createdAt: Date
  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'Date of the last update of the psychologist',
    nullable: false,
    required: true,
    type: 'string',
    example: '2024-09-07T10:45:12.989Z',
  })
  updatedAt: Date
}
