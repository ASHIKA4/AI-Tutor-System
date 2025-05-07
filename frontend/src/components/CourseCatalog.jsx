import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Form, InputGroup } from 'react-bootstrap';
import '../styles/CourseCatalog.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
 console.log(courses);
  // State to manage the filters and search query
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  // Fetch courses from API
  
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


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle level selection change
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  // Map API category values to display names
  const getDisplayCategory = (apiCategory) => {
    const categoryMap = {
      'programming': 'Programming',
      'web_development': 'Web Development',
      'data_science': 'Data Science',
      'ai_ml': 'Artificial Intelligence',
      // Add other mappings as needed
    };
    return categoryMap[apiCategory] || apiCategory;
  };

  // Map API difficulty levels to display names
  const getDisplayLevel = (apiLevel) => {
    const levelMap = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    return levelMap[apiLevel] || apiLevel;
  };

  // Filter courses based on search term, category, and level
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
      {/* Main Content */}
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Course Catalog</h4>
          <button className="btn btn-outline-secondary">Help</button>
        </div>

        {/* Search & Filters */}
        <div className="d-flex gap-3 mb-4 flex-wrap">
          {/* Search Field */}
          <InputGroup className="search-box">
            <Form.Control
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          {/* Categories Dropdown */}
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

          {/* Levels Dropdown */}
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
                      {/* Duration not available in API, you might want to add it */}
                      <span className="badge bg-secondary text-light">N/A weeks</span>
                    </div>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    {/* Instructor ID available but not name - you might want to fetch teacher details */}
                    <p className="instructor">
                      <strong>Instructor:</strong> Teacher #{course.teacher}
                    </p>
                  </div>

                  {/* Push button to bottom */}
                  <div className="mt-auto">
                    {enrolledCourses.includes(course.id) ? (
                      <button
                        className="btn btn-success w-100"
                        onClick={() =>
                          navigate(`/home/student/course/${course.id}/lesson/1`, { state: { course } })} // navigate to the lesson page
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