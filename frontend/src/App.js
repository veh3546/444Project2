import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import {jwtDecode} from "jwt-decode";
import Layout from "./components/Layout";
import Home from "./Home";
import Loans from "./Loans";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const handleLogin = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  const userID = useMemo(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userID;
      } catch (err) {
        console.error("Invalid token", err);
        return null;
      }
    }
    return null;
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home userID={userID} />} />
        <Route path="/loans" element={<Loans userID={userID} />} />
      </Route>
    </Routes>
  );
}

export default App;
