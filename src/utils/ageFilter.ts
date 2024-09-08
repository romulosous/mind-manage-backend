export function ageFilter(minAge?: number, maxAge?: number) {
  let filter = {}

  if (minAge !== undefined && !isNaN(Number(minAge))) {
    filter = {
      ...filter,
      gte: Number(minAge),
    }
  }

  if (maxAge !== undefined && !isNaN(Number(maxAge))) {
    filter = {
      ...filter,
      lte: Number(maxAge),
    }
  }

  return Object.keys(filter).length ? filter : {}
}
