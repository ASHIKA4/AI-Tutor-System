import React, { useEffect } from 'react';
import '../styles/HowItWorks.css';
import { FaUserPlus, FaBookOpen, FaChalkboardTeacher, FaLightbulb } from 'react-icons/fa';
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="how-it-works-timeline">
      <h2 className="timeline-title">How It Works</h2>
      <p className="timeline-subtitle">
        Getting started is easy. Follow these simple steps to begin your learning journey.
      </p>

      <div className="timeline-steps">
        {/* Step 1 - Left */}
        <div className="timeline-step left" data-aos="fade-left">
          <div className="step-marker">
            <FaUserPlus className="step-icon" />
          </div>
          <div className="step-content">
            <h3 className="step-title">Sign up</h3>
            <p className="step-description">
              Create your account in seconds and set your learning preferences.
            </p>
          </div>
        </div>

        {/* Step 2 - Right */}
        <div className="timeline-step right" data-aos="fade-right">
          <div className="step-marker">
            <FaBookOpen className="step-icon" />
          </div>
          <div className="step-content">
            <h3 className="step-title">Pick your subject</h3>
            <p className="step-description">
              Choose from a wide range of subjects and topics to study.
            </p>
          </div>
        </div>

        {/* Step 3 - Left */}
        <div className="timeline-step left" data-aos="fade-left">
          <div className="step-marker">
            <FaChalkboardTeacher className="step-icon" />
          </div>
          <div className="step-content">
            <h3 className="step-title">Start learning</h3>
            <p className="step-description">
              Take quizzes, review materials, and chat with your AI tutor.
            </p>
          </div>
        </div>

        {/* Step 4 - Right */}
        <div className="timeline-step right" data-aos="fade-right">
          <div className="step-marker">
            <FaLightbulb className="step-icon" />
          </div>
          <div className="step-content">
            <h3 className="step-title">Get suggestions</h3>
            <p className="step-description">
              Receive personalized recommendations to improve your knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
