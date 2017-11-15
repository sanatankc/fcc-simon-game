import React, { Component } from 'react'
import isPressed from './isPressedHOC'
import Button from './Button.style'
import boxShadow3d from '../utils/boxShadow3d'
import shadeColor from '../utils/shadeColor'

const StyledButton = Button.extend.attrs({
  color: props => !props.strict ? '#E74C3C' : '#00B248'
})`
  background-color: ${({color}) => color};
  box-shadow: ${props => props.isPressed
    ? boxShadow3d(3, shadeColor(props.color, -40))
    : boxShadow3d(7, shadeColor(props.color, -40))
  };
`

class StrictButton extends Component {
  render() {
    return (
      <StyledButton
        isPressed={this.props.isPressed}
        strict={this.props.strict}
        onClick={this.props.onClick}
      >{!this.props.strict ? 'Strict' : 'Easy'}</StyledButton>
    )
  }
}

export default isPressed(StrictButton)