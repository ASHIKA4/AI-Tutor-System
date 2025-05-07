import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure you have your custom styles

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/login/", {
      email,
      password
    })
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.role === "student") {
          localStorage.setItem("studentname", data.username);
          localStorage.setItem("studentemail", data.email);
          localStorage.setItem("studentId", data.id);

          navigate("/student", { state: { id: data.id } });
        } else {
          alert("Please enter valid data");
        }
      })
      .catch((error) => {
        alert("Invalid credentials");
        console.log(error);
      });
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(to right, #0063a0, #003f6b)", fontFamily: "Arial, sans-serif" }}
    >
      <div className="row shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="/images/login.jpg"
            alt="Login"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Login Form Section */}
        <div
          className="col-md-6 p-5"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            color: "white"
          }}
        >
          <h2 className="text-center mb-2 text-white">Login</h2>
          <p className="text-center mb-4 text-light">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input
                type="email"
                className="form-control bg-transparent text-white border-light"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input
                type="password"
                className="form-control bg-transparent text-white border-light"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-end mb-3">
              <a href="/forgot-password" className="text-white text-decoration-underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-light w-100 fw-semibold">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-light">
            Don’t have an account?{" "}
            <a href="/register" className="text-white text-decoration-underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
