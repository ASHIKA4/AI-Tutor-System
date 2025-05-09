import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import "../styles/Enroll.css";

const Enroll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state;
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-danger">No course data found. Please return to Course Catalog.</h4>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/course-calalog')}>
          Back to Courses
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    return newErrors;
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      // Get student ID from localStorage or wherever you store user data
      const studentId = localStorage.getItem('studentId'); // Adjust this based on your auth system
      
      
      const enrollmentData = {
        full_name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        course_id: course.id,
        teacher: course.teacher,
        student: studentId || 1 ,
        module_status: [],
        progress: 0 ,
        quiz_status: 0// Fallback to 1 if no student ID, adjust as needed
      };

      const response = await fetch('http://127.0.0.1:8000/enroll/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': Token ${localStorage.getItem('token')}
        },
        body: JSON.stringify(enrollmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enroll');
      }

      // Success - update local storage with enrolled courses
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      localStorage.setItem('enrolledCourses', JSON.stringify([...enrolledCourses, course.id]));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/student/my-courses');
      }, 2000);
    } catch (err) {
      setApiError(err.message || 'An error occurred during enrollment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow enroll-card">
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        {success && (
          <Alert variant="success">
            Enrollment successful! Redirecting to courses...
          </Alert>
        )}
        
        <Row>
          {/* Left: Course Info */}
          <Col md={6} className="left-section">
            <div className="image-wrapper mb-3">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="img-fluid rounded course-image"
              />
            </div>

            <h3 className="fw-bold text-primary mb-3">{course.title}</h3>
            <ul className="list-unstyled">
            <li><p><strong>Instructor:</strong> {course.teacher_detail?.username}</p></li>
              <li><strong>Level:</strong> {course.difficulty_level}</li>
              {/* Duration not available in API - you might want to add it */}
              <li><strong>Duration:</strong> 8 weeks</li>
            </ul>
            <p className="text-muted mt-3">{course.description}</p>
          </Col>

          {/* Right: Enrollment Form */}
          <Col md={6}>
            <div className="form-section px-md-4">
              <h4 className="mb-4 text-dark border-bottom pb-2">Enrollment Form</h4>
              <Form onSubmit={handleEnroll}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    placeholder="Enter your full name"
                    disabled={loading || success}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email"
                    disabled={loading || success}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                    placeholder="Enter your mobile number"
                    disabled={loading || success}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="success" 
                    size="lg" 
                    type="submit"
                    disabled={loading || success}
                  >
                    {loading ? 'Processing...' : 'Confirm Enrollment'}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Enroll;