import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePsychologistDto {
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
  @IsDate()
  @IsOptional()
  createdAt: Date
}
