use Mix.Config

config :new_app, NewApp.Web.Endpoint,
  on_init: {NewApp.Web.Endpoint, :load_from_system_env, []},
  url: [host: "example.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

config :logger, level: :info

import_config "prod.secret.exs"
