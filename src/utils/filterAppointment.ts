import { Prisma } from '@prisma/client'
import { SearchAppointment } from 'src/appointment/dto/filterAppointment'

function buildDateRange(dateStr: string) {
  const [day, month, year] = dateStr.split('/').map(Number)

  const startOfDay = `${String(day - 1).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 00:00:00`
  const endOfDay = `${String(day + 1).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 23:59:59`

  return {
    gte: startOfDay,
    lte: endOfDay,
  }
}

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
  } = filter

  return {
    ...(appointmentDate && {
      appointmentDate: buildDateRange(appointmentDate),
    }),
    ...(name && { name }),
    ...(patientId && { patientId: Number(patientId) }),
    ...(psychologistId && { psychologistId: Number(psychologistId) }),
    ...(status && { status }),
    ...(type && { type }),
    ...(typeAcctivity && { typeAcctivity }),
  }
}
