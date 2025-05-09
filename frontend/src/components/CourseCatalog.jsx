import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Card, Dropdown, Form, InputGroup } from 'react-bootstrap';
import '../styles/CourseCatalog.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState([]);
  const [error, setError] = useState(null);
  const studentId = localStorage.getItem("studentId");

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const enrolledCourseIds = enrolled.map(enrollment => enrollment.course.id);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/courses/');
        setCourses(response.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/enroll/?student=${studentId}`);
        setEnrolled(response.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  const getDisplayCategory = (apiCategory) => {
    const categoryMap = {
      'programming': 'Programming',
      'web_development': 'Web Development',
      'data_science': 'Data Science',
      'ai_ml': 'Artificial Intelligence',
    };
    return categoryMap[apiCategory] || apiCategory;
  };

  const getDisplayLevel = (apiLevel) => {
    const levelMap = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    return levelMap[apiLevel] || apiLevel;
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || 
      getDisplayCategory(course.category) === selectedCategory;
    const matchesLevel = 
      selectedLevel === 'All Levels' || 
      getDisplayLevel(course.difficulty_level) === selectedLevel;

    return matchesSearchTerm && matchesCategory && matchesLevel;
  });

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading courses...</div>;
  }

  if (error) {
    return <div className="d-flex justify-content-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="d-flex">
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Course Catalog</h4>
          <button className="btn btn-outline-secondary">Help</button>
        </div>

        <div className="d-flex gap-3 mb-4 flex-wrap">
          <InputGroup className="search-box">
            <Form.Control
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Dropdown>
            <Dropdown.Toggle className="border">
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategoryChange('All Categories')}>
                All Categories
              </Dropdown.Item>
              {Array.from(new Set(courses.map(course => getDisplayCategory(course.category)))).map(category => (
                <Dropdown.Item 
                  key={category} 
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle className="border">
              {selectedLevel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLevelChange('All Levels')}>
                All Levels
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Beginner')}>
                Beginner
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Intermediate')}>
                Intermediate
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Advanced')}>
                Advanced
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {filteredCourses.map(course => (
            <Col sm={12} md={6} lg={4} key={course.id} className="mb-4" data-aos="fade-up">
              <Card className="shadow-sm h-100">
                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark">
                        {getDisplayLevel(course.difficulty_level)}
                      </span>
                      <span className="badge bg-secondary text-light">8 weeks</span>
                    </div>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <p className="instructor">
  <strong>Instructor:</strong> {course.teacher_detail?.username}
</p>

                  </div>

                  <div className="mt-auto">
                    {enrolledCourseIds.includes(course.id) ? (
                      <button
                        className="btn btn-success w-100"
                        onClick={() => navigate(`/student/course/${course.id}`)}
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary w-100"
                        onClick={() =>
                          navigate(`/student/enroll/${course.id}`, {
                            state: { course, thumbnail: course.thumbnail },
                          })
                        }
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CourseCatalog;
