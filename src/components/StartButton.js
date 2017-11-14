import React, { Component } from 'react'
import isPressed from './isPressedHOC'

class StartButton extends Component {
  state = {
    isEverClicked: false,
  }

  render() {
    console.log(this.props)
    return (
      <button onClick={() => {
        !this.state.isEverClicked && this.setState({isEverClicked: true})
        this.props.onClick()
      }}>{this.state.isEverClicked ? 'Restart' : 'Start'}</button>
    )
  }
}

export default isPressed(StartButton)