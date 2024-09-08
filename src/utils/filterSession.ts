import { Prisma } from '@prisma/client'
import { SearchSession } from 'src/session/dto/filterSession'
import { dateFilter } from './dateFilter'

export function builderFilter(filter: SearchSession): Prisma.SessionWhereInput {
  const {
    psychologistId,
    patientId,
    id,
    sessionDate,
    maxDate,
    minDate,
    patientName,
    psychologistName,
  } = filter

  const dateFilterSession = dateFilter(minDate, maxDate)

  return {
    ...(psychologistId ||
    patientId ||
    id ||
    sessionDate ||
    minDate ||
    maxDate ||
    patientName ||
    psychologistName
      ? {
          ...(psychologistId && {
            psychologist: { id: Number(psychologistId) },
          }),
          ...(patientId && { patient: { id: Number(patientId) } }),
          ...(id && { id: Number(id) }),
          ...(sessionDate && { sessionDate }),
          ...(Object.keys(dateFilterSession).length && {
            sessionDate: dateFilterSession,
          }),
          ...(patientName && {
            patient: {
              name: {
                contains: patientName,
              },
            },
          }),
          ...(psychologistName && {
            psychologist: {
              name: {
                contains: psychologistName,
              },
            },
          }),
        }
      : {}),
  }
}
