import React from "react";
import { Button } from "react-bootstrap";
import logo from "/images/intellilearn-logo.png";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-0 px-5"
      style={{ height: "80px" }}
    >
      <div className="container-fluid customNav">
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img
            src={logo}
            alt="IntelliLearn Logo"
            style={{ width: "120px", height: "50px", marginRight: "10px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">  
          <ul className="navbar-nav nav-center mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#about">
                About
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <button
              className="btn btn-link text-dark text-decoration-none fw-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-dark fw-medium rounded-3 px-4"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
