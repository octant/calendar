import React, { Component } from 'react'
import { ThemeProvider } from 'glamorous'
import Octicon from 'react-octicon'

import theme from './theme'

import {
  currentMonth,
  buildCalendar
} from '../lib/calendar-fns'

import {
  Container,
  Header,
  Time,
  HeaderDate,
  Controls,
  YearControl,
  MonthControl,
  CalendarArea,
  WeekDay,
  Day,
  Button
} from './styles'

class Calendar extends Component {
  constructor (props) {
    super(props)

    const startDate = this.props.defaultDate || new Date()

    this.state = {
      currentDate: startDate,
      currentYear: startDate.getFullYear(),
      currentMonth: startDate.getMonth(),
      time: startDate.toLocaleTimeString(),
      calendar: buildCalendar(currentMonth(startDate))
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    const intervalID = setInterval(
      () => this.tick(),
      1000
    )
    this.setState({intervalID})
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
  }

  tick () {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  handleClick (command) {
    return (e) => {
      e.preventDefault()
      const state = {}
      let newMonth

      switch (command) {
        case 'prev':
          newMonth = new Date(this.state.currentYear, this.state.currentMonth - 1, 1)
          state.currentDate = newMonth
          state.currentYear = newMonth.getFullYear()
          state.currentMonth = newMonth.getMonth()
          state.calendar = buildCalendar(currentMonth(newMonth))
          break
        case 'next':
          newMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 1)
          state.currentDate = newMonth
          state.currentYear = newMonth.getFullYear()
          state.currentMonth = newMonth.getMonth()
          state.calendar = buildCalendar(currentMonth(newMonth))
          break
        case 'today':
          newMonth = new Date()
          state.currentDate = newMonth
          state.currentYear = newMonth.getFullYear()
          state.currentMonth = newMonth.getMonth()
          state.calendar = buildCalendar(currentMonth(newMonth))
          break
        default:
          break
      }

      this.setState({...state})
    }
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <Time>{this.state.time}</Time>
            <HeaderDate>
              <Button onClick={this.handleClick('today')}>March, 15 2018</Button>
            </HeaderDate>
          </Header>
          <Controls>
            <YearControl>
              <Button>
                {this.state.currentDate.toLocaleString('en-us', { month: 'long' })}, {this.state.currentDate.getFullYear()}
              </Button>
            </YearControl>
            <MonthControl>
              <Button onClick={this.handleClick('prev')}><Octicon name='chevron-up' /></Button>
              <Button onClick={this.handleClick('next')}><Octicon name='chevron-down' /></Button>
            </MonthControl>
          </Controls>
          <CalendarArea>
            <WeekDay>Su</WeekDay>
            <WeekDay>Mo</WeekDay>
            <WeekDay>Tu</WeekDay>
            <WeekDay>We</WeekDay>
            <WeekDay>Th</WeekDay>
            <WeekDay>Fr</WeekDay>
            <WeekDay>Sa</WeekDay>
            {this.state.calendar.map((date, key) => {
              return (
                <Day
                  key={key}
                  inCurrentMonth={date.getMonth() === this.state.currentMonth}
                  isToday={date.toLocaleDateString() === (new Date()).toLocaleDateString()}>
                  {date.getDate()}
                </Day>
              )
            })}
          </CalendarArea>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Calendar
