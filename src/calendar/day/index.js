import React from 'react'

import {
  Day,
  DayContainer
} from './styles'

class Wrapper extends React.Component {
  render () {
    return (
      <DayContainer {...this.props}>
        <Day {...this.props}>{this.props.children}</Day>
      </DayContainer>
    )
  }
}

export default Wrapper
