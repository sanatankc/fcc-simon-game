import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import shade from './shadeColor'

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Main = styled.div`
  ${flexCenter}
  height: 100vh;
  width: 100vw;
  background: #333;
`
const MainCircle = styled.div`
  ${flexCenter}
  width: calc(100vw - 40px);
  height: calc(100vw - 40px);
  max-width: 400px;
  max-height: 400px;
  background: #ECF0F1;
  border-radius: 50%;
`
const Mask = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background: #ECF0F1;
  border-radius: 50%;
  overflow: hidden;
`
const Card = styled.div`
  width: calc(50% - 5px);
  height: calc(50% - 5px);
  background: ${(props) => props.color};
`

const Control = styled.div`
  width: 150px;
  height: 150px;
  background: red;
  position: absolute;
  background: #ECF0F1;
  border-radius: 50%;
`

class App extends Component {
  state = {
    gameState: [0, 1, 2],
    defaultCardColor: ['#2C3E50', '#E74C3C', '#246A73', '#3498DB'],
    currentCardColor: ['#2C3E50', '#E74C3C', '#246A73', '#3498DB'],
  }
  componentDidMount() {
    this.glowCards()
  }

  glowCards() {
    const cardsToGlow = this.state.gameState
    if (cardsToGlow.length === 0) {
      this.setState({currentCardColor: this.state.defaultCardColor})
      return 0
    }
    const cardToGlow = cardsToGlow[0]
    const defaultColors = [...this.state.defaultCardColor]

    defaultColors[cardToGlow] = shade(defaultColors[cardToGlow], -40)
    console.log(cardsToGlow, cardToGlow, defaultColors)
    this.setState({ currentCardColor: defaultColors }, () => {
      cardsToGlow.shift()
      console.log(cardsToGlow)
      this.setState({ gameState: cardsToGlow },() => {
        setTimeout(this.glowCards.bind(this), 2000)
      })
    })
  }

  render() {

    return (
      <Main>
        <MainCircle>
          <Mask>
            {this.state.currentCardColor.map((color, i) =>
              <Card color={color} key={i} />
            )}
          </Mask>
          <Control />
        </MainCircle>
      </Main>
    )
  }
}

export default App
