import '../css/app.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Game from './ui/tic_tac_toe/Game'
import { Socket } from 'phoenix'

// get the node to render the app into
const root = document.getElementById('root')

// establish a new phoenix socket and channel
const socket = new Socket('/socket', {})
socket.connect()
const channel = socket.channel("lobby_channel:connect")

// define the render function to call when all is ready
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Game 
        channel={channel}
      />
    </AppContainer>,
    root
  )
}

// join the lobby channel, then render the app
channel.join().receive("ok", (response) => {
  console.log(response)
  render()

  // handles hot code reloading
  if (module.hot) module.hot.accept('./ui/tic_tac_toe/Game', render)
})

