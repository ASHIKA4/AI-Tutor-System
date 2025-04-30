import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaFilter, FaSort, FaClock, FaCheckCircle, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Quizzes = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const quizzes = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      course: 'Introduction to Machine Learning',
      questions: 10,
      timeLimit: '15 min',
      status: 'active',
      attempts: 32,
      avgScore: 78,
      createdAt: 'Apr 1, 2025',
    },
    {
      id: 2,
      title: 'Python Advanced Concepts',
      course: 'Advanced Python Programming',
      questions: 15,
      timeLimit: '20 min',
      status: 'active',
      attempts: 25,
      avgScore: 82,
      createdAt: 'Apr 3, 2025',
    },
    {
      id: 3,
      title: 'Data Structures Quiz',
      course: 'Data Structures & Algorithms',
      questions: 12,
      timeLimit: '25 min',
      status: 'draft',
      attempts: 0,
      avgScore: 0,
      createdAt: 'Apr 5, 2025',
    },
    {
      id: 4,
      title: 'Neural Networks Assessment',
      course: 'Introduction to Machine Learning',
      questions: 8,
      timeLimit: '15 min',
      status: 'scheduled',
      attempts: 0,
      avgScore: 0,
      createdAt: 'Apr 8, 2025',
    },
    {
      id: 5,
      title: 'Python Basics',
      course: 'Advanced Python Programming',
      questions: 20,
      timeLimit: '30 min',
      status: 'completed',
      attempts: 38,
      avgScore: 85,
      createdAt: 'Mar 15, 2025',
    },
  ];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' || quiz.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const statusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'draft':
        return 'secondary';
      case 'scheduled':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'light';
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Quiz Management</h2>
        </Col>
        <Col className="text-end">
        <Link to="/teacher/newquiz">
          <Button variant="outline-primary">
            <FaPlus className="me-2" />
            Create Quiz
          </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="courseFilter">
            <Form.Select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
              <option value="all">All Courses</option>
              <option value="Introduction to Machine Learning">Introduction to Machine Learning</option>
              <option value="Advanced Python Programming">Advanced Python Programming</option>
              <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="statusFilter">
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Tabs defaultActiveKey="all" id="quiz-tabs" className="mb-3">
        <Tab eventKey="all" title="All Quizzes">
          <Card data-aos="fade-up">
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Course</th>
                    <th>Questions</th>
                    <th>Time Limit</th>
                    <th>Status</th>
                    <th>Performance</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuizzes.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaGraduationCap className="me-2 text-muted" />
                          <span>{quiz.title}</span>
                        </div>
                      </td>
                      <td>{quiz.course}</td>
                      <td>{quiz.questions}</td>
                      <td>{quiz.timeLimit}</td>
                      <td>
                        <Badge bg={statusVariant(quiz.status)} className="text-capitalize">
                          {quiz.status}
                        </Badge>
                      </td>
                      <td>
                        {quiz.attempts > 0 ? (
                          <>
                            <strong>{quiz.avgScore}%</strong>
                            <span className="text-muted"> ({quiz.attempts} attempts)</span>
                          </>
                        ) : (
                          <span className="text-muted">No attempts</span>
                        )}
                      </td>
                      <td className="text-end">
                        <Dropdown as={ButtonGroup}>
                          <Button variant="secondary">Actions</Button>
                          <Dropdown.Toggle split variant="secondary" id={`dropdown-${quiz.id}`} />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <FaEye className="me-2" />
                              Preview
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <FaEdit className="me-2" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <FaCheckCircle className="me-2" />
                              View Results
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#" className="text-danger">
                              <FaTrash className="me-2" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="active" title="Active">
          <Card data-aos="fade-up">
            <Card.Body className="text-center py-5">
              <FaGraduationCap size={50} className="text-muted mb-3" />
              <h5>Active Quizzes</h5>
              <p className="text-muted">View and manage currently active quizzes.</p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="draft" title="Draft">
          <Card data-aos="fade-up">
            <Card.Body className="text-center py-5">
              <FaGraduationCap size={50} className="text-muted mb-3" />
              <h5>Draft Quizzes</h5>
              <p className="text-muted">Continue working on your draft quizzes.</p>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="completed" title="Completed">
          <Card data-aos="fade-up">
            <Card.Body className="text-center py-5">
              <FaGraduationCap size={50} className="text-muted mb-3" />
              <h5>Completed Quizzes</h5>
              <p className="text-muted">View past quizzes and their results.</p>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Quizzes;
