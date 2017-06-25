import React, { Component } from 'react'
import MassiveMultiplayerGame from './massive_multiplayer_game/Game'
import { object } from 'cremma'

export default class App extends Component {

  // LIFECYCLE

  constructor(props) {
    super(props)
    this.state = props.initialState
    this.setupGameStateListener()
  }

  // ACCESSESORS

  channel() { return this.props.channel }
  gameState() { return this.state.game_state }

  // LISTENERS

  setupGameStateListener() {
    this.channel().on('lobby_channel:new_game_state', this.setState.bind(this))
  }

  // DISPATCHERS

  dispatchMove(move) {
    this.channel().push('lobby_channel:new_move', move)
  }

  // RENDER HELPERS

  gameProps() {
    return object.merge(this.gameState(), {
      dispatchMove: this.dispatchMove.bind(this),
    })
  }

  // RENDERERS

  render() {
    return (
      <div>
        {React.createElement(MassiveMultiplayerGame, this.gameProps())}
      </div>
    )
  }
}
