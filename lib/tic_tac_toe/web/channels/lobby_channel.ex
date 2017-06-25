defmodule TicTacToe.Web.LobbyChannel do
  use Phoenix.Channel
  require Logger
  alias TicTacToe.Lobby

  def join("lobby_channel:connect", _params, socket) do 
    id = Lobby.create_user()
    Logger.info "Someone joined the lobby channel"
    Logger.info "Their id is now #{id}"
    {
      :ok, 
      %{game_state: Lobby.game_state()},
      socket
      |> assign(:user_id, id),
    }
  end

  def handle_in("lobby_channel:new_move", move, socket) do
    socket.assigns[:user_id]
    |> Lobby.apply_new_move(move)
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    Logger.info "Someone left the lobby channel"
    Logger.info "Their user id is #{socket.assigns[:user_id]}"
    socket.assigns[:user_id]
    |> Lobby.remove_user
    {:ok, socket}
  end
end
