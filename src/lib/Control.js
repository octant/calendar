import React from 'react'

const Control = (WrappedComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this.handleClick = this.handleClick.bind(this)
      this.handleMouseOver = this.handleMouseOver.bind(this)
    }

    handleClick (e) {
      if (this.props.clickMethod) {
        this.props.clickMethod({...this.props})
      }
    }

    handleMouseOver (e) {
      if (this.props.mouseOverMethod) {
        this.props.mouseOverMethod({...this.props})
      }
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
