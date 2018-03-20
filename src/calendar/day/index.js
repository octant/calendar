import React from 'react'
import PropTypes from 'prop-types'

import {
  Day,
  DayContainer
} from './styles'

class Wrapper extends React.Component {
  isSelected () {
    return parseInt(this.props.id, 10) === this.context.selected
  }

  inRange () {
    const {startDate, endDate} = this.context
    const id = parseInt(this.props.id, 10)

    return (id > startDate) && (id < endDate)
  }

  rangeStart () {
    return this.context.startDate === parseInt(this.props.id, 10)
  }

  rangeEnd () {
    return this.context.endDate === parseInt(this.props.id, 10)
  }

  render () {
    return (
      <DayContainer
        isSelected={this.isSelected()}
        inRange={this.inRange()}
        rangeStart={this.rangeStart()}
        rangeEnd={this.rangeEnd()}
        {...this.props}>
        <Day
          rangeStart={this.rangeStart()}
          rangeEnd={this.rangeEnd()}
          {...this.props}>{this.props.children}</Day>
      </DayContainer>
    )
  }
}

Wrapper.contextTypes = {
  selectionStarted: PropTypes.bool,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  selected: PropTypes.number,
  underMouse: PropTypes.number
}

export default Wrapper
