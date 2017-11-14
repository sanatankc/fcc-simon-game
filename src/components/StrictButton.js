import React, { Component } from 'react'
import isPressed from './isPressedHOC'
import Button from './Button.style'

class StrictButton extends Component {
  state = {
    buttonState: 0
  }

  render() {
    return (
      <Button isPressed={this.props.isPressed} onClick={() => {
        this.props.onClick()
        this.setState(({buttonState}) => ({buttonState: +!buttonState}))
      }}>{this.state.buttonState ? 'Strict' : 'Easy'}</Button>
    )
  }
}

export default isPressed(StrictButton)