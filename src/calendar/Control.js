import React from 'react'

const Control = (WrappedComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this.handleClick = this.handleClick.bind(this)
      this.handleMouseOver = this.handleMouseOver.bind(this)
    }

    handleClick (e) {
      this.props.clickMethod
        ? this.props.clickMethod({...this.props})
        : console.log('add a clickMethod property')
    }

    handleMouseOver (e) {
      this.props.mouseOveroverMethod
        ? this.props.clickMethod({...this.props})
        : console.log('add a mouseOverMethod property')
    }

    render () {
      return (
        <WrappedComponent
          onMouseOver={this.handleMouseOver}
          onClick={this.handleClick}
          {...this.props} />
      )
    }
  }
}

export default Control
