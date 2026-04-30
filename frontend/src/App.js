import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  const handleLogin = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
);
}
export default App;