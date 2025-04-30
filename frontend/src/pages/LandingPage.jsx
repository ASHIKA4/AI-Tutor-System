// LandingPage.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PowerfulFeatures from "../components/PowerfulFeatures";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
  <section id="home"><HeroSection /></section>
  <section id="features"><PowerfulFeatures /></section>
  <section id="about"><HowItWorks /></section>
  <Footer />
    </div>
  );
};

export default LandingPage;
