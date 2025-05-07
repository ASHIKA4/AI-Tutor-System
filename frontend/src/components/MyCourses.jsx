import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/MyCourses.css';

const completedCourses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    instructor: 'Prof. Lisa Wang',
    category: 'Programming',
    completedDate: 'March 15, 2025',
  },
];

const courseData = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    instructor: 'Dr. Sarah Johnson',
    category: 'Data Science',
    date: '2 days ago',
    progress: 65,
    next: 'Supervised Learning Algorithms',
  },
  {
    id: 2,
    title: 'Advanced Python Programming',
    instructor: 'Prof. Michael Chen',
    category: 'Programming',
    date: 'Yesterday',
    progress: 30,
    next: 'Decorators and Closures',
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    instructor: 'Dr. James Wilson',
    category: 'Computer Science',
    date: '4 days ago',
    progress: 80,
    next: 'Graph Algorithms',
  },
];

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('inProgress');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container fluid className="p-4 my-courses-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">My Courses</h3>
        <Button variant="dark" className="px-4" onClick={() => navigate('/student/course-catalog')}>
          Browse Courses
        </Button>
      </div>

      {/* Tabs */}
      <div className="tab-buttons mb-4">
        <Button
          variant={activeTab === 'inProgress' ? 'primary' : 'light'}
          onClick={() => handleTabChange('inProgress')}
          className="me-2"
        >
          In Progress
        </Button>
        <Button
          variant={activeTab === 'completed' ? 'primary' : 'light'}
          onClick={() => handleTabChange('completed')}
        >
          Completed
        </Button>
      </div>

      {/* In Progress Tab */}
      {activeTab === 'inProgress' ? (
        <Row>
          {courseData.map((course) => (
            <Col key={course.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="course-card h-100 shadow-sm">
                <div className="card-image-placeholder"></div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="light" text="dark" className="fw-semibold">
                      {course.category}
                    </Badge>
                    <small className="text-muted">{course.date}</small>
                  </div>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Instructor: {course.instructor}
                  </Card.Subtitle>
                  <div className="mt-3 mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <ProgressBar now={course.progress} className="custom-progress" />
                  </div>
                  <p className="mb-2">
                    <strong>Next:</strong> {course.next}
                  </p>
                  <Button variant="dark" className="w-100" onClick={() =>
              navigate(`/student/student/course/${course.id}/lesson/1`, { state: { course } })}>
                    Continue Learning
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        // Completed Tab
        <div className="d-flex flex-wrap gap-3">
          {completedCourses.map((course) => (
            <Card key={course.id} style={{ width: '300px' }} className="shadow-sm">
              <div className="bg-light" style={{ height: '180px' }}></div>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg="light" text="dark">
                    {course.category}
                  </Badge>
                  <Badge bg="light" text="dark">
                    Completed
                  </Badge>
                </div>
                <Card.Title className="fw-bold">{course.title}</Card.Title>
                <Card.Text className="text-muted">Instructor: {course.instructor}</Card.Text>
                <Card.Text>
                  <strong>Completed on:</strong> {course.completedDate}
                </Card.Text>
                <Button variant="outline-dark" className="w-100">
                  Review Course
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyCourses;
