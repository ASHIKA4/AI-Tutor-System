import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Tabs,
  Tab,
  InputGroup,
} from 'react-bootstrap';
import { ChevronLeft, Upload, Plus, Trash, Save, Eye, FileText } from 'lucide-react';

import AOS from 'aos';

const NewAssignmentPage = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'Assignment Guidelines.pdf', type: 'pdf', size: '245 KB' },
    { id: 2, name: 'Dataset.csv', type: 'csv', size: '1.2 MB' },
  ]);
  const [key, setKey] = useState('details');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const addResource = () => {
    const newId = resources.length > 0 ? Math.max(...resources.map((r) => r.id)) + 1 : 1;
    setResources([
      ...resources,
      { id: newId, name: `New Resource ${newId}`, type: 'pdf', size: '0 KB' },
    ]);
  };

  const removeResource = (id) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  return (
    <Container fluid className="py-4">
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <Button variant="outline-secondary" href="/teacher/assignments">
            <ChevronLeft size={16} className="me-2" />
            Back
          </Button>
        </Col>
        <Col>
          <h2 className="mb-0">Create New Assignment</h2>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" className="me-2">
            <Eye size={16} className="me-2" />
            Preview
          </Button>
          <Button variant="primary">
            <Save size={16} className="me-2" />
            Save Assignment
          </Button>
        </Col>
      </Row>

      <Tabs
        id="assignment-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="details" title="Assignment Details">
          <Card data-aos="fade-up">
            <Card.Header>Basic Information</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Assignment Title</Form.Label>
                  <Form.Control type="text" placeholder="e.g. Machine Learning Model Evaluation" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Assignment Description</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Provide detailed instructions for the assignment" />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="course">
                      <Form.Label>Course</Form.Label>
                      <Form.Select>
                        <option>Select course</option>
                        <option value="ml">Introduction to Machine Learning</option>
                        <option value="python">Advanced Python Programming</option>
                        <option value="dsa">Data Structures & Algorithms</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="dueDate">
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="points">
                      <Form.Label>Total Points</Form.Label>
                      <Form.Control type="number" placeholder="e.g. 100" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="timeEstimate">
                      <Form.Label>Estimated Time to Complete</Form.Label>
                      <Form.Control type="text" placeholder="e.g. 2 hours" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="objectives">
                  <Form.Label>Learning Objectives</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="What skills or knowledge will students demonstrate?" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="resources" title="Resources">
          <Card data-aos="fade-up">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Assignment Resources</h5>
                <small className="text-muted">Add files and resources for students</small>
              </div>
              <Button variant="success" onClick={addResource}>
                <Plus size={16} className="me-2" />
                Add Resource
              </Button>
            </Card.Header>
            <Card.Body>
              {resources.map((resource) => (
                <Card className="mb-3" key={resource.id}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h6 className="mb-0">{resource.name}</h6>
                        <small className="text-muted">{resource.size}</small>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <Eye size={16} className="me-1" />
                        Preview
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => removeResource(resource.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              <div className="border border-dashed p-4 text-center" data-aos="fade-up">
                <Upload size={32} className="mb-2 text-muted" />
                <h6>Upload Files</h6>
                <p className="text-muted">Drag and drop files here, or click to browse</p>
                <Form.Group controlId="fileUpload" className="d-none">
                  <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" className="mt-2">
                  Browse Files
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="settings" title="Settings">
          <Card data-aos="fade-up">
            <Card.Header>Assignment Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="published"
                  label="Assignment Status"
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="lateSubmissions"
                  label="Allow Late Submissions"
                  defaultChecked
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="peerReview"
                  label="Enable Peer Review"
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="plagiarismCheck"
                  label="Plagiarism Check"
                  defaultChecked
                  className="mb-3"
                />
                <Form.Group className="mb-3" controlId="gradingRubric">
                  <Form.Label>Grading Rubric</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Describe how the assignment will be graded" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="visibilityOptions">
                  <Form.Label>Visibility Options</Form.Label>
                  <Form.Select defaultValue="all">
                    <option value="all">All Students</option>
                    <option value="groups">Specific Groups</option>
                    <option value="individual">Individual Students</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <Button variant="outline-secondary" className="me-2">Cancel</Button>
              <Button variant="primary">Save Settings</Button>
            </Card.Footer>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default NewAssignmentPage;
