import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../Auth/AuthConstants";

export default function PortalLayout({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSignOut(e) {
    e.preventDefault();

    console.log("Sending token:", auth.getRefreshToken());

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">
          {auth.getUser()?.username ?? "User"}
        </h2>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/me">Profile</Link>
          </li>
          {auth.user?.rol === "admin" && (
            <li>
              <Link to="/admin">Panel Admin</Link>
            </li>
          )}
          <li>
            <a href="#" onClick={handleSignOut}>
              Sign out
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
