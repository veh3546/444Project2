import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Fix 1: Import added
import axios from "./api/axios";

const LOGIN_URL = "/login";
function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  // login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      // login successful, extract token and pass to App
      const token = response?.data?.token;
      onLogin(token);
      navigate("/home");
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 401) {
        setError("Unauthorized: Invalid username or password");
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="images/logo.png" alt="Library Logo" className="logo" />
          <p>FrontRow Library System</p>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <p>Log in to access your library account</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          className="login-input"
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default Login;
