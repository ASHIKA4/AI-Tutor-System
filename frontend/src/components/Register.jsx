import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        username,
        email,
        password,
        role: "student",
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed!");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center register-bg" style={{ backgroundColor: "#e0f2ff" }}>
      <div className="register-card shadow-lg rounded p-4" style={{ width: "100%", maxWidth: "500px", backgroundColor: "#ffffff", border: "1px solid #ddd" }}>
        <h2 className="text-center mb-3" style={{ color: "#0063a0" }}>Sign Up</h2>
        <p className="text-center text-muted mb-4">
          Create a new account to get started
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderColor: "#0063a0" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "#0063a0" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderColor: "#0063a0" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="●●●●●●●"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ borderColor: "#0063a0" }}
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#0063a0", color: "#fff" }}>
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" style={{ color: "#0063a0", textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
