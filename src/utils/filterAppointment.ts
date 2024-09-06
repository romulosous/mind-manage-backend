import { Prisma } from '@prisma/client'
import { SearchAppointment } from 'src/appointment/dto/filterAppointment'

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
  } = filter

  return {
    ...(appointmentDate && {
      appointmentDate: appointmentDate,
    }),
    ...(name && { name }),
    ...(patientId && { patientId: Number(patientId) }),
    ...(psychologistId && { psychologistId: Number(psychologistId) }),
    ...(status && { status }),
    ...(type && { type }),
    ...(typeAcctivity && { typeAcctivity }),
    ...(gender !== undefined || minAge || maxAge
      ? {
          Patient: {
            ...(gender !== undefined && { gender: gender as any }),
            ...(minAge && { age: { gte: Number(minAge) } }),
            ...(maxAge && { age: { lte: Number(maxAge) } }),
          },
        }
      : {}),
  }
}
