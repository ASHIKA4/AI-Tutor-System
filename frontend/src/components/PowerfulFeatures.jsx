import React from "react";
import "../styles/PowerfulFeatures.css";
import { FaRegCommentDots } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { PiSparkle } from "react-icons/pi";

const PowerfulFeatures = () => {
  return (
    <div className="features-section py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-3 section-title" data-aos="fade-up">Powerful Features</h2>
        <p className="mb-5 text-secondary fs-5" data-aos="fade-up" data-aos-delay="100">
          Our AI-powered platform offers everything you need to succeed in your studies.
        </p>
        <div className="row g-4 justify-content-center">
          {/* Feature 1 */}
          <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="150">
            <div className="feature-card p-4 shadow-sm rounded-4 h-100 text-start">
              <div className="d-flex align-items-center gap-2 mb-3">
                <PiSparkle size={28} />
                <h5 className="fw-bold mb-0">AI-powered Quizzes</h5>
              </div>

              <p className="text-secondary">
                Adaptive quizzes that adjust to your knowledge level and learning pace.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="250">
            <div className="feature-card p-4 shadow-sm rounded-4 h-100 text-start">
              <div className="d-flex align-items-center gap-2 mb-3">
                <LuBrainCircuit size={28} />
                <h5 className="fw-bold mb-0">Personalized Learning</h5>
              </div>

              <p className="text-secondary">
                Content and exercises tailored to your specific needs and learning style.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="350">
            <div className="feature-card p-4 shadow-sm rounded-4 h-100 text-start">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaChartLine size={28} />
                <h5 className="fw-bold mb-0">Track Your Progress</h5>
              </div>

              <p className="text-secondary">
                Detailed analytics and insights to monitor your improvement over time.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="450">
            <div className="feature-card p-4 shadow-sm rounded-4 h-100 text-start">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaRegCommentDots size={28} />
                <h5 className="fw-bold mb-0">Chat with AI Tutor</h5>
              </div>

              <p className="text-secondary">
                Get instant help and explanations from your AI study companion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerfulFeatures;
