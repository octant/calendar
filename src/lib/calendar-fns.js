export const previous = (year, month) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const previousMonthFill = (1 + 7) % 7
  const offset = firstDayIndex - previousMonthFill + daysInMonth

  return new Date(year, month, 0 - offset)
}

export const next = (year, month) => {
  const firstDayIndex = new Date(year, month + 1, 1).getDay()
  const previousMonthFill = (0 - 7) % 7
  const offset = firstDayIndex + previousMonthFill

  return new Date(year, month + 1, 1 - offset)
}

export const currentMonth = (date) => {
  return next(date.getFullYear(), date.getMonth() - 1)
}

export const nextMonth = (date) => {
  return next(date.getFullYear(), date.getMonth())
}

export const previousMonth = (date) => {
  return previous(date.getFullYear(), date.getMonth())
}
