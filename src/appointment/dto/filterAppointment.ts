import { Appointment, attachment, Courses, Education, Gender, PatientType } from '@prisma/client'

type FilterAppointment = Pick<
  Appointment,
  | 'type'
  | 'status'
  | 'appointmentDate'
  | 'typeAcctivity'
  | 'patientId'
  | 'psychologistId'
  | 'name'
  | 'createdAt'
> & {
  offset?: number
  limit?: number
  psychologistName?: string
  gender?: Gender
  minAge?: number
  maxAge?: number
  minDate?: Date
  maxDate?: Date
  course?: Courses
  education?: Education
  isActive?: boolean
  attachment?: attachment
  patientType?: PatientType
}

export type SearchAppointment = FilterAppointment
