import React from 'react';
import "../styles/Footer.css";
import logo from '/images/intellilearn-logo.png';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-3">
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                alt="IntelliLearn Logo"
                style={{ width: "100px", height: "40px", marginRight: "10px" }}
              />
            </div>
            <p className="text-muted smaller">
              Revolutionizing education with <br></br>AI-powered personalized learning <br></br> experiences.
            </p>
            <div className="social-icons">
              <FaFacebookF className="me-3 " />
              <FaTwitter className="me-3" />
              <FaInstagram className="me-3" />
              <FaLinkedinIn />
            </div>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled text-muted">
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#cookie">Cookie Policy</a></li>
              <li><a href="#data-protection">Data Protection</a></li>
            </ul>
          </div>
          <div className="col-md-3 contact-us">
  <h6 className="fw-bold mb-3">Contact Us</h6>
  <ul className="list-unstyled text-muted">
    <li className="d-flex align-items-start mb-2">
      <FaMapMarkerAlt className="me-2 mt-1" />
      <span>123 Education Street, Learning City, 10001</span>
    </li>
    <li className="d-flex align-items-start mb-2">
      <FaPhoneAlt className="me-2 mt-1" />
      <span>+1 (555) 123-4567</span>
    </li>
    <li className="d-flex align-items-start">
      <FaEnvelope className="me-2 mt-1" />
      <span>contact@aitutor.com</span>
    </li>
  </ul>
</div>

        </div>

        <div className="text-center pt-4 border-top mt-4">
          <small className="text-muted">© 2025 AI Tutor. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
