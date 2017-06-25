import React, { Component } from 'react'
import Player from './Player'
import { object } from 'cremma'

export default class MassiveMultiplayerGame extends Component {

  constructor(props) {
    super(props)
    this.setupListeners()
  }

  // ACCESSESORS
  
  players() { return this.props.users }

  // LISTENERS

  setupListeners() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  // HANDLERS

  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        this.dispatchMove({direction: 'up'})
        break
      case 'ArrowDown':
        event.preventDefault()
        this.dispatchMove({direction: 'down'})
        break
      case 'ArrowLeft':
        event.preventDefault()
        this.dispatchMove({direction: 'left'})
        break
      case 'ArrowRight':
        event.preventDefault()
        this.dispatchMove({direction: 'right'})
        break
    }
  }

  // DISPATCHERS

  dispatchMove(move) {
    this.props.dispatchMove(move)
  }

  // RENDERERS

  renderPlayers() {
    return this.players().map((player, index) => {
      return (
        React.createElement(Player, object.merge(player, {key: index}))
      )
    })
  }
  
  render() {
    return (
      <div
        id="game-container"
        style={{ position: 'absolute', height: '100%', width: '100%' }}
      >
        {JSON.stringify( this.props ) || 'nothing'}
        {this.renderPlayers()}
      </div>
    )
  }
}
