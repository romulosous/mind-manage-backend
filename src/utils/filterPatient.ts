import { Prisma } from '@prisma/client'
import { SearchPatient } from 'src/patient/dto/filterPatient'

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
    age,
    registration,
    startDate,
    endDate,
    month,
    year,
  } = filter

  let startDateFilter: Date | undefined
  let endDateFilter: Date | undefined

  if (month && year) {
    startDateFilter = new Date(year, month - 1, 1)
    endDateFilter = new Date(year, month, 0, 23, 59, 59, 999)
  }

  return {
    ...(createdAt && { createdAt: createdAt }),
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
    ...(age && { age: Number(age) }),
    ...(registration && { registration }),
    ...(startDate &&
      endDate && {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      }),
    ...(startDateFilter &&
      endDateFilter && {
        createdAt: {
          gte: startDateFilter,
          lte: endDateFilter,
        },
      }),
  }
}
