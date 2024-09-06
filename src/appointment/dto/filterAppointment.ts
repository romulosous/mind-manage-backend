import { Appointment } from '@prisma/client'

type FilterAppointment = Pick<
  Appointment,
  | 'type'
  | 'status'
  | 'appointmentDate'
  | 'typeAcctivity'
  | 'patientId'
  | 'psychologistId'
  | 'name'
> & {
  offset?: number
  limit?: number
  gender?: string
  minAge?: number
  maxAge?: number
  minDate?: Date
  maxDate?: Date
}

export type SearchAppointment = FilterAppointment
