import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Container, Row, Col, Button, Form, Table, Badge, Dropdown,
  InputGroup, FormControl, Card
} from 'react-bootstrap';
import {
  Plus, Search, Filter, ArrowUpDown, Calendar,
  CheckCircle, Clock, FileText, MoreHorizontal, Eye, Edit, Trash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/AssignmentsPage.css'; // optional for custom styles



const AssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');



  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const assignments = [
    {
      id: 1, title: "ML Model Evaluation", course: "Introduction to Machine Learning",
      dueDate: "Apr 15, 2025", status: "active", submissions: 28, totalStudents: 45,
    },
    {
      id: 2, title: "Python Project Submission", course: "Advanced Python Programming",
      dueDate: "Apr 20, 2025", status: "active", submissions: 15, totalStudents: 38,
    },
    {
      id: 3, title: "Algorithm Analysis", course: "Data Structures & Algorithms",
      dueDate: "Apr 25, 2025", status: "draft", submissions: 0, totalStudents: 32,
    },
    {
      id: 4, title: "Neural Network Implementation", course: "Introduction to Machine Learning",
      dueDate: "May 5, 2025", status: "scheduled", submissions: 0, totalStudents: 45,
    },
    {
      id: 5, title: "Data Visualization Project", course: "Advanced Python Programming",
      dueDate: "Mar 30, 2025", status: "completed", submissions: 36, totalStudents: 38,
    }
  ];

  const filteredAssignments = assignments.filter(a =>
    (courseFilter === 'all' || a.course === courseFilter) &&
    (statusFilter === 'all' || a.status === statusFilter) &&
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusVariant = {
    active: 'primary',
    draft: 'secondary',
    scheduled: 'warning',
    completed: 'success'
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col><h3>Assignment Management</h3></Col>
        <Col className="text-end">

          <Link to="/teacher/newassignment">
            <Button variant="primary">
              <Plus size={18} className="me-2" />
              Create Assignment
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="g-3 mb-3" data-aos="fade-up">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text><Search size={16} /></InputGroup.Text>
            <FormControl
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
            <option value="all">All Courses</option>
            <option value="Introduction to Machine Learning">Introduction to Machine Learning</option>
            <option value="Advanced Python Programming">Advanced Python Programming</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
      </Row>

      <Card data-aos="fade-up">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h5>Assignments ({filteredAssignments.length})</h5>
            <div>
              <Button variant="outline-secondary" className="me-2"><Filter size={16} className="me-1" /> Filter</Button>
              <Button variant="outline-secondary"><ArrowUpDown size={16} className="me-1" /> Sort</Button>
            </div>
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Submissions</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map(a => (
                <tr key={a.id}>
                  <td><FileText size={16} className="me-2 text-muted" /> {a.title}</td>
                  <td>{a.course}</td>
                  <td><Calendar size={16} className="me-1 text-muted" /> {a.dueDate}</td>
                  <td>
                    <Badge bg={statusVariant[a.status]} className="d-flex align-items-center">
                      {a.status === 'active' && <Clock size={14} className="me-1" />}
                      {a.status === 'completed' && <CheckCircle size={14} className="me-1" />}
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </Badge>
                  </td>
                  <td>{a.submissions} / {a.totalStudents}</td>
                  <td className="text-end">
                    <Dropdown>
                      <Dropdown.Toggle variant="link" bsPrefix="btn btn-sm p-0">
                        <MoreHorizontal />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><Eye size={14} className="me-2" /> View</Dropdown.Item>
                        <Dropdown.Item><Edit size={14} className="me-2" /> Edit</Dropdown.Item>
                        <Dropdown.Item><CheckCircle size={14} className="me-2" /> Grade Submissions</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger"><Trash size={14} className="me-2" /> Delete</Dropdown.Item>
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

export default AssignmentsPage;
