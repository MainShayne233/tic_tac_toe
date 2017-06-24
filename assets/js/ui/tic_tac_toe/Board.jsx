import React, { Component} from 'react'

export default class TicTacToeBoard extends Component {

  verticalColumnStyle(index) {
    return {
      position: 'fixed',
      marginLeft: index === 0 ? '400px' : '600px',
      marginTop: '50px ',
      height: 600,
      width: 20,
      backgroundColor: 'black',
    }
  }

  horizontalColumnStyle(index) {
    return {
      position: 'fixed',
      marginTop: index === 0 ? '250px' : '450px',
      marginLeft: '210px ',
      height: 20,
      width: 600,
      backgroundColor: 'black',
    }
  }

  render() {
    return (
      <div>
        <div style={this.verticalColumnStyle(0)}></div>
        <div style={this.verticalColumnStyle(1)}></div>
        <div style={this.horizontalColumnStyle(0)}></div>
        <div style={this.horizontalColumnStyle(1)}></div>
      </div>
    )
  }
}