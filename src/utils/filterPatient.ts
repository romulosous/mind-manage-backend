import { Prisma } from '@prisma/client'
import { SearchPatient } from 'src/patient/dto/filterPatient'

import { dateFilter } from './dateFilter'

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
    minDate,
    maxDate,
  } = filter

  let ageFilter = {}

  if (minAge !== undefined && !isNaN(Number(minAge))) {
    ageFilter = {
      ...ageFilter,
      gte: Number(minAge),
    }
  }

  if (maxAge !== undefined && !isNaN(Number(maxAge))) {
    ageFilter = {
      ...ageFilter,
      lte: Number(maxAge),
    }
  }

  const dateFilterPatient = dateFilter(minDate, maxDate)

  return {
    ...(isActive ||
    createdBy ||
    course ||
    patientType ||
    education ||
    gender ||
    name ||
    id ||
    age ||
    registration ||
    createdAt ||
    minDate ||
    maxDate ||
    minAge ||
    maxAge
      ? {
          ...(isActive && { isActive }),
          ...(createdBy && { createdBy }),
          ...(course && { course }),
          ...(patientType && { patientType }),
          ...(education && { education }),
          ...(gender && { gender }),
          ...(name && {
            name: {
              contains: name,
            },
          }),
          ...(id && { id: Number(id) }),
          ...(ageFilter && { age: ageFilter }),
          ...(age && { age: Number(age) }),
          ...(registration && { registration }),
          ...(createdAt && { createdAt }),
          ...(Object.keys(dateFilterPatient).length && {
            createdAt: dateFilterPatient,
          }),
        }
      : {}),
  }
}
