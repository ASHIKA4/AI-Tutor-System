import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Search,
  Download,
  Envelope,
  ThreeDotsVertical,
  BarChart,
  FileText,
  SortDown
} from 'react-bootstrap-icons';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Table,
  Image,
  Badge,
  ProgressBar,
  Dropdown,
} from 'react-bootstrap';

import '../styles/StudentsPage.css';

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const students = [
    {
      id: 1,
      name: 'Nancy',
      email: 'nancy@gmail.com',
      enrolledCourses: ['Intro to ML', 'Advanced Python'],
      progress: 65,
      lastActive: '2 hours ago',
      status: 'active',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'gowsi@gmail.com',
      email: 'emily.johnson@example.com',
      enrolledCourses: ['Intro to ML', 'DSA'],
      progress: 78,
      lastActive: 'Yesterday',
      status: 'active',
      image: '/placeholder.svg',
    },
  
  ];

  const allCourses = Array.from(new Set(students.flatMap(s => s.enrolledCourses)));

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      courseFilter === 'all' || student.enrolledCourses.includes(courseFilter);
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <Container fluid className="students-page py-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col><h2>Student Management</h2></Col>
        <Col className="text-end">
          <Button variant="outline-primary">
            <Download className="me-1" /> Export CSV
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="g-3 mb-4" data-aos="fade-up">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text><Search /></InputGroup.Text>
            <FormControl
              placeholder="Search students..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
            <option value="all">All Courses</option>
            {allCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="at-risk">At Risk</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button variant="outline-secondary" className="me-2">
            <ThreeDotsVertical /> Filter
          </Button>
          <Button variant="outline-secondary">
            <SortDown /> Sort
          </Button>
        </Col>
      </Row>

      {/* Students Table */}
      <Card data-aos="fade-up">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Students ({filteredStudents.length})</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Student</th>
                <th>Enrolled Courses</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Last Active</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image src={student.image} roundedCircle className="me-2" width="40" height="40" />
                      <div>
                        <div className="fw-semibold">{student.name}</div>
                        <small className="text-muted">{student.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {student.enrolledCourses.map((c, i) => (
                      <Badge bg="secondary" key={i} className="me-1">{c}</Badge>
                    ))}
                  </td>
                  <td>
                    <small>{student.progress}%</small>
                    <ProgressBar now={student.progress} className="mt-1" />
                  </td>
                  <td>
                    <Badge bg={
                      student.status === 'active' ? 'success' :
                        student.status === 'at-risk' ? 'warning' : 'secondary'
                    }>
                      {student.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td>{student.lastActive}</td>
                  <td className="text-end">
                    <Dropdown>
                      <Dropdown.Toggle variant="link" bsPrefix="p-0">
                        <ThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item><Envelope className="me-2" /> Message</Dropdown.Item>
                        <Dropdown.Item><BarChart className="me-2" /> View Progress</Dropdown.Item>
                        <Dropdown.Item><FileText className="me-2" /> View Assignments</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item><Download className="me-2" /> Export Data</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentsPage;
