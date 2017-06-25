defmodule TicTacToe.Player do

  @up "up"
  @down "down"
  @left "left"
  @right "right"

  def apply_move(player = %{x_pos: x_pos, y_pos: y_pos}, move) do
    case move do
      %{"direction" => @up} -> 
        player
        |> Map.put(:y_pos, Enum.max([y_pos - 1, 0]))
      %{"direction" => @down} ->
        player
        |> Map.put(:y_pos, y_pos + 1)
      %{"direction" => @right} ->
        player
        |> Map.put(:x_pos, x_pos + 1)
      %{"direction" => @left} ->
        player
        |> Map.put(:x_pos, Enum.max([x_pos - 1, 0]))
    end
  end
end
