import { Prisma } from '@prisma/client'
import { SearchSession } from 'src/session/dto/filterSession'

export function builderFilter(filter: SearchSession): Prisma.SessionWhereInput {
  const {
    relationship,
    difficulty,
    psychologicalDisorder,
    psychologistId,
    patientId,
    id,
  } = filter

  return {
    ...(relationship && { relationship }),
    ...(difficulty && { difficulty }),
    ...(psychologicalDisorder && { psychologicalDisorder }),
    ...(psychologistId && { psychologistId: Number(psychologistId) }),
    ...(patientId && { patientId: Number(patientId) }),
    ...(id && { id: Number(id) }),
  }
}
