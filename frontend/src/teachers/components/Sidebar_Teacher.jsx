import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  User,
  Users,
  FileText,
  Settings,

} from "lucide-react"
import logo from '/images/intellilearn-logo.png';
import "../styles/Sidebar.css";

const Sidebar_Teacher = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="d-flex flex-column">
      {/* Toggle button visible only on mobile */}
      <button
        className="btn d-md-none btn-outline-primary m-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span> {/* Correct here */}
      </button>


      <div
        id="sidebarMenu"
        className="collapse d-md-block sidebar bg-white border-end p-3 position-sticky top-0"
        style={{ width: '250px', height: '100vh', overflowY: 'auto', flexShrink: 0 }}
      >
        <div className="mb-4 d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" height="40" />
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/teacher/dashboard" className={`nav-link ${isActive('/teacher') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <LayoutDashboard size={18} className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teacher/coursepage" className={`nav-link ${isActive('/teacher/coursepage') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <BookOpen size={18} className="me-2" /> Courses
            </Link>

          </li>
          <li className="nav-item">
            <Link to="/teacher/students" className={`nav-link ${isActive('/teacher/students') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <Users size={18} className="me-2" /> Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teacher/assignments" className={`nav-link ${isActive('/teacher/assignments') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <FileText size={18} className="me-2" /> Assignments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teacher/quizzes" className={`nav-link ${isActive('/teacher/quizzes') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <GraduationCap size={18} className="me-2" /> Quizzes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teacher/analytics" className={`nav-link ${isActive('/teacher/analytics') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <LineChart size={18} className="me-2" /> Analytics
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/teacher/messages" className={`nav-link ${isActive('/teacher/messages') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <MessageSquare size={18} className="me-2" /> Messages
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/teacher/profile" className={`nav-link ${isActive('/teacher/profile') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <User size={18} className="me-2" /> Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/teacher/settings" className={`nav-link ${isActive('/teacher/settings') ? 'text-primary fw-semibold' : 'text-muted'}`}>
              <Settings size={18} className="me-2" /> Settings
            </Link>
          </li>
        </ul>
        <div className="profile pt-2">
          <p className="fw-bold mb-0">Dr. Rebecca Chen</p>
          <small className="text-muted">Teacher</small>
        </div>

      </div>
    </div>
  );
};

export default Sidebar_Teacher;
