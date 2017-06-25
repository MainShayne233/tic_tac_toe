defmodule TicTacToe.Web.PageControllerTest do
  use TicTacToe.Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello TicTacToe!"
  end
end
