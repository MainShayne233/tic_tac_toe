defmodule TicTacToe.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(TicTacToe.Web.Endpoint, []),
      supervisor(Store.Map, [:lobby_store])
    ]

    opts = [strategy: :one_for_one, name: TicTacToe.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
