// src/components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src="images/logo.png" alt="Library Logo" className="logo" />
        <p>FrontRow Library System</p>
      </div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/loans">My Loans</Link>
        <button onClick={handleLogout} className="logout-btn">Log Out</button>
      </nav>
    </header>
  );
};

export default Header;
