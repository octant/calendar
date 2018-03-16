import React from 'react'

const Control = (WrappedComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
      this.props.clickMethod
        ? this.props.clickMethod({...this.props})
        : console.log('add a clickMethod property')
    }

    render () {
      return <WrappedComponent onClick={this.handleClick} {...this.props} />
    }
  }
}

export default Control
