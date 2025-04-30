import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Card, Tabs, Tab, Form,
} from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('last30days');
  const [courseFilter, setCourseFilter] = useState('all');

  const COLORS = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6', '#ec4899'];

  const courseEngagementData = [
    { course: "Machine Learning", views: 450, completions: 320, quizAttempts: 280 },
    { course: "Python Programming", views: 380, completions: 290, quizAttempts: 240 },
    { course: "Data Structures", views: 320, completions: 210, quizAttempts: 190 },
    { course: "Web Development", views: 280, completions: 180, quizAttempts: 150 },
    { course: "AI Fundamentals", views: 420, completions: 310, quizAttempts: 260 },
  ];

  const studentProgressData = [
    { month: "Jan", avgProgress: 65, activeStudents: 85 },
    { month: "Feb", avgProgress: 70, activeStudents: 90 },
    { month: "Mar", avgProgress: 68, activeStudents: 88 },
    { month: "Apr", avgProgress: 75, activeStudents: 92 },
    { month: "May", avgProgress: 82, activeStudents: 95 },
    { month: "Jun", avgProgress: 85, activeStudents: 98 },
  ];

  const quizPerformanceData = [
    { quiz: "ML Basics", avgScore: 85 },
    { quiz: "Python Fundamentals", avgScore: 92 },
    { quiz: "Data Structures", avgScore: 78 },
    { quiz: "Algorithms", avgScore: 88 },
    { quiz: "Neural Networks", avgScore: 72 },
  ];

  const completionRateData = [
    { name: "Completed", value: 68 },
    { name: "In Progress", value: 24 },
    { name: "Not Started", value: 8 },
  ];

  const studentActivityData = [
    { day: "Mon", hours: 120 },
    { day: "Tue", hours: 150 },
    { day: "Wed", hours: 180 },
    { day: "Thu", hours: 140 },
    { day: "Fri", hours: 160 },
    { day: "Sat", hours: 90 },
    { day: "Sun", hours: 70 },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col><h3 data-aos="fade-right">Performance Analytics</h3></Col>
        <Col className="text-end">
          <Button variant="outline-primary" data-aos="fade-left">
            <Download size={16} className="me-2" /> Export Report
          </Button>
        </Col>
      </Row>

      <Row className="mb-3" data-aos="fade-up">
        <Col md={3}>
          <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
            <option value="allTime">All Time</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="all">All Courses</option>
            <option value="ml">Introduction to Machine Learning</option>
            <option value="python">Advanced Python Programming</option>
            <option value="dsa">Data Structures & Algorithms</option>
          </Form.Select>
        </Col>
        <Col md={5} className="text-end">
          <Button variant="outline-secondary" className="me-2"><Calendar size={16} className="me-1" /> Custom Range</Button>
          <Button variant="outline-secondary"><Filter size={16} className="me-1" /> More Filters</Button>
        </Col>
      </Row>

      <Row className="g-4 mb-4" data-aos="fade-up">
        <Col md={3}>
          <Card body className="text-center shadow-sm">Total Students: <strong>128</strong></Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">Course Completion Rate: <strong>68%</strong></Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">Average Quiz Score: <strong>82%</strong></Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">Assignment Completion: <strong>75%</strong></Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="overview" id="analytics-tabs" className="mb-3">
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4">
            <Col md={6}>
              <Card data-aos="fade-up">
                <Card.Body>
                  <Card.Title>Student Progress Over Time</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" stroke="#10b981" />
                      <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="avgProgress" stroke="#10b981" />
                      <Line yAxisId="right" type="monotone" dataKey="activeStudents" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card data-aos="fade-up">
                <Card.Body>
                  <Card.Title>Course Completion Rate</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={completionRateData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {completionRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Card data-aos="fade-up">
                <Card.Body>
                  <Card.Title>Weekly Student Activity</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="courses" title="Courses">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Course Engagement</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#3b82f6" />
                  <Bar dataKey="completions" fill="#10b981" />
                  <Bar dataKey="quizAttempts" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="students" title="Students">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Student Performance</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgProgress" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="quizzes" title="Quizzes">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Quiz Performance</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Analytics;
