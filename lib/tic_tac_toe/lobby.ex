defmodule TicTacToe.Lobby do
  alias TicTacToe.Player
  require Logger

  @store_name :lobby_store

  @initial_user_state %{
    x_pos: 0,
    y_pos: 0,
  }

  @channel_topic "lobby_channel:connect"
  @new_game_state_subtopic "lobby_channel:new_game_state"

  def game_state do
    @store_name
    |> Store.Map.get(:game_state)
    |> Kernel.||(%{})
    |> Map.merge(%{
      user_count: Enum.count( user_ids() ),
      users: users(),
    })
  end

  def create_user do
    user_id = 
      spare_user_ids()
      |> case do
        [user_id | _rest] ->
          remove_from_spare_user_ids(user_id)
          create_user_id(user_id)
        [] ->
          create_new_user_id()
      end

    initialize_user(user_id)
    broadcast_game_state()
    user_id
  end

  def apply_new_move(user_id, move) do
    updated_user = 
      user_id
      |> get_user
      |> Player.apply_move(move)

    user_id
    |> set_user(updated_user)
    broadcast_game_state()
  end

  def users do
    user_ids()
    |> Enum.map(&get_user/1)
  end

  def get_user(id) do
    @store_name
    |> Store.Map.get("user_#{id}")
  end

  def set_user(id, user_params) do
    @store_name
    |> Store.Map.put("user_#{id}", user_params)
  end

  def initialize_user(id) do
    id
    |> set_user(@initial_user_state)
  end

  def remove_user(user_id) do
    user_ids()
    |> Enum.reject(&( &1 == user_id ))
    |> set_user_ids

    spare_user_ids()
    |> Enum.concat([user_id])
    |> set_spare_user_ids

    broadcast_game_state()
    user_id
  end

  def create_new_user_id do
    last_user_id()
    |> case do
      nil -> 1
      id ->
        id
        |> Kernel.+(1)
    end
    |> create_user_id
    |> set_last_user_id
  end

  def broadcast_game_state do
    TicTacToe.Web.Endpoint.broadcast(@channel_topic, @new_game_state_subtopic, %{game_state: game_state()})
  end

  def create_user_id(id) do
    user_ids()
    |> Enum.concat([id])
    |> set_user_ids
    id
  end

  def user_ids do
    @store_name
    |> Store.Map.get(:user_ids)
    |> Kernel.||([])
  end

  def spare_user_ids do
    @store_name
    |> Store.Map.get(:spare_user_ids)
    |> Kernel.||([])
  end

  def remove_from_spare_user_ids(id) do
    spare_user_ids()
    |> Enum.reject( &(&1 == id) )
    |> set_spare_user_ids
  end

  def last_user_id do
    @store_name
    |> Store.Map.get(:last_user_id)
  end

  def set_last_user_id(id) do
    Logger.info "last user id set to #{id}"
    @store_name
    |> Store.Map.put(:last_user_id, id)
    id
  end

  def set_user_ids(user_ids) do
    Logger.info "user ids being set to #{inspect user_ids}"

    @store_name
    |> Store.Map.put(:user_ids, user_ids)
    user_ids
  end

  def set_spare_user_ids(user_ids) do
    Logger.info "spare user ids being set to #{inspect user_ids}"
    @store_name
    |> Store.Map.put(:spare_user_ids, user_ids)
    user_ids
  end
end
