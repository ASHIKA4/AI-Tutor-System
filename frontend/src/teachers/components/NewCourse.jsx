import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/CoursePage.css'; // We'll create this custom CSS file

const CoursePage = () => {
  const navigate = useNavigate();
  const [courseImage, setCourseImage] = useState(null);
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction", type: "video", content: "", duration: "10 min" },
    { id: 2, title: "Key Concepts", type: "text", content: "", duration: "15 min" },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCourseImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addLesson = () => {
    const newId = lessons.length ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
    setLessons([...lessons, { id: newId, title: `New Lesson ${newId}`, type: "text", content: "", duration: "0 min" }]);
  };

  const removeLesson = (id) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-primary" onClick={() => navigate('/teacher/courses')}>← Back</Button>
        <h2>Create New Course</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary">Preview</Button>
          <Button variant="primary">Save Course</Button>
        </div>
      </div>

      <Tabs defaultActiveKey="details" className="mb-3">
        {/* Tabs */}
        <Tab eventKey="details" title="Course Details">
          <Card className="p-4">
            <h4>Basic Information</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Course Title</Form.Label>
                <Form.Control placeholder="e.g. Introduction to Machine Learning" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Course Description</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Provide a detailed description of your course" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                      <option>Select category</option>
                      <option>Data Science</option>
                      <option>Programming</option>
                      <option>Computer Science</option>
                      <option>Web Development</option>
                      <option>Artificial Intelligence</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Difficulty Level</Form.Label>
                    <Form.Select>
                      <option>Select level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Course Thumbnail */}
              <Form.Group className="mb-3">
                <Form.Label>Course Thumbnail</Form.Label>
                <div className="upload-thumbnail mb-2">
                  {courseImage ? (
                    <img src={courseImage} alt="Thumbnail" className="thumbnail-img" />
                  ) : (
                    <div className="thumbnail-placeholder">No Image Selected</div>
                  )}
                </div>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Form.Group>
            </Form>
          </Card>
        </Tab>

        <Tab eventKey="content" title="Content">
          <Card className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Course Lessons</h4>
              <Button variant="success" onClick={addLesson}>+ Add Lesson</Button>
            </div>

            {lessons.map((lesson, index) => (
              <Card className="mb-3 p-3" key={lesson.id}>
                <Row className="align-items-center">
                  <Col md={8}>
                    <Form.Control
                      value={lesson.title}
                      onChange={(e) => {
                        const updatedLessons = [...lessons];
                        updatedLessons[index].title = e.target.value;
                        setLessons(updatedLessons);
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={lesson.type}
                      onChange={(e) => {
                        const updatedLessons = [...lessons];
                        updatedLessons[index].type = e.target.value;
                        setLessons(updatedLessons);
                      }}
                    >
                      <option value="video">Video</option>
                      <option value="text">Text</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                    </Form.Select>
                  </Col>
                  <Col md={1}>
                    <Button variant="danger" size="sm" onClick={() => removeLesson(lesson.id)}>🗑️</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        </Tab>

        <Tab eventKey="settings" title="Settings">
          <Card className="p-4">
            <h4>Course Settings</h4>
            <Form>
              <Form.Check type="switch" label="Course Status (Publish)" className="mb-3" />
              <Form.Check type="switch" label="Open Enrollment" className="mb-3" defaultChecked />
              <Form.Check type="switch" label="Enable Certificates" className="mb-3" defaultChecked />

              <Form.Group className="mb-3">
                <Form.Label>Prerequisites</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter course prerequisites" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Learning Outcomes</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="What will students learn?" />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="outline-secondary">Cancel</Button>
                <Button variant="primary">Save Settings</Button>
              </div>
            </Form>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CoursePage;
