// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import "../App.css";

const Layout = ({ onLogout }) => {
  return (
    <div className="app-container">
      <Header onLogout={onLogout} />
      <main>
        <Outlet /> {/* This is where the page content will render */}
      </main>
    </div>
  );
};

export default Layout;
