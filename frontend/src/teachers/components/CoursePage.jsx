import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Trash, ArrowUpDown, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/CoursePage.css'; // Custom CSS if needed
import { useNavigate } from 'react-router-dom';



function CoursePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [view, setView] = useState('grid');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const courses = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning algorithms and applications.',
      status: 'published',
      students: 45,
      lastUpdated: '2 days ago',
      category: 'Data Science',
      image: '/images/placeholder.png',
    },
    {
      id: 2,
      title: 'Advanced Python Programming',
      description: 'Master advanced Python concepts including decorators, generators, and more.',
      status: 'published',
      students: 38,
      lastUpdated: '1 week ago',
      category: 'Programming',
      image: '/images/placeholder.png',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      description: 'Comprehensive guide to data structures and algorithm design techniques.',
      status: 'published',
      students: 32,
      lastUpdated: '3 days ago',
      category: 'Computer Science',
      image: '/images/placeholder.png',
    },
    {
      id: 4,
      title: 'Web Development with React',
      description: 'Build modern, responsive web applications using React.',
      status: 'draft',
      students: 0,
      lastUpdated: 'Yesterday',
      category: 'Web Development',
      image: '/images/placeholder.png',
    },
    {
      id: 5,
      title: 'Introduction to Artificial Intelligence',
      description: 'Explore the foundations of AI.',
      status: 'draft',
      students: 0,
      lastUpdated: '4 days ago',
      category: 'Artificial Intelligence',
      image: '/images/placeholder.png',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
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

      {view === 'grid' ? (
        <Row data-aos="fade-up">
          {filteredCourses.map((course) => (
            <Col md={4} className="mb-4" key={course.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={course.image} alt={course.title} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg={course.status === 'published' ? 'success' : 'secondary'}>
                      {course.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        ⋮
                      </Dropdown.Toggle>
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
                    <div><Users size={14} className="me-1" />{course.students} students</div>
                    <div className="text-muted">Updated {course.lastUpdated}</div>
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
                  <span className="text-muted me-3">{course.students} students</span>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
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
