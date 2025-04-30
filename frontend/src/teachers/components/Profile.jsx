import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Tab,
  Tabs,
  Image,
} from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Profile() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const user = {
    name: 'Dr. Rebecca Chen',
    email: 'rebecca.chen@example.com',
    joinDate: 'January 5, 2024',
    role: 'Teacher',
    department: 'Computer Science',
    bio: 'Professor of Computer Science with a focus on Machine Learning and Artificial Intelligence. Over 10 years of teaching experience and industry collaboration.',
    expertise: ['Machine Learning', 'Artificial Intelligence', 'Data Science', 'Python Programming'],
    education: [
      {
        degree: 'Ph.D. in Computer Science',
        institution: 'Stanford University',
        year: '2015',
      },
      {
        degree: 'M.S. in Computer Science',
        institution: 'MIT',
        year: '2011',
      },
      {
        degree: 'B.S. in Computer Science',
        institution: 'UC Berkeley',
        year: '2009',
      },
    ],
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Profile</h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey="personal" id="profile-tabs" className="mb-3">
        <Tab eventKey="personal" title="Personal Information">
          <Card data-aos="fade-up" className="mb-4">
            <Card.Body>
              <Row className="mb-3">
                <Col md={4} className="text-center">
                  <Image
                    src={profileImage || 'https://via.placeholder.com/150'}
                    roundedCircle
                    fluid
                    alt="Profile"
                  />
                  <Form.Group controlId="formFile" className="mt-3">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                  </Form.Group>
                  {profileImage && (
                    <Button variant="outline-danger" size="sm" onClick={() => setProfileImage(null)} className="mt-2">
                      Remove
                    </Button>
                  )}
                </Col>
                <Col md={8}>
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" defaultValue="Rebecca" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" defaultValue="Chen" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="displayName" className="mb-3">
                      <Form.Label>Display Name</Form.Label>
                      <Form.Control type="text" defaultValue="Dr. Rebecca Chen" />
                    </Form.Group>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" defaultValue={user.email} />
                    </Form.Group>
                    <Form.Group controlId="bio" className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control as="textarea" rows={3} defaultValue={user.bio} />
                    </Form.Group>
                    <Button variant="primary">Save Personal Information</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="professional" title="Professional Details">
          <Card data-aos="fade-up" className="mb-4">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="title">
                      <Form.Label>Professional Title</Form.Label>
                      <Form.Control type="text" defaultValue="Professor of Computer Science" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="department">
                      <Form.Label>Department</Form.Label>
                      <Form.Control type="text" defaultValue={user.department} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="institution">
                      <Form.Label>Institution</Form.Label>
                      <Form.Control type="text" defaultValue="University of Technology" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="yearsTeaching">
                      <Form.Label>Years of Teaching Experience</Form.Label>
                      <Form.Control type="number" defaultValue="10" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="expertise" className="mb-3">
                  <Form.Label>Areas of Expertise</Form.Label>
                  <Form.Control type="text" defaultValue={user.expertise.join(', ')} />
                </Form.Group>
                <Form.Group controlId="researchInterests" className="mb-3">
                  <Form.Label>Research Interests</Form.Label>
                  <Form.Control as="textarea" rows={3} defaultValue="Deep learning applications in healthcare, natural language processing, and computer vision." />
                </Form.Group>
                <Form.Group controlId="publications" className="mb-3">
                  <Form.Label>Selected Publications</Form.Label>
                  <Form.Control as="textarea" rows={5} defaultValue={`Chen, R., et al. (2023). 'Advances in Neural Networks for Medical Imaging.' Journal of AI in Medicine, 45(2), 112-128.

Chen, R., & Smith, J. (2022). 'Transformer Models for Educational Content Generation.' Conference on AI in Education, 78-92.`} />
                </Form.Group>
                <Button variant="primary">Save Professional Details</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="education" title="Education & Experience">
          <Card data-aos="fade-up" className="mb-4">
            <Card.Body>
              <h5>Education</h5>
              {user.education.map((edu, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>{edu.degree}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {edu.institution}, {edu.year}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
              <h5 className="mt-4">Work Experience</h5>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Associate Professor</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">University of Technology, 2020 - Present</Card.Subtitle>
                  <Card.Text>
                    Teaching advanced courses in machine learning and artificial intelligence. Leading research projects in collaboration with industry partners.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Assistant Professor</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">State University, 2015 - 2020</Card.Subtitle>
                  <Card.Text>
                    Taught undergraduate and graduate courses in computer science. Conducted research in machine learning algorithms and applications.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Form.Group controlId="certifications" className="mb-3">
                <Form.Label>Certifications & Awards</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={`- Outstanding Educator Award, University of Technology, 2022
- Certified Machine Learning Engineer, 2019
- Best Paper Award, International Conference on AI, 2018`} />
              </Form.Group>
              <Button variant="primary">Save Education & Experience</Button>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Profile;
