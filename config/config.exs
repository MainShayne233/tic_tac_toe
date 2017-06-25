use Mix.Config

config :tic_tac_toe,
  ecto_repos: [TicTacToe.Repo]

config :tic_tac_toe, TicTacToe.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ndCyM9pF6weCp0Q1KJ+UEN7q3T+zs5zrKIlDJSB5lC3ZQCD7W+My6S2wigcf0hb5",
  render_errors: [view: TicTacToe.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TicTacToe.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

import_config "#{Mix.env}.exs"
