import '../css/app.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './ui/App'
import { Socket } from 'phoenix'

// get the node to render the app into
const root = document.getElementById('root')

// establish a new phoenix socket and channel
const socket = new Socket('/socket', {})
socket.connect()
const channel = socket.channel("lobby_channel:connect")

// join the lobby channel, then render the app
channel.join().receive("ok", (response) => {

  // define the render function to call when all is ready
  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <App 
          channel={channel}
          initialState={response}
        />
      </AppContainer>,
      root
    )
  }

  render()

  // handles hot code reloading
  if (module.hot) module.hot.accept('./ui/App', render)
})

