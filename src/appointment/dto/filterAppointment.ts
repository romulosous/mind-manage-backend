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
}

export type SearchAppointment = FilterAppointment
