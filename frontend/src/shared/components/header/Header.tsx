import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // detect current path

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleProfile = () => {
    const currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      navigate(`/profile/${currentUser._id}`);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header" onClick={() => navigate("/")}>
        ProFind
      </div>

      <div className="sidebar-menu">
        <div
          className={`sidebar-item ${location.pathname === "/dashboard" ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname === "/home" ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <FaSearch />
          <span>Search</span>
        </div>

        <div
          className={`sidebar-item ${location.pathname.startsWith("/profile") ? "active" : ""}`}
          onClick={handleProfile}
        >
          <FaUser />
          <span>Profile</span>
        </div>

        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
