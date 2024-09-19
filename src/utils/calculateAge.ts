export const calculateAge = (birthDate: Date) => {
  // Create Date objects for the birth date and today's date
  const birthDateObj = new Date(birthDate)
  const today = new Date()

  // Calculate the difference in milliseconds
  const ageInMilliseconds = today.getTime() - birthDateObj.getTime()

  // Convert the difference to years (approximately, considering a non-leap year)
  const millisecondsInYear = 365 * 24 * 60 * 60 * 1000
  const ageInYears = Math.floor(ageInMilliseconds / millisecondsInYear)

  return ageInYears
}
