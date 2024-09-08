export const dateFilter = (minDate?: Date, maxDate?: Date) => {
  const filter = {}

  if (minDate) {
    filter['gte'] = new Date(minDate)
  }

  if (maxDate) {
    filter['lte'] = new Date(maxDate)
  }

  return filter
}
