import React, { Component } from 'react'
import TicTacToeBoard from './Board'

export default class Game extends Component {

  componentWillMount() {
    console.log(this.props.channel)
  }

  render() {
    return (
      <div>
        <TicTacToeBoard/>
      </div>
    )
  }
}

