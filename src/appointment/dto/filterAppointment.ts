import { StatusApointment, typeAppointment } from './Enum'

type Appointment = {
  id: number
  psychologistId: number
  patientId: number
  appointmentDate: string
  status: StatusApointment
  reason: string
  name: string
  typeAcctivity: typeAppointment
  type: string
  observation: string
  obejective: string
  createdAt: string
  updatedAt: string
}

type FilterAppointment = Pick<
  Appointment,
  'type' | 'status' | 'appointmentDate'
> & {
  offset?: number
  limit?: number
}

export type SearchAppointment = FilterAppointment
