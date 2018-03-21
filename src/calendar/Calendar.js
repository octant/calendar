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
      selectionState: 0,
      selectionStates: [
        'initial',
        'started',
        'completed'
      ]
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

  isCurrentSelectionState (state) {
    return this.getCurrentSelectionState() === state
  }

  getCurrentSelectionState () {
    return this.state.selectionStates[this.state.selectionState]
  }

  getNextSelectionState () {
    return (this.state.selectionState + 1) % this.state.selectionStates.length
  }

  getChildContext () {
    return {
      currentDate: this.state.currentDate,
      endDate: this.state.endDate || this.state.underMouse,
      startDate: this.state.startDate || this.state.underMouse,
      selected: this.state.selected
    }
  }

  tick () {
    this.setState({
      time: new Date()
    })
  }

  handleDayClick ({id}) {
    const {startDate, endDate} = this.state
    const state = {}

    if (this.props.multiSelect) {
      if (this.isCurrentSelectionState('initial')) {
        state.startDate = id
        state.selectionState = this.getNextSelectionState()
      } else if (this.isCurrentSelectionState('started')) {
        state.endDate = endDate || id
        state.startDate = startDate || id
        state.selectionState = state.endDate === state.startDate
          ? this.state.selectionState
          : this.getNextSelectionState()
      } else if (this.isCurrentSelectionState('completed')) {
        state.endDate = undefined
        state.startDate = undefined
        state.selectionState = this.getNextSelectionState()
      }
    } else {
      state.selected = id
    }

    this.setState(state)
  }

  handleDayHover ({id}) {
    const state = {}

    if (this.isCurrentSelectionState('started') && id < this.state.startDate) {
      state.endDate = this.state.startDate
      state.startDate = undefined
    }

    if (this.isCurrentSelectionState('started') && id > this.state.endDate) {
      state.startDate = this.state.endDate
      state.endDate = undefined
    }

    state.underMouse = this.props.multiSelect ? id : undefined
    this.setState(state)
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
            <Time>{format(this.state.time, 'hh:mm:ss')}</Time>
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
  currentDate: PropTypes.instanceOf(Date),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  selected: PropTypes.string
}

export default Calendar
