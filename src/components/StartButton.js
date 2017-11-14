import React, { Component } from 'react'
import styled from 'styled-components'
import isPressed from './isPressedHOC'
import boxShadow3d from '../utils/boxShadow3d'

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 0px;
  background: #FFD500;
  color: #333;
  font-size: 12px;
  padding: 10px 10px 10px 15px;
  transition: 0.3s all ease-in-out;
  box-shadow: ${props => props.isPressed
    ? boxShadow3d(3, '#E2B537')
    : boxShadow3d(7, '#E2B537')
  }
`

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