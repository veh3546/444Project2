import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Fix 1: Import added
import axios from "./api/axios";

const LOGIN_URL = "/login";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user: credentials.username, pwd: credentials.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = response?.data?.token; 
      onLogin(token); 
      navigate("/dashboard"); 

    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 401) {
        setError('Unauthorized: Invalid username or password');
      } else {
        setError('Login Failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Login;
