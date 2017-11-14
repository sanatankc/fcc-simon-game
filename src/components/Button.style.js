import styled from 'styled-components'
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
export default Button