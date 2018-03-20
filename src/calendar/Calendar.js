import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'glamorous'
import Octicon from 'react-octicon'
import format from 'date-fns/format'

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
  AmPm,
  HeaderDate,
  Controls,
  YearControl,
  MonthControl,
  CalendarArea,
  WeekDay,
  // Day,
  Button
} from './styles'

import Day from './day'

class Calendar extends Component {
  constructor (props) {
    super(props)

    const startDate = this.props.defaultDate || new Date()

    this.state = {
      currentDate: startDate,
      time: startDate,
      calendar: buildCalendar(currentMonth(startDate)),
      selectionStarted: false
    }

    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleDayHover = this.handleDayHover.bind(this)
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

  getChildContext () {
    return {
      currentDate: this.state.currentDate,
      selectionStarted: this.state.selectionStarted,
      startDate: parseInt(this.state.startDate, 10),
      endDate: parseInt(this.state.endDate, 10),
      selected: parseInt(this.state.selected, 10),
      underMouse: parseInt(this.state.underMouse, 10)
    }
  }

  tick () {
    this.setState({
      time: new Date()
    })
  }

  handleDayClick ({id}) {
    const state = {}

    if (this.props.multiSelect) {
      if (!this.state.startDate && !this.state.endDate) {
        console.log('started')
        state.startDate = id
        state.selectionStarted = true
      } else if (this.state.startDate && this.state.endDate) {
        console.log('cleared')
        state.endDate = undefined
        state.startDate = undefined
        state.selectionStarted = false
      } else if (this.state.startDate && this.state.selectionStarted) {
        console.log('ended')
        state.endDate = id
        state.selectionStarted = false
      }
    } else {
      state.selected = id
    }

    this.setState(state)
  }

  handleDayHover ({id}) {
    const state = {}

    if (this.state.selectionStarted && id < this.state.startDate - 1) {
      console.log('lower')
      state.endDate = this.state.startDate
      state.startDate = this.state.endDate
    }

    if (this.state.selectionStarted && id > this.state.endDate) {
      console.log('higher')
      state.startDate = this.state.endDate
      state.endDate = this.state.startDate
    }

    this.setState({...state, underMouse: id})
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
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header>
            <Time>{format(this.state.time, 'H:mm:ss')}</Time>
            <AmPm>{format(this.state.time, 'A')}</AmPm>
            <HeaderDate>
              <Button onClick={this.handleTodayClick}>
                {format(this.state.time, 'dddd MMMM, D YYYY')}</Button>
            </HeaderDate>
          </Header>
          <Controls>
            <YearControl>
              <Button>
                {format(this.state.currentDate, 'MMMM YYYY')}
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
                <Day
                  key={key}
                  date={date}
                  id={format(date, 'YYYYMMDD')}
                  clickMethod={this.handleDayClick}
                  mouseOverMethod={this.handleDayHover}>
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

Calendar.childContextTypes = {
  currentDate: PropTypes.date,
  selectionStarted: PropTypes.bool,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  selected: PropTypes.number,
  underMouse: PropTypes.number
}

export default Calendar
