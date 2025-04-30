
import React, { useEffect } from 'react';
import { Card, ProgressBar, Row, Col, Badge, Container } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Progress.css';

const Progress = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const chartData = [
    { name: 'ML Basics', score: 85 },
    { name: 'Python Fundamentals', score: 92 },
    { name: 'Statistics', score: 78 },
    { name: 'Data Prep', score: 88 },
    { name: 'Neural Nets', score: 95 },
  ];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4" data-aos="fade-up">
        <Col md={6}>
          <Card className="custom-card">
            <Card.Header className="text-primary fw-bold">Lessons Completed</Card.Header>
            <Card.Body>
              <h4>8 / 12</h4>
              <ProgressBar now={66.7} label="66.7%" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card">
            <Card.Header className="text-primary fw-bold">Lesson Progress</Card.Header>
            <Card.Body style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#0063a0" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row data-aos="fade-up">
        <Col md={12}>
          <Card className="custom-card">
            <Card.Header className="text-primary fw-bold">Course Badges</Card.Header>
            <Card.Body>
              <Badge bg="success" className="me-2 mb-2">Python Pro</Badge>
              <Badge bg="info" className="me-2 mb-2">ML Explorer</Badge>
              <Badge bg="warning" className="me-2 mb-2">Data Visualizer</Badge>
              <Badge bg="danger" className="me-2 mb-2">Code Warrior</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Progress;
