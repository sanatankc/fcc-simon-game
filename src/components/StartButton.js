import React, { Component } from 'react'
import isPressed from './isPressedHOC'
import Button from './Button.style'

class StartButton extends Component {
  state = {
    isEverClicked: false,
  }

  render() {
    console.log(this.props)
    return (
      <Button isPressed={this.props.isPressed} onClick={() => {
        !this.state.isEverClicked && this.setState({isEverClicked: true})
        this.props.onClick()
      }}>{this.state.isEverClicked ? 'Restart' : 'Start'}</Button>
    )
  }
}

export default isPressed(StartButton)