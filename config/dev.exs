use Mix.Config

config :tic_tac_toe, TicTacToe.Web.Endpoint,
  http: [port: 3000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
   watchers: [
     node: [
       "./node_modules/.bin/webpack-dev-server", "--watch-stdin", "--colors",
       cd: Path.expand("../assets", __DIR__),
     ]
   ]

config :tic_tac_toe, TicTacToe.Web.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/gettext/.*(po)$},
      ~r{lib/tic_tac_toe/web/views/.*(ex)$},
      ~r{lib/tic_tac_toe/web/templates/.*(eex)$}
    ]
  ]

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20



  
