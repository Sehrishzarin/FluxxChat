import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="FluxxTalk Logo" className="navbar-logo" />
        <h1>FluxxTalk</h1>
      </div>
      <div className="navbar-right">
        <Link to="/feed">Feed</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
