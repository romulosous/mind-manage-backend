import { Session } from '@prisma/client'

type FilterSession = Pick<
  Session,
  | 'relationship'
  | 'difficulty'
  | 'psychologicalDisorder'
  | 'psychologistId'
  | 'patientId'
  | 'id'
> & {
  limit?: number
  offset?: number
}

export type SearchSession = FilterSession
