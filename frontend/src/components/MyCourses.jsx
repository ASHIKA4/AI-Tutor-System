import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyCourses.css';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('inProgress');
  const [courses, setCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId')


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await axios.get(
          `http://127.0.0.1:8000/enroll/?student=${studentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        
  
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format from API");
        }
  
        const transformedCourses = response.data.map(enrollment => {
          const teacher = enrollment.course?.teacher || enrollment.teacher || {};
          const teacherName = teacher.full_name || teacher.username || 'Unknown Instructor';
          const progress = enrollment.progress_percentage || 
                          (enrollment.completed_lessons / enrollment.total_lessons * 100) || 
                          0;
  
          return {
            id: enrollment.id,
            course_id: enrollment.course?.id,
            course_title: enrollment.course?.title || 'Untitled Course',
            course_category: enrollment.course?.category || 'General',
            instructor_name: teacherName,
            enrolled_date: enrollment.enrolled_date 
                          ? new Date(enrollment.enrolled_date).toLocaleDateString() 
                          : new Date().toLocaleDateString(),
            progress: Math.round(progress),
            next_lesson: enrollment.next_lesson || 1,
            description: enrollment.course?.description,
            status: enrollment.status || 'in_progress',
            thumbnail: enrollment.course?.thumbnail || '',
            total_lessons: enrollment.total_lessons || 0,
            completed_lessons: enrollment.completed_lessons || 0
          };
        });
  
        setCourses(transformedCourses.filter(course => course.status !== 'completed'));
        setCompletedCourses(transformedCourses.filter(course => course.status === 'completed'));
  
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message || "Failed to load courses");
        setCourses([]);
        setCompletedCourses([]);
      } finally {
        setLoading(false);
      }
    };

    
  
    fetchCourses();
  }, [studentId]);
  
  
  if (loading) {
    return (
      <Container fluid className="p-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading your courses...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-4 text-center">
        <div className="alert alert-danger">{error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4 my-courses-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">My Courses</h3>
        <Button variant="dark" className="px-4" onClick={() => navigate('/student/course-catalog')}>
          Browse Courses
        </Button>
      </div>

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

      {activeTab === 'inProgress' ? (
        <Row>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Col key={course.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="course-card h-100 shadow-sm">
                  {course.thumbnail && (
                    <Card.Img 
                      variant="top" 
                      src={course.thumbnail} 
                      alt={course.course_title}
                      style={{ height: '180px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x180?text=Course+Image';
                      }}
                    />
                  )}
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="light" text="dark" className="fw-semibold text-capitalize">
                        {course.course_category}
                      </Badge>
                      <small className="text-muted">{course.enrolled_date}</small>
                    </div>
                    <Card.Title>{course.course_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Instructor: {course.instructor_name}
                    </Card.Subtitle>
                    
                    <div className="mt-3 mb-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Progress</span>
                        <span>{course.progress}% ({course.completed_lessons}/{course.total_lessons} lessons)</span>
                      </div>
                      <ProgressBar now={course.progress} className="custom-progress" />
                    </div>
                    <p className="mb-2">
                      <strong>Next:</strong> Lesson {course.next_lesson}
                    </p>
                    <Button
                      variant="dark"
                      className="w-100"
                      onClick={() =>
                        navigate(`/student/course/${course.course_id}/lesson/${course.next_lesson}`, {
                          state: { course }
                        })
                      }
                    >
                      Continue Learning
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4>No courses in progress</h4>
              <Button variant="primary" onClick={() => navigate('/student/course-catalog')}>
                Browse Courses
              </Button>
            </Col>
          )}
        </Row>
      ) : (
        <Row>
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Col key={course.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {course.thumbnail && (
                    <Card.Img 
                      variant="top" 
                      src={course.thumbnail} 
                      alt={course.course_title}
                      style={{ height: '180px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x180?text=Course+Image';
                      }}
                    />
                  )}
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Badge bg="light" text="dark" className="text-capitalize">
                        {course.course_category}
                      </Badge>
                      <Badge bg="success">Completed</Badge>
                    </div>
                    <Card.Title className="fw-bold">{course.course_title}</Card.Title>
                    <Card.Text className="text-muted">Instructor: {course.instructor_name}</Card.Text>
                    <Card.Text>
                      <strong>Completed on:</strong> {course.enrolled_date}
                    </Card.Text>
                    <Button 
                      variant="outline-dark" 
                      className="w-100"
                      onClick={() => navigate(`/student/course/${course.course_id}`)}
                    >
                      Review Course
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4>No completed courses yet</h4>
              <p>Keep learning to see your completed courses here!</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default MyCourses;
