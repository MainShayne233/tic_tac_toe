use Mix.Config

config :new_app,
  ecto_repos: [NewApp.Repo]

config :new_app, NewApp.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ndCyM9pF6weCp0Q1KJ+UEN7q3T+zs5zrKIlDJSB5lC3ZQCD7W+My6S2wigcf0hb5",
  render_errors: [view: NewApp.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: NewApp.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

import_config "#{Mix.env}.exs"
