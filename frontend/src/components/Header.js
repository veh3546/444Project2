// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="images/logo.png" alt="Library Logo" className="logo" />
        <p>FrontRow Library System</p>
      </div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/loans">My Loans</Link>
        <Link to="/logout">Log Out</Link>
      </nav>
    </header>
  );
};

export default Header;
