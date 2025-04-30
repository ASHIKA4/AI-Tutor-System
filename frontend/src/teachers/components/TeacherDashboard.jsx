import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { BookOpen, Users, FileText, GraduationCap, Bell, PlusCircle, MessageSquare, Calendar, Clock, CheckCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../../teachers/styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const courseStats = {
    totalCourses: 5,
    totalEnrollments: 128,
    assignmentsGiven: 24,
    averagePerformance: 82,
  };

  const upcomingTasks = [
    { id: 1, title: "Grade Machine Learning Assignments", dueDate: "Today", priority: "High" },
    { id: 2, title: "Prepare Quiz for Data Structures", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, title: "Review Python Course Content", dueDate: "Apr 25, 2025", priority: "Low" },
  ];

  const recentActivities = [
    { id: 1, activity: "New enrollment in Machine Learning course", time: "2 hours ago", type: "enrollment" },
    { id: 2, activity: "Assignment submitted by Alex Johnson", time: "Yesterday", type: "submission" },
    { id: 3, activity: "Quiz completed by 15 students", time: "2 days ago", type: "quiz" },
  ];

  return (
    <Container fluid className="p-4 teacher-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-up">
        <div>
          <h2 className="fw-bold">Welcome back, Dr. Chen!</h2>
          <p className="text-muted">Here's what's happening with your courses today.</p>
        </div>
        <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: "48px", height: "48px" }}>
          DR
        </div>
      </div>

      <Row className="g-4 mb-4">
        <Col md={3} data-aos="zoom-in">
          <Card className="h-100 stat-card border-primary">
            <Card.Body>
              <Card.Title className="fs-6">Total Courses</Card.Title>
              <div className="d-flex align-items-center gap-2">
                <BookOpen color="#10b981" />
                <span className="fs-4 fw-bold">{courseStats.totalCourses}</span>
              </div>
              <small className="text-muted">3 active, 2 draft</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} data-aos="zoom-in">
          <Card className="h-100 stat-card border-primary">
            <Card.Body>
              <Card.Title className="fs-6">Total Enrollments</Card.Title>
              <div className="d-flex align-items-center gap-2">
                <Users color="#10b981" />
                <span className="fs-4 fw-bold">{courseStats.totalEnrollments}</span>
              </div>
              <small className="text-muted">+12 this week</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} data-aos="zoom-in">
          <Card className="h-100 stat-card border-primary">
            <Card.Body>
              <Card.Title className="fs-6">Assignments Given</Card.Title>
              <div className="d-flex align-items-center gap-2">
                <FileText color="#10b981" />
                <span className="fs-4 fw-bold">{courseStats.assignmentsGiven}</span>
              </div>
              <small className="text-muted">18 graded, 6 pending</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} data-aos="zoom-in">
          <Card className="h-100 stat-card border-primary">
            <Card.Body>
              <Card.Title className="fs-6">Avg. Performance</Card.Title>
              <div className="d-flex align-items-center gap-2">
                <GraduationCap color="#10b981" />
                <span className="fs-4 fw-bold">{courseStats.averagePerformance}%</span>
              </div>
              <small className="text-muted">+5% from last month</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6} data-aos="fade-right">
          <Card className="h-100">
            <Card.Header><strong>Upcoming Tasks</strong></Card.Header>
            <Card.Body className="task-list">
              {upcomingTasks.map(task => (
                <div key={task.id} className="d-flex border rounded p-2 mb-2 align-items-start">
                  <div className="me-3 mt-1">
                    {task.priority === "High" ? <Clock color="red" /> :
                      task.priority === "Medium" ? <Calendar color="orange" /> : <CheckCircle color="green" />}
                  </div>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between">
                      <p className="fw-medium mb-1">{task.title}</p>
                      <Badge bg={
                        task.priority === "High" ? "danger" :
                          task.priority === "Medium" ? "warning" : "secondary"
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                    <small className="text-muted">Due: {task.dueDate}</small>
                  </div>
                </div>
              ))}
              <Button variant="outline-primary" className="w-100 mt-3">
                <PlusCircle size={16} className="me-2" /> Add New Task
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} data-aos="fade-left">
          <Card className="h-100">
            <Card.Header><strong>Recent Activity</strong></Card.Header>
            <Card.Body className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="d-flex border rounded p-2 mb-2">
                  <div className="rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: "36px", height: "36px", backgroundColor: "#e9f5ff" }}>
                    {activity.type === "enrollment" ? <Users size={18} /> :
                      activity.type === "submission" ? <FileText size={18} /> : <GraduationCap size={18} />}
                  </div>
                  <div>
                    <p className="mb-0">{activity.activity}</p>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
              <Button variant="outline-secondary" className="w-100 mt-3">
                <Bell size={16} className="me-2" /> View All Notifications
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card data-aos="fade-up">
        <Card.Header><strong>Quick Actions</strong></Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col sm={6} md={3}>
              <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center p-3">
                <BookOpen className="mb-2" /> Create Course
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center p-3">
                <FileText className="mb-2" /> New Assignment
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center p-3">
                <GraduationCap className="mb-2" /> Create Quiz
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center p-3">
                <MessageSquare className="mb-2" /> Send Message
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TeacherDashboard;
