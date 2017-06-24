defmodule NewApp.Web.PageControllerTest do
  use NewApp.Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Hello NewApp!"
  end
end
