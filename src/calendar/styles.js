import glamorous from 'glamorous'

export const Container = glamorous.div({
  position: 'relative',
  height: '28em',
  width: '23em',
  fontWeight: '400',
  color: '#CCC',
  backgroundColor: 'rgba(0, 0, 0, 0.7)'
})

export const Header = glamorous.div({
  position: 'absolute',
  top: '0',
  left: '0',
  height: '7em',
  width: '23em',
  borderBottom: '#888 0.5px solid'
})

export const Time = glamorous.span({
  position: 'absolute',
  top: 0,
  left: 0,
  fontWeight: 300,
  paddingTop: '0.2em',
  paddingLeft: '0.5em',
  color: '#CCC',
  fontSize: '2.8em'
})

export const HeaderDate = glamorous.span({
  position: 'absolute',
  top: '4.4em',
  left: '1.5em',
  color: 'rgba(45,137,239, 0.8)',
  ':hover': {
    cursor: 'pointer'
  }
})

export const Controls = glamorous.div({
  position: 'absolute',
  top: '7em',
  left: 0,
  height: '3em',
  width: '23em'
})

export const YearControl = glamorous.a({
  position: 'absolute',
  left: '1.5em',
  lineHeight: '3em'
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
  fontSize: '1em',
  color: '#888'
}, ({inCurrentMonth, isToday}) => {
  const style = {}
  if (inCurrentMonth) {
    style.color = '#CCC'
  }

  if (isToday) {
    style.backgroundColor = 'rgba(45,137,239, 0.8)'
    style.color = '#FFF'
  }
  return style
})
