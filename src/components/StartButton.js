import React, { Component } from 'react'
import isPressed from './isPressedHOC'

class StartButton extends Component {
  render() {
    console.log(this.props)
    return (
      <button onClick={this.props.onClick}>Start</button>
    )
  }
}

export default isPressed(StartButton)