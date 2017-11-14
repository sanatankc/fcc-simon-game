import React, { Component } from 'react'

const isPressed = WrappedComponent => class Enhancer extends Component {
  state = {
    isPressed: false,
    isMouseDown: false
  }
  onMouseDown() {
    this.setState({
      isPressed: true,
      isMouseDown: true,
    })
  }

  onMouseUp() {
    this.setState({
      isPressed: false,
      isMouseDown: true,
    })
  }

  onMouseLeave() {
    if (this.state.isMouseDown) {
      this.setState({
        isPressed: false,
        isMouseDown: true,
      })
    }
  }

  render() {
    return (
      <div
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
        <WrappedComponent {...this.props} isPressed={this.state.isPressed}/>
      </div>
    )
  }
}

export default isPressed