import React, { Component } from 'react'
import { ThemeProvider } from 'glamorous'
import Octicon from 'react-octicon'

import theme from './theme'

import {
  nextMonth,
  previousMonth,
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
      time: startDate,
      calendar: buildCalendar(currentMonth(startDate))
    }

    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleTodayClick = this.handleTodayClick.bind(this)
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
      time: new Date()
    })
  }

  handleNextClick () {
    const state = {}
    const {currentDate} = this.state
    const newMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    state.currentDate = newMonth
    state.calendar = buildCalendar(nextMonth(this.state.currentDate))

    this.setState({...state})
  }

  handlePrevClick () {
    const state = {}
    const {currentDate} = this.state
    const newMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    state.currentDate = newMonth
    state.calendar = buildCalendar(previousMonth(this.state.currentDate))

    this.setState({...state})
  }

  handleTodayClick () {
    const state = {}
    const newMonth = new Date()
    state.currentDate = newMonth
    state.calendar = buildCalendar(currentMonth(newMonth))
    this.setState({...state})
  }

  render () {
    const today = new Date()
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <Time>{this.state.time.toLocaleTimeString()}</Time>
            <HeaderDate>
              <Button onClick={this.handleTodayClick}>
                {today.toLocaleString('en-us', { month: 'long' })}, {today.getDate()} {today.getFullYear()}</Button>
            </HeaderDate>
          </Header>
          <Controls>
            <YearControl>
              <Button>
                {this.state.currentDate.toLocaleString('en-us', { month: 'long' })}, {this.state.currentDate.getFullYear()}
              </Button>
            </YearControl>
            <MonthControl>
              <Button onClick={this.handlePrevClick}><Octicon name='chevron-up' /></Button>
              <Button onClick={this.handleNextClick}><Octicon name='chevron-down' /></Button>
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
                <Button key={key}>
                  <Day
                    key={key}
                    inCurrentMonth={date.getMonth() === this.state.currentDate.getMonth()}
                    isToday={date.toLocaleDateString() === (new Date()).toLocaleDateString()}>
                    {date.getDate()}
                  </Day>
                </Button>
              )
            })}
          </CalendarArea>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Calendar
