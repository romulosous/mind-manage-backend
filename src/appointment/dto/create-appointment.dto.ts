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
  @IsOptional()
  id: number
  @IsNotEmpty()
  @IsInt()
  psychologistId: number
  @IsInt()
  @IsNotEmpty()
  patientId: number
  @IsString()
  @IsNotEmpty()
  appointmentDate: string
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

export enum Status {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  DONE = 'DONE',
}
