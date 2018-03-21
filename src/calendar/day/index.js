import React from 'react'
import PropTypes from 'prop-types'
import ButtonControl from '../../lib/button-control'

import {
  Day,
  DayContainer
} from './styles'

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: parseInt(props.id, 10)
    }
  }

  isToday () {
    return this.props.date.toLocaleDateString() === (new Date()).toLocaleDateString()
  }

  inMonth () {
    return this.props.date.getMonth() === this.context.currentDate.getMonth()
  }

  isSelected () {
    return this.props.id === this.context.selected
  }

  inRange () {
    const {startDate, endDate} = this.context
    const id = this.props.id

    return (id > startDate) && (id < endDate)
  }

  rangeStart () {
    return this.context.startDate === this.props.id
  }

  rangeEnd () {
    const {endDate, startDate} = this.context
    return endDate === this.props.id && endDate !== startDate
  }

  render () {
    return (
      <DayContainer
        isToday={this.isToday()}
        isSelected={this.isSelected()}
        inRange={this.inRange()}
        rangeStart={this.rangeStart()}
        rangeEnd={this.rangeEnd()}
        onMouseOver={this.props.onMouseOver}
        onClick={this.props.onClick}>
        <Day
          isToday={this.isToday()}
          inMonth={this.inMonth()}
          isSelected={this.isSelected()}
          rangeStart={this.rangeStart()}
          rangeEnd={this.rangeEnd()}>
          {this.props.children}</Day>
      </DayContainer>
    )
  }
}

Wrapper.contextTypes = {
  currentDate: PropTypes.instanceOf(Date),
  selectionStarted: PropTypes.bool,
  endDate: PropTypes.string,
  startDate: PropTypes.string,
  selected: PropTypes.string
}

export default ButtonControl(Wrapper)
