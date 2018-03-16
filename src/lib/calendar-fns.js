const previous = (year, month) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const previousMonthFill = (firstDayIndex - 1 + 7) % 7
  const offset = previousMonthFill + daysInMonth

  return new Date(year, month, 0 - offset)
}

const next = (year, month) => {
  const firstDayIndex = new Date(year, month + 1, 1).getDay()
  const previousMonthFill = (0 - 7) % 7
  const offset = firstDayIndex + previousMonthFill

  return new Date(year, month + 1, 1 - offset)
}

export const buildCalendar = (startDate) => {
  const days = []
  for (let offset = 0; offset < 42; offset++) {
    days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + offset))
  }

  return [...days]
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
