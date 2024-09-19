export const dateFilter = (minDate?: Date, maxDate?: Date) => {
  const filter = {}

  if (minDate) {
    filter['gte'] = new Date(minDate)
  }

  if (maxDate) {
    const adjustedMaxDate = new Date(maxDate)
    adjustedMaxDate.setDate(adjustedMaxDate.getDate() + 1)
    filter['lte'] = adjustedMaxDate
  }

  return filter
}
