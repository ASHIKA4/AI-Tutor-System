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
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed!");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center register-page">
  <div className="row w-100">
    {/* Left Side Image */}
    <div className="col-md-6 d-none d-md-flex align-items-center register-image-wrapper">
  <img src="/images/login.jpg" alt="Illustration" className="register-illustration" />
</div>


    {/* Right Side Registration Form */}
    <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="register-card w-100 px-4">
        <h2 className="text-center mb-2">Sign Up</h2>
        <p className="text-muted text-center mb-4">Create a new account to get started</p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="●●●●●●●" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="●●●●●●●" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Register;
