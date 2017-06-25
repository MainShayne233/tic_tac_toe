import React, { Component } from 'react'
import TicTacToeMove from './Move'

const leftShift = 200

const startingState = {
  moves: [],
  winner: undefined,
  currentPlayer: 'X',
}

function rangeIndex(value, ranges) {
  for (const rangeIndex in ranges) {
    const [min, max] = ranges[rangeIndex]
    if (value >= min && value <= max) return parseInt(rangeIndex)
  }
}

function uniq(array) {
  return array.filter((elem, index) => array.indexOf(elem) === index )
}

function allDefined(array) {
  return array.filter(elem => elem === undefined).length === 0
}

function range(start, end) {
  let range = []
  while (start <= end) {
    range.push(start)
    start += 1
  }
  return range
}

export default class TicTacToeBoard extends Component {

  // LIFECYCLE

  componentWillMount() {
    this.setGame()
  }

  // ACCESSESORS

  moves() { return this.state.moves }
  currentPlayer() { return this.state.currentPlayer }
  winner() { return this.state.winner }
  board() { return this.refs.board }
  verticalColumns() { return this.columns('vertical') }
  horizontalColumns() { return this.columns('horizontal') }

  columns(orientation) {
    return Object.keys(this.refs).filter(ref => {
      return ref.indexOf(orientation) === 0
    }).map(ref => this.refs[ref])
  }

  currentBoard() {
    let board = [undefined, undefined, undefined].map(row => [undefined, undefined, undefined])
    for ( const {row, column, player} of this.moves()) {
      board[row][column] = player
    }
    return board
  }

  verticalRanges() {
    const [firstVerticalColumn, secondVerticalColumn] = this.verticalColumns()
    const { offsetWidth } = firstVerticalColumn
    return [
      [
        firstVerticalColumn.offsetLeft - leftShift,
        firstVerticalColumn.offsetLeft,
      ],
      [
        firstVerticalColumn.offsetLeft + offsetWidth,
        secondVerticalColumn.offsetLeft,
      ],
      [
        secondVerticalColumn.offsetLeft + offsetWidth,
        secondVerticalColumn.offsetLeft + leftShift,
      ],
    ]
  }

  horizontalRanges() {
    const [firstHorizontalColumn, secondHorizontalColumn] = this.horizontalColumns()
    const { offsetHeight } = firstHorizontalColumn
    return [
      [
        firstHorizontalColumn.offsetTop - leftShift,
        firstHorizontalColumn.offsetTop,
      ],
      [
        firstHorizontalColumn.offsetTop + offsetHeight,
        secondHorizontalColumn.offsetTop,
      ],
      [
        secondHorizontalColumn.offsetTop + offsetHeight,
        secondHorizontalColumn.offsetTop + leftShift,
      ],
    ]
  }

  // HANDLERS

  handleBoardClick(clickEvent) {
    if (this.winner() !== undefined) return
    const row = this.rowForClick(clickEvent)
    const column = this.columnForClick(clickEvent)
    if (this.cellIsValid(row, column) && this.cellIsFree(row, column)) {
      this.addMove({
        player: this.currentPlayer(),
        row: row,
        column: column,
      })
    }
  }

  // UTILS

  addMove(move) {
    this.setState({
      moves: this.moves().concat([move]),
      currentPlayer: this.currentPlayer() === 'X' ? 'O' : 'X'
    }, this.checkForWinner.bind(this))
  }

  checkForWinner() {
    const currentBoard = this.currentBoard()
    const winner = this.checkForRowWinner(currentBoard)
    if (winner === undefined) return
    this.setState({
      winner: winner,
    }, () => {
      setTimeout( this.setGame.bind(this), 2000 )
    })
  }

  setGame() {
    this.setState(startingState)
  }

  checkForRowWinner(currentBoard) {
    for (const row of currentBoard)  {
      const uniqPlayers = uniq(row)
      if (allDefined(row) && uniqPlayers.length === 1) return uniqPlayers[0]
    }
    return this.checkForColumnWinner(currentBoard)
  }

  checkForColumnWinner(currentBoard) {
    for (const columnIndex of range(0,2)) {
      const cells = currentBoard.map(row => row[columnIndex])
      const uniqPlayers = uniq(cells)
      if (allDefined(cells) && uniqPlayers.length === 1) return uniqPlayers[0]
    }
    return this.checkForDiagonalWinner(currentBoard)
  }

  checkForDiagonalWinner(currentBoard) {
    const diagonalWinArrangements = [
      [ [0, 0], [1, 1],  [2, 2] ],
      [ [2, 0], [1, 1],  [0, 2] ],
    ]
    for (const arrangement of diagonalWinArrangements) {
      const cells = arrangement.map(cell => currentBoard[ cell[0] ][ cell[1] ])
      const uniqPlayers = uniq(cells)
      if (allDefined(cells) && uniqPlayers.length === 1) return uniqPlayers[0]
    }
  }

  rowForClick(clickEvent) {
    const { clientY } = clickEvent
    return rangeIndex(clientY, this.horizontalRanges())
  }

  columnForClick(clickEvent) {
    const { clientX } = clickEvent
    return rangeIndex(clientX, this.verticalRanges())
  }

  cellIsValid(row, column) {
    return row !== undefined && column !== undefined
  }

  cellIsFree(row, column) {
    return this.moves().find(move => {
      return row === move.row && column === move.column
    }) === undefined
  }

  // STYLES

  verticalColumnStyle(index) {
    return {
      position: 'fixed',
      marginLeft: index === 0 ? leftShift : leftShift + 200,
      height: 600,
      width: 20,
      backgroundColor: 'black',
    }
  }

  horizontalColumnStyle(index) {
    return {
      position: 'fixed',
      marginTop: index === 0 ? leftShift : leftShift + 200,
      height: 20,
      width: 600,
      backgroundColor: 'black',
    }
  }

  boardStyle() {
    return {
      marginTop: 50,
      marginLeft: leftShift,
      backgroundColor: '#cccbcd',
      height: 600,
      width: 600,
    }
  }

  winningMessageStyle() {
    return {
      color: 'blue',
      fontSize: 70,
      textAlign: 'center',
      position: 'absolute',
      zIndex: 1,
      marginTop: 250,
      textShadow: '2px 2px #FFFFFF',
    }
  }

  // RENDERERS

  renderMoves() {
    return this.moves().map((move, index) => {
      return (
        <TicTacToeMove
          key={index}
          move={move}
          boardVerticalRanges={this.verticalRanges.bind(this)}
          boardHorizontalRanges={this.horizontalRanges.bind(this)}
        />
      )
    })
  }

  renderWinningMessage() {
    if (this.winner() === undefined) return null
    return (
      <h1
        style={this.winningMessageStyle()}
      >
        {`${this.winner()} Won The Game!`}
      </h1>
    )
  }

  render() {
    return (
      <div
        ref="board"
        style={this.boardStyle()}
        onClick={this.handleBoardClick.bind(this)}
      >
        {this.renderWinningMessage()}
        <div ref="verticalColumn0" style={this.verticalColumnStyle(0)}></div>
        <div ref="verticalColumn1" style={this.verticalColumnStyle(1)}></div>
        <div ref="horizontalColumn0" style={this.horizontalColumnStyle(0)}></div>
        <div ref="horizontalColumn1" style={this.horizontalColumnStyle(1)}></div>
        {this.renderMoves()}
      </div>
    )
  }
}
