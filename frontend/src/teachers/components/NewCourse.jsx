import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CoursePage.css';

const NewCourse = () => {
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacheruserId");

  const [courseId, setCourseId] = useState();
  const [courseImage, setCourseImage] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [lessons, setLessons] = useState([]);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty_level: '',
    teacher: teacherId,
  });

  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    video_url: '',
    course: null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(file);
    }
  };

  const fetchLessons = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/modules/?course=${id}`);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleNextClick = async () => {
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('category', courseData.category);
    formData.append('difficulty_level', courseData.difficulty_level);
    formData.append('teacher', courseData.teacher);

    if (courseImage) {
      formData.append('thumbnail', courseImage);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/courses/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const createdCourse = response.data;
      setCourseId(createdCourse.id);
      setLesson((prev) => ({ ...prev, course: createdCourse.id }));
      setActiveTab('content');
      fetchLessons(createdCourse.id);
    } catch (error) {
      console.error('Error creating course:', error.response ? error.response.data : error.message);
      alert('There was an error creating the course. Please try again.');
    }
  };

  const handleAddLesson = async () => {
    try {
      const lessonData = { ...lesson, course: courseId };
      await axios.post('http://localhost:8000/modules/', lessonData);
      setLesson({ title: '', description: '', video_url: '', course: courseId });
      fetchLessons(courseId); // Refresh lesson list after adding
    } catch (error) {
      console.error('Error adding lesson:', error.response ? error.response.data : error.message);
      alert('There was an error adding the lesson. Please try again.');
    }
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-primary" onClick={() => navigate('/teacher/courses')}>← Back</Button>
        <h2>Create New Course</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary">Preview</Button>
          <Button variant="primary" onClick={handleNextClick}>Save Course</Button>
        </div>
      </div>

      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
        <Tab eventKey="details" title="Course Details">
          <Card className="p-4">
            <h4>Basic Information</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder="e.g. Introduction to Machine Learning"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Course Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  placeholder="Provide a detailed description of your course"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={courseData.category}
                      onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      <option value="programming">Programming</option>
                      <option value="data_science">Data Science</option>
                      <option value="web_development">Web Development</option>
                      <option value="ai_ml">AI & Machine Learning</option>
                      <option value="cloud_computing">Cloud Computing</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Difficulty Level</Form.Label>
                    <Form.Select
                      value={courseData.difficulty_level}
                      onChange={(e) => setCourseData({ ...courseData, difficulty_level: e.target.value })}
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Course Thumbnail</Form.Label>
                <div className="upload-thumbnail mb-2">
                  {courseImage ? (
                    <img src={URL.createObjectURL(courseImage)} alt="Thumbnail" className="thumbnail-img" />
                  ) : (
                    <div className="thumbnail-placeholder">No Image Selected</div>
                  )}
                </div>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Form.Group>
            </Form>

            <Button variant="primary" onClick={handleNextClick}>Next</Button>
          </Card>
        </Tab>

        <Tab eventKey="content" title="Content" disabled={!courseId}>
          <Card className="p-4">
            <h4>Add Lesson</h4>
            <Form>
              <Row className="align-items-center mb-3">
                <Col md={6}>
                  <Form.Control
                    placeholder="Lesson Title"
                    value={lesson.title}
                    onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Video URL"
                    value={lesson.video_url}
                    onChange={(e) => setLesson({ ...lesson, video_url: e.target.value })}
                    required
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Lesson Content"
                  value={lesson.description}
                  onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Button variant="success" onClick={handleAddLesson}>Add Lesson</Button>
            </Form>

            {/* Display Lessons List */}
            <hr />
            <h5 className="mt-4">Lessons</h5>
            {lessons.length === 0 ? (
              <p className="text-muted">No lessons added yet.</p>
            ) : (
              <ul className="list-group mt-3">
                {lessons.map((item, index) => (
                  <li key={item.id} className="list-group-item">
                    <strong>{index + 1}. {item.title}</strong>
                    <br />
                    <span>{item.description}</span><br />
                    <small className="text-primary">{item.video_url}</small>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default NewCourse;
