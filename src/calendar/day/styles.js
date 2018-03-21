import glamorous from 'glamorous'
import Control from '../../lib/Control'

export const Day = glamorous.div({
  position: `relative`,
  height: `2.5em`,
  width: `2.5em`,
  margin: `0.125em`,
  lineHeight: `2.25em`
}, ({theme, inMonth, isToday, rangeStart, rangeEnd}) => {
  const style = {
    color: theme.colors.text,
    ':hover': {
      backgroundColor: theme.colors.hover
    }
  }

  if (!inMonth) {
    style.color = theme.colors.muted
  }

  if (isToday) {
    style.backgroundColor = theme.colors.highlight
    style.color = theme.colors.emphasizedText
  }

  if (rangeStart) {
    style.borderRadius = `1.25em 0 0 1.25em`
  }

  if (rangeEnd) {
    style.borderRadius = `0 1.25em 1.25em 0`
  }

  return style
})

export const DayContainer = Control(glamorous.div({
  position: `relative`,
  float: `left`,
  width: `2.75em`,
  height: `2.75em`,
  margin: `0.125em 0`
}, ({theme, isToday, isSelected, inRange, rangeStart, rangeEnd}) => {
  const style = {
    color: theme.colors.text,
    ':hover': {
      cursor: 'pointer'
    }
  }

  if (inRange) {
    style.backgroundColor = theme.colors.highlight
  }

  if (isSelected) {
    style.backgroundColor = theme.colors.highlightDark
  }

  if (rangeStart) {
    style.backgroundColor = theme.colors.highlightDark
    style.borderRadius = `1.25em 0 0 1.25em`
  }

  if (rangeEnd) {
    style.backgroundColor = theme.colors.highlightDark
    style.borderRadius = `0 1.25em 1.25em 0`
  }

  if (isToday) {
    style.backgroundColor = theme.colors.muted
  }

  return style
}))
