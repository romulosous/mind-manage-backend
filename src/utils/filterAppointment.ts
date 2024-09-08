import { Prisma } from '@prisma/client'
import { SearchAppointment } from 'src/appointment/dto/filterAppointment'
import { dateFilter } from './dateFilter'
import { ageFilter } from './ageFilter'

export function builderFilter(
  filter: SearchAppointment,
): Prisma.AppointmentWhereInput {
  const {
    appointmentDate,
    name,
    patientId,
    psychologistId,
    status,
    type,
    typeAcctivity,
    gender,
    minAge,
    maxAge,
    minDate,
    maxDate,
    course,
    createdAt,
    education,
    isActive,
    psychologistName,
    attachment,
    patientType,
  } = filter

  const appointmentDateFilter = dateFilter(minDate, maxDate)

  return {
    ...(name ||
    patientId ||
    psychologistId ||
    status ||
    type ||
    typeAcctivity ||
    createdAt ||
    appointmentDate ||
    maxDate ||
    minDate
      ? {
          ...(name && { name }),
          ...(patientId && { patientId: Number(patientId) }),
          ...(psychologistId && { psychologistId: Number(psychologistId) }),
          ...(status && { status }),
          ...(type && { type }),
          ...(typeAcctivity && { typeAcctivity }),
          ...(createdAt && { createdAt }),
          ...(Object.keys(appointmentDateFilter).length && {
            appointmentDate: appointmentDateFilter,
          }),
          // ...(Object.keys(dateFilter).length && { createdAt: dateFilter }),
        }
      : {}),
    ...(gender ||
    course ||
    education ||
    isActive ||
    attachment ||
    patientType ||
    minAge ||
    maxAge
      ? {
          Patient: {
            gender,
            course,
            education,
            attachment: attachment ? { has: attachment } : undefined,
            isActive,
            patientType,
            age: ageFilter(minAge, maxAge),
          },
        }
      : {}),
    ...(psychologistName || psychologistId
      ? {
          Psychologist: {
            name: {
              contains: psychologistName,
            },
            id: psychologistId ? Number(psychologistId) : undefined,
          },
        }
      : {}),
  }
}
