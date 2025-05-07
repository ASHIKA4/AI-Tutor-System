import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login_teacher = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password
      });

      const datas = response.data;

      if (datas.role === "teacher") {
        localStorage.setItem("teacherEmail", datas.email);
        localStorage.setItem("teachername", datas.username);
        localStorage.setItem("teacheruserId", datas.id);

        navigate("/teacher/dashboard", {
          state: {
            name: datas.username,
            email: datas.email,
            id: datas.id
          }
        });
      } else {
        alert("Please enter valid caterer credentials");
      }

    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center login-bg" style={{ backgroundColor: "#e0f2ff" }}>
      <div className="row w-100" style={{ maxWidth: '400px' }}>
        <div className="col-12 bg-white p-4 shadow-lg rounded-4">
          <h3 className="text-center" style={{ color: "#0063a0" }}>Teacher Login</h3>
          <p className="text-center text-muted mb-4">Access your dashboard</p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "#0063a0" }}>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: "#0063a0" }}>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="●●●●●●●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-end mt-1">
                <a href="#" className="small" style={{ color: "#0063a0" }}>Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: "#0063a0", color: "#fff" }}>
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-muted small">
            Don't have an account? <span role="button" style={{ color: "#0063a0", cursor: "pointer" }} onClick={() => navigate('/teacher-register')}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login_teacher;
