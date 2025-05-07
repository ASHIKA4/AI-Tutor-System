import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Book, List, HelpCircle, BarChart2,
  User, TrendingUp, Menu, LogOut
} from 'react-feather';
import logo from '/images/intellilearn-logo.png';
import "../styles/Sidebar.css";

const Sidebar = () => {
  const name = localStorage.getItem("studentname");
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentname");
    localStorage.removeItem("studentemail");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column">
      {/* Toggle button for mobile */}
      <button
        className="btn d-md-none btn-outline-primary m-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <Menu />
      </button>

      <div
        id="sidebarMenu"
        className="collapse d-md-block sidebar bg-white border-end p-3 position-sticky top-0 d-flex flex-column justify-content-between"
        style={{ width: '250px', height: '100vh', overflowY: 'auto', flexShrink: 0 }}
      >
        <div>
          <div className="mb-4 d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" height="40" />
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/student" className={`nav-link ${isActive('/student') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <Home size={18} className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/course-catalog" className={`nav-link ${isActive('/student/course-catalog') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <Book size={18} className="me-2" /> Course Catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/my-courses" className={`nav-link ${isActive('/student/my-courses') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <List size={18} className="me-2" /> My Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/ask-ai" className={`nav-link ${isActive('/student/ask-ai') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <HelpCircle size={18} className="me-2" /> Ask AI
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/quizzes" className={`nav-link ${isActive('/student/quizzes') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <BarChart2 size={18} className="me-2" /> Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/progress" className={`nav-link ${isActive('/student/progress') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <TrendingUp size={18} className="me-2" /> Progress
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/profile" className={`nav-link ${isActive('/student/profile') ? 'text-primary fw-semibold' : 'text-muted'}`}>
                <User size={18} className="me-2" /> Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="pt-4">
          <p className="fw-bold mb-0">{name}</p>
          <small className="text-muted">Student</small>

          <button className="btn btn-outline-danger w-100 mt-3 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
