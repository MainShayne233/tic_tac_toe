defmodule TicTacToe.Web.UserSocket do
  use Phoenix.Socket

  channel "lobby_channel:*", TicTacToe.Web.LobbyChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
