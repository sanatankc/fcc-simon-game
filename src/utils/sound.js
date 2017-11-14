class Sound {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.oscillator = this.audioCtx.createOscillator()
    this.gainNode = this.audioCtx.createGain()
    this.oscillator.type = 'sine'
    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.audioCtx.destination)
    this.oscillator.start(0)
    this.gainNode.gain.value = 0
  }

  play(freq) {
    this.oscillator.frequency.value = freq
    this.gainNode.gain.value = 0.5
  }

  pause() {
    this.gainNode.gain.value = 0
  }
}

export default Sound