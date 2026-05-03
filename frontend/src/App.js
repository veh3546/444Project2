import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Layout from "./components/Layout";
import Home from "./Home";
import Loans from "./Loans";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const handleLogin = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  const userID = useMemo(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
          return null;
        }
        return decoded.userID;
      } catch (err) {
        console.error("Invalid token", err);
        handleLogout();
        return null;
      }
    }
    return null;
  }, [token]);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token || !userID) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<Layout onLogout={handleLogout} />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home userID={userID} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans userID={userID} />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
