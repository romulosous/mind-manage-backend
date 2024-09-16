import { Patient } from '@prisma/client'

type filterpatient = Pick<
  Patient,
  | 'isActive'
  | 'createdBy'
  | 'course'
  | 'patientType'
  | 'education'
  | 'gender'
  | 'createdAt'
  | 'name'
  | 'id'
  | 'age'
  | 'registration'
  | 'series'
> & {
  offset?: number
  limit?: number
  minAge?: number
  maxAge?: number
  minDate?: Date
  maxDate?: Date
  month?: number
  year?: number
}

export type SearchPatient = filterpatient
