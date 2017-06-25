defmodule TicTacToe.Web.LobbyChannel do
  use Phoenix.Channel

  def join("lobby_channel:connect", _params, socket) do 
    {:ok, socket}
  end
end
