use Mix.Config

config :new_app, NewApp.Web.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
   watchers: [
     node: [
       "./node_modules/.bin/webpack-dev-server", "--watch-stdin", "--colors",
       cd: Path.expand("../assets", __DIR__),
     ]
   ]

config :new_app, NewApp.Web.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/gettext/.*(po)$},
      ~r{lib/new_app/web/views/.*(ex)$},
      ~r{lib/new_app/web/templates/.*(eex)$}
    ]
  ]

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20



  
