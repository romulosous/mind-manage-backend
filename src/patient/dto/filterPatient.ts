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
> & {
  offset?: number
  limit?: number
  minAge?: number
  maxAge?: number
}

export type SearchPatient = filterpatient
