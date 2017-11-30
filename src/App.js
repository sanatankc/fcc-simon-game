import React, { Component } from 'react'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import im from './utils/im'
import Sound from './utils/sound'
import StartButton from './components/StartButton'
import StrictButton from './components/StrictButton'
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
    strict: false
  }

  freq = [329.63,261.63,220,164.81]

  componentDidMount() {
    this.sound = new Sound()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameState.length !== prevState.level) {
      if (prevState.gameState.length !== 0) {
        this.setState({level: this.state.gameState.length})
      }
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
    this.setState({
      gameState: [...gameState],
      cardsToGlow: [...gameState]
    }, () => {
        this.glowCards()
      })
  }

  handleStrict(e) {
    this.setState(prevState => ({
      strict: !prevState.strict
    })
  )}

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
    e.preventDefault()
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
      this.losingAnimation(this.onLose)
    }
  }

  onWin() {
    this.setState(prevState => ({
      userCards: [],
      clickIsAllowed: false,
    }), () => {
      setTimeout(() => this.handleStart([...this.state.gameState, Math.floor(Math.random() * 4)]), 500)
    })
  }

  onLose() {
    if (this.state.strict) {
      this.reset()
    } else {
      this.setState({
        userCards: []
      }, () => {
        setTimeout(() => this.handleStart([...this.state.gameState]), 500)
      })
    }
  }

  losingAnimation(callback) {
    const allCardsGlow = [true, true, true, true]
    this.setState({
      cardGlow: allCardsGlow,
      clickIsAllowed: false
    })
    this.sound.play(1040)
    setTimeout(() => {
      this.setState({cardGlow: cardsFalseState}, callback)
      this.sound.pause()
    } ,2000)
  }

  handleCardLeave(e) {
    e.preventDefault()
    if (this.state.shouldHandleMouseLeave) {
      this.handleCardUp(e)
    }
  }

  reset() {
    this.setState({
      gameState: [],
      cardsToGlow: [],
      userCards: [],
      clickIsAllowed: false,
    }, () => {
      setTimeout(() => this.handleStart([Math.floor(Math.random() * 4)]), 500)
    })
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
                  onTouchStart={this.handleCardDown.bind(this)}
                  onTouchEnd={this.handleCardUp.bind(this)}
                  onTouchMove={this.handleCardLeave.bind(this)}
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
              <StartButton onClick={this.reset.bind(this)} />
              <StrictButton
                onClick={this.handleStrict.bind(this)}
                strict={this.state.strict}
              >Strict</StrictButton>
            </ButtonsContainer>
          </ControlsContainer>
        </Container>
        <GitHubForkRibbon
          href="//www.github.com/sanatankumar/fcc-simon-game"
          target="_blank"
          position="right">
          View Code On Github
        </GitHubForkRibbon>
      </Main>
    )
  }
}

export default App
