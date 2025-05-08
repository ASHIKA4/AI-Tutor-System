import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Dropdown, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash, ArrowUpDown, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'; // ✅ Import Axios
import '../styles/CoursePage.css';

function CoursePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [courses, setCourses] = useState([]); // ✅ API courses stored here


  const navigate = useNavigate();
  const teacherId=localStorage.getItem("teacheruserId")
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    // ✅ Fetch courses from API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/courses/?teacher=${teacherId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [teacherId]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-right">
        <h2 className="fw-bold">Course Management</h2>
        <Link to="/teacher/newcourse">
          <Button variant="primary">
            <Plus size={18} className="me-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Row className="mb-4" data-aos="fade-up">
        <Col md={4} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Form.Select>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="Data Science">Data Science</option>
            <option value="Programming">Programming</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="outline-primary" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            <ArrowUpDown size={16} className="me-2" />
            {view === 'grid' ? 'List View' : 'Grid View'}
          </Button>
        </Col>
      </Row>

      {/* Course Cards */}
      {view === 'grid' ? (
        <Row data-aos="fade-up">
          {filteredCourses.map((course) => (
            <Col md={4} className="mb-4" key={course.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={course.thumbnail || '/images/placeholder.png'} alt={course.title} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg={course.status === 'published' ? 'success' : 'secondary'}>
                      {course.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">⋮</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><Eye size={16} className="me-2" />Preview</Dropdown.Item>
                        <Dropdown.Item><Edit size={16} className="me-2" />Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger"><Trash size={16} className="me-2" />Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <h5 className="fw-bold">{course.title}</h5>
                  <p className="small text-muted">{course.description}</p>
                  <div className="d-flex justify-content-between align-items-center small">
                    <div><Users size={14} className="me-1" />{course.students || 0} students</div>
                    <div className="text-muted">Updated {course.last_updated || 'recently'}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div data-aos="fade-up">
          {filteredCourses.map((course) => (
            <Card className="mb-3" key={course.id}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold">{course.title}</h6>
                  <small className="text-muted">{course.category}</small>
                </div>
                <div>
                  <Badge bg={course.status === 'published' ? 'success' : 'secondary'} className="me-2">
                    {course.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                  <span className="text-muted me-3">{course.students || 0} students</span>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">⋮</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item><Eye size={16} className="me-2" />Preview</Dropdown.Item>
                      <Dropdown.Item><Edit size={16} className="me-2" />Edit</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger"><Trash size={16} className="me-2" />Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default CoursePage;
