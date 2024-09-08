import { Session } from '@prisma/client'

type FilterSession = Pick<
  Session,
  'psychologistId' | 'patientId' | 'id' | 'sessionDate'
> & {
  limit?: number
  offset?: number
  psychologistName?: string
  patientName?: string
  minDate?: Date
  maxDate?: Date
}

export type SearchSession = FilterSession
