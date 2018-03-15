export const previous = (year, month) => {
  return (
    new Date(year, month, 0 - ((new Date(year, month - 1, 1).getDay() - 1 + 7) % 7 + new Date(year, month, 0).getDate()))
  )
}

export const next = (year, month) => {
  return (
    new Date(year, month + 1, 1 - (new Date(year, month + 1, 1)).getDay() + ((0 - 7) % 7))
  )
}

export const current = (date) => {
  return next(date.getFullYear(), date.getMonth() - 1)
}

export const nextMonth = (date) => {
  return next(date.getFullYear(), date.getMonth())
}

export const previousMonth = (date) => {
  return previous(date.getFullYear(), date.getMonth())
}
