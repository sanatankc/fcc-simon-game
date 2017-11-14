import React, { Component } from 'react'
import im from './utils/im'
import Sound from './utils/sound'
import {
  Main,
  MainCircle,
  Mask,
  Card,
  InnerMask,
  Container,
  ControlsContainer,
  ButtonsContainer,
  LevelCount
} from './App.style'

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
    level: 1,
  }

  freq = [329.63,261.63,220,164.81]

  componentDidMount() {
    this.sound = new Sound()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameState.length !== prevState.level) {
      this.setState({level: this.state.gameState.length})
    }
  }

  glowCards() {
    const { cardsToGlow } = this.state
    if (cardsToGlow.length === 0) {
      this.setState({cardGlow: cardsFalseState})
      this.setState({clickIsAllowed: true})
      return 0
    }
    const cardToGlow = cardsToGlow[0]
    this.sound.play(this.freq[cardToGlow])
    const glowingCards = im.insert(cardsFalseState, cardToGlow, true)
    cardsToGlow.shift()
    this.setState({
      cardGlow: glowingCards,
      cardsToGlow
    }, () => {
        setTimeout(() => {
          this.setState({cardGlow: cardsFalseState}, () => {
            this.sound.pause()
            setTimeout(this.glowCards.bind(this), 200)
          })
        },500)
      })
  }

  handleStart(gameState) {
    console.log('LOSER!!!')
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
      this.setState({
        cardGlow: glowingCards,
        shouldHandleMouseLeave: true
      })
      this.sound.play(e.target.dataset.freq)
    } else {
      return 0
    }
  }

  handleCardUp(e) {
    if (this.state.clickIsAllowed) {
      const cardIndex = e.target.dataset.key
      this.sound.pause()
      this.setState(prevState => ({
        cardGlow: cardsFalseState,
        shouldHandleMouseLeave: false,
        userCards: im.push(prevState.userCards, +cardIndex)
      }), () => this.validateCards(this.state.userCards))
    }
  }

  validateCards(cards) {
    console.log(cards)
    const allElementsEqual = cards.every((card, i) => (
      this.state.gameState[i] === card
    ))
    const isSameLength = this.state.gameState.length === cards.length

    if (allElementsEqual && isSameLength) {
      this.onWin()
    } else if (allElementsEqual && !isSameLength) {
      console.log('Game is Still Running!!!')
    } else {
      this.onLose()
    }
  }

  onWin() {
    this.setState(prevState => ({
      userCards: [],
    }), () => {
      setTimeout(() => this.handleStart([...this.state.gameState, Math.floor(Math.random() * 4)]), 500)
    })
  }

  onLose() {
    console.log(this)
    this.setState({
      userCards: []
    }, () => {
      setTimeout(() => this.handleStart([...this.state.gameState]), 500)
    })
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
                  data-freq = {this.freq[i]}
                  onMouseDown={this.handleCardDown.bind(this)}
                  onMouseUp={this.handleCardUp.bind(this)}
                  onMouseLeave={this.handleCardLeave.bind(this)}
                />
              )}
            </Mask>
            <InnerMask>
              <div>
                <p>Level</p>
                <LevelCount>{this.state.level}</LevelCount>
              </div>
            </InnerMask>
          </MainCircle>
          <ControlsContainer>
            <ButtonsContainer>
              <button onClick={() => this.handleStart([Math.floor(Math.random() * 4)])}>Start</button>
              <button onClick={this.handleStrict}>Strict</button>
            </ButtonsContainer>
          </ControlsContainer>
        </Container>
      </Main>
    )
  }
}

export default App
