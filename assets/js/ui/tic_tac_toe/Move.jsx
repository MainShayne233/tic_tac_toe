import React, { Component } from 'react'

export default class TicTacToeMove extends Component {

  // ACCESSORS

  move() { return this.props.move }
  player() { return this.move().player }
  row() { return this.move().row }
  column() { return this.move().column }
  boardVerticalRanges() { return this.props.boardVerticalRanges() }
  boardHorizontalRanges() { return this.props.boardHorizontalRanges() }
  verticalRange() { return this.boardVerticalRanges()[ this.row() ] }
  horizontalRange() { return this.boardHorizontalRanges()[ this.column() ] }

  // STYLES

  moveStyle() {
    const [ verticalMin, verticalMax ] = this.verticalRange()
    const [ horizontalMin, horizontalMax ] = this.horizontalRange()
    return {
      position: 'fixed',
      fontSize: 100,
      marginLeft: horizontalMin - 30,
      marginTop: verticalMin - 360,
    }
  }

  // RENDERERS

  render() {
    return (
      <div
        style={this.moveStyle()}
      >
        <h1>{this.player()}</h1>
      </div>
    )
  }
}