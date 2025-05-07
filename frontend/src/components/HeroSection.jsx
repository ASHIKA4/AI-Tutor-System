
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../styles/HeroSection.css";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col md={6} data-aos="fade-right">
            <img
              src="/images/ai-tutor-landing.jpg"
              alt="AI Tutor"
              className="img-fluid hero-image"
            />
          </Col>

          <Col md={6} className="text-center text-md-start" data-aos="fade-left">
            <h1 className="hero-title mb-3">
              Your <span className="highlight">Smart Study Buddy</span><br />
              Powered by AI
            </h1>
            <p className="text-secondary mb-4">
              Get custom quizzes, progress tracking & AI suggestions tailored to your <br />
              learning style and pace.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 flex-wrap">
              <Button className="Get">
                Get Started <span>&rarr;</span>
              </Button>
              <Button className="Login" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="Join" onClick={() => navigate('/register')}>
                Join as Student
              </Button>
              <Button className="JoinTeacher" onClick={() => navigate('/teacher-login')}>
                Join as Teacher
              </Button>
            </div>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
