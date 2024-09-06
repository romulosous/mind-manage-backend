import { $Enums, Appointment } from '@prisma/client'
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateAppointmentDto implements Appointment {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsEnum($Enums.typeAcctivity)
  @IsOptional()
  typeAcctivity: $Enums.typeAcctivity
  @IsEnum($Enums.typeAppointment)
  @IsOptional()
  type: $Enums.typeAppointment
  @IsString()
  @IsOptional()
  observation: string
  @IsOptional()
  @IsString()
  obejective: string
  @IsOptional()
  id: number
  @IsNotEmpty()
  @IsInt()
  psychologistId: number
  @IsInt()
  @IsOptional()
  patientId: number
  @IsDate()
  @IsNotEmpty()
  appointmentDate: Date
  @IsEnum($Enums.Status)
  @IsOptional()
  status: $Enums.Status
  @IsString()
  @IsNotEmpty()
  reason: string
  @IsDate()
  @IsOptional()
  createdAt: Date
  @IsDate()
  @IsOptional()
  updatedAt: Date
}
