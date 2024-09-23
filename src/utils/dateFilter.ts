export const dateFilter = (minDate?: Date, maxDate?: Date) => {
  const filter = {}

  if (minDate) {
    filter['gte'] = new Date(minDate)
  }

  if (maxDate) {
    const adjustedMaxDate = new Date(maxDate)
    adjustedMaxDate.setUTCHours(23, 59, 0, 0)

    filter['lte'] = adjustedMaxDate
  }

  return filter
}
