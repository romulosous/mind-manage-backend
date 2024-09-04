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
}

export type SearchAppointment = FilterAppointment
