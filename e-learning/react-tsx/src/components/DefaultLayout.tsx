import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({})
      setToken(null)
    })
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">DashBoard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          Header
          <div>{user.name}</div>
          <a href="#" onClick={onLogout} className="btn-logout">
            Logout
          </a>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
