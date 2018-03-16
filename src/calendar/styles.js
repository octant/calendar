import glamorous from 'glamorous'

export const Container = glamorous.div({
  position: 'relative',
  margin: 'auto',
  height: '28em',
  width: '23em',
}, ({theme}) => {
  return {
    color: theme.colors.text,
    backgroundColor: theme.colors.background
  }
})

export const Header = glamorous.div({
  position: 'absolute',
  top: '0',
  left: '0',
  height: '7em',
  width: '23em'
}, ({theme}) => {
  return {
    borderBottom: `${theme.colors.muted} 0.5px solid`
  }
})

export const Time = glamorous.span({
  position: 'absolute',
  top: 0,
  left: 0,
  fontWeight: 300,
  paddingTop: '0.2em',
  paddingLeft: '0.5em',
  fontSize: '2.8em'
})

export const AmPm = glamorous.span({
  position: 'absolute',
  fontSize: '1.2em',
  top: '2em'
}, ({theme}) => {
  return {
    color: theme.colors.subtle
  }
})

export const HeaderDate = glamorous.span({
  position: 'absolute',
  top: '4.4em',
  left: '1.5em',
  ':hover': {
    cursor: 'pointer'
  }
}, ({theme}) => {
  return {
    color: theme.colors.highlight
  }
})

export const Controls = glamorous.div({
  position: 'absolute',
  top: '7em',
  left: 0,
  height: '3em',
  width: '23em'
})

export const YearControl = glamorous.div({
  position: 'absolute',
  left: '1.5em',
  lineHeight: '3em'
})

export const Button = glamorous.a({
  textDecoration: 'none',
  ':hover': {
    cursor: 'pointer'
  }
})

export const MonthControl = glamorous.div({
  position: 'absolute',
  left: '19.5em',
  lineHeight: '3em'
})

export const CalendarArea = glamorous.div({
  position: 'absolute',
  top: '10em',
  left: 0,
  height: '18em',
  width: '23em'
})

export const WeekDay = glamorous.div({
  display: 'inline-block',
  width: '2em',
  margin: '0 0.9em 0.5em 0.9em',
  fontSize: '0.8em'
})

export const Day = glamorous.div({
  display: 'inline-block',
  width: '1.5em',
  margin: '0.6em 0.8em',
  fontSize: '1em'
}, ({theme, inCurrentMonth, isToday}) => {
  const style = {
    color: theme.colors.text,
    ':hover': {
      backgroundColor: theme.colors.hover
    }
  }

  if (!inCurrentMonth) {
    style.color = theme.colors.muted
  }

  if (isToday) {
    style.backgroundColor = theme.colors.highlight
    style.color = theme.colors.highlightedText
  }

  return style
})
