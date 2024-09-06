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
> & {
  offset?: number
  limit?: number
  minAge?: number
  maxAge?: number
  startDate?: Date
  endDate?: Date
  month?: number
  year?: number
}

export type SearchPatient = filterpatient
