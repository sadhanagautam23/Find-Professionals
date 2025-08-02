import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header" onClick={() => navigate("/")}>
        ProFind
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-item" onClick={() => navigate("/dashboard")}>
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/home")}>
          <FaSearch />
          <span>Search</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/profile")}>
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
