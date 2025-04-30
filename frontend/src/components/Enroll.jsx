import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import "../styles/Enroll.css"

const Enroll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-danger">No course data found. Please return to Course Catalog.</h4>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/courses')}>
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

  const handleEnroll = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    alert('Enrolled Successfully!');
    navigate('/courses');
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow enroll-card">
        <Row>
          {/* Left: Course Info */}
          <Col md={6} className="left-section">
            <div className="image-wrapper mb-3">
              <img
                src={`/images/${course.image}`}
                alt={course.title}
                className="img-fluid rounded course-image"
              />
            </div>

            <h3 className="fw-bold text-primary mb-3">{course.title}</h3>
            <ul className="list-unstyled">
              <li><strong>Instructor:</strong> {course.instructor}</li>
              <li><strong>Level:</strong> {course.level}</li>
              <li><strong>Duration:</strong> {course.duration}</li>
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
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" size="lg" type="submit">
                    Confirm Enrollment
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
