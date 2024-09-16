import { Patient } from '@prisma/client'

type seriesOptions =
  | '1'
  | '1A'
  | '1B'
  | '1C'
  | '2'
  | '2A'
  | '2B'
  | '2C'
  | '3'
  | '3A'
  | '3B'
  | '3C'
  | '1 Modulo'
  | '2 Modulo'
  | '3 Modulo'
  | '4 Modulo'
  | '5 Modulo'
  | '6 Modulo'
  | '7 Modulo'
  | '8 Modulo'

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
  series?: seriesOptions[]
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
