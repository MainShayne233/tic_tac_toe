import React, { Component } from 'react'

export default class Player extends Component {

  // LIFECYCLE

  constructor(props) {
    super(props)
  }

  // ACCESSORS

  xPos() { return this.props.x_pos }
  yPos() { return this.props.y_pos }

  // STYLES

  playerStyle() {
    return {
      position: 'absolute',
      height: 50,
      width: 50,
      backgroundColor: 'black',
      marginLeft: this.xPos() * 10,
      marginTop: this.yPos() * 10,
    }
  }

  // RENDERERS

  render() {
    return (
      <div
        style={this.playerStyle()}
      >
      </div>
    )
  }
}
