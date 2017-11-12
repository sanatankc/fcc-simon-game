import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import im from './im'

// const boxShadow3d = (offset, color) => {
//   let css = ''
//   for (let i = 1; i < offset + 1; i++) {
//     css += `${i}px ${i}px 0px ${color}${(offset !== i) ? ', ' : ''}`
//   }
//   return css
// }

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
  position: relative;
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
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background: ${props => props.shouldGlow
      ? 'rgba(0, 0, 0, 0)'
      : 'rgba(0, 0, 0, 0.3)'
    };
  }
`

const InnerMask = styled.div`
  width: 37.5%;
  height: 37.5%;
  position: absolute;
  background: #ECF0F1;
  border-radius: 50%;
`
const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
`
const ControlsContainer = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100px;
`
const ButtonsContainer = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 200px;
  height: 100%;
`


const cardsFalseState = [false, false, false, false]
class App extends Component {
  state = {
    gameState: [],
    userCards: [],
    cardsToGlow: [],
    cardGlow: [false, false, false, false],
    cardColor: ['#F7B267', '#E74C3C', '#246A73', '#3498DB'],
    clickIsAllowed: false,
    shouldHandleMouseLeave: false,
  }

  componentDidMount() {
    this.initSound()
  }

  initSound() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.oscillator = this.audioCtx.createOscillator()
    this.gainNode = this.audioCtx.createGain()
    this.oscillator.type = 'triangle'
    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.audioCtx.destination)
    this.oscillator.start(0)
    this.oscillator.frequency.value = 110
    this.gainNode.gain.value = 0
  }

  glowCards() {
    const { cardsToGlow } = this.state
    if (cardsToGlow.length === 0) {
      this.setState({cardGlow: cardsFalseState})
      this.setState({clickIsAllowed: true})
      return 0
    }
    this.gainNode.gain.value = 1
    this.gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioCtx.currentTime + 1)
    const cardToGlow = cardsToGlow[0]
    const glowingCards = im.insert(cardsFalseState, cardToGlow, true)

    this.setState({cardGlow: glowingCards}, () => {
      cardsToGlow.shift()
      this.setState({ cardsToGlow },() => {
        setTimeout(this.glowCards.bind(this), 1000)
      })
    })
  }

  handleStart(e) {
    const gameState = im.push(this.state.gameState, Math.floor(Math.random() * 4))
    this.setState({
      gameState: [...gameState],
      cardsToGlow: [...gameState]
    }, () => {
        this.glowCards()
      })
  }

  handleStrict(e) {
    console.log(e)
  }

  handleCardDown(e) {
    e.preventDefault()
    if (this.state.clickIsAllowed) {
      const glowingCards = im.insert(cardsFalseState, e.target.dataset.key, true)
      this.setState({cardGlow: glowingCards})
      this.setState({shouldHandleMouseLeave: true})
      this.gainNode.gain.value = 0.5
    } else {
      return 0
    }
  }

  handleCardUp(e) {
    if (this.state.clickIsAllowed) {
      const cardIndex = e.target.dataset.key
      this.gainNode.gain.value = 0
      this.setState(prevState => ({
        cardGlow: cardsFalseState,
        shouldHandleMouseLeave: false,
        userCards: im.push(prevState.userCards, cardIndex)
      }))
    }
  }


  handleCardLeave(e) {
    if (this.state.shouldHandleMouseLeave) {
      this.handleCardUp(e)
    }

  }

  render() {
    return (
      <Main>
        <Container>
          <MainCircle>
            <Mask>
              {this.state.cardColor.map((color, i) =>
                <Card
                  color={color}
                  key={i}
                  shouldGlow={this.state.cardGlow[i]}
                  data-key={i}
                  onMouseDown={this.handleCardDown.bind(this)}
                  onMouseUp={this.handleCardUp.bind(this)}
                  onMouseLeave={this.handleCardLeave.bind(this)}
                />
              )}
            </Mask>
            <InnerMask />
          </MainCircle>
          <ControlsContainer>
            <ButtonsContainer>
              <button onClick={() => this.handleStart()}>Start</button>
              <button onClick={this.handleStrict}>Strict</button>
            </ButtonsContainer>
          </ControlsContainer>
        </Container>
      </Main>
    )
  }
}

export default App
