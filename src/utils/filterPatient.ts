import { Prisma } from '@prisma/client'
import { SearchPatient } from 'src/patient/dto/filterPatient'

function createAtPacient(dateStr: string) {
  const [day, month, year] = dateStr.split('/').map(Number)

  const startOfDay = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 00:00:00`
  const endOfDay = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}, 23:59:59`

  return {
    gte: startOfDay,
    lte: endOfDay,
  }
}

export function builderFilter(filter: SearchPatient): Prisma.PatientWhereInput {
  const {
    createdAt,
    isActive,
    createdBy,
    course,
    name,
    patientType,
    education,
    gender,
    id,
    maxAge,
    minAge,
  } = filter

  return {
    ...(createdAt && { createdAt: createAtPacient(createdAt) }),
    ...(isActive && { isActive: Boolean(isActive) }),
    ...(createdBy && { createdBy }),
    ...(course && { course }),
    ...(name && {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    }),
    ...(id && { id: Number(id) }),
    ...(gender && { gender }),
    ...(patientType && { patientType }),
    ...(education && { education }),
    ...(minAge && { age: { gte: Number(minAge) } }),
    ...(maxAge && { age: { lte: Number(maxAge) } }),
  }
}
