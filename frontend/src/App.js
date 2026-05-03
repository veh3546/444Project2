import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./Home";
import Loans from "./Loans";
function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const handleLogin = (newToken) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/loans" element={<Loans />} />
      </Route>
    </Routes>
  );
}
export default App;
