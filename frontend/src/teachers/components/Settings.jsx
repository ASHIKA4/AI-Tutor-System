import React, { useEffect } from 'react';
import {
  Tabs,
  Tab,
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Settings() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Container className="my-5">
      <h1 className="mb-4" data-aos="fade-down">Settings</h1>
      <Tabs defaultActiveKey="account" id="settings-tabs" className="mb-3">
        <Tab eventKey="account" title="Account">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Account Settings</Card.Title>
              <Form>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Row>
                    <Col md={8}>
                      <Form.Control type="email" defaultValue="rebecca.chen@example.com" readOnly />
                    </Col>
                    <Col md={4}>
                      <Button variant="outline-primary">Verify</Button>
                    </Col>
                  </Row>
                  <Form.Text className="text-muted">
                    Your email is used for important account notifications.
                  </Form.Text>
                </Form.Group>

                <hr />

                <h5>Change Password</h5>
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary" className="mt-3">Update Password</Button>

                <hr />

                <h5>Two-Factor Authentication</h5>
                <Form.Check 
                  type="switch"
                  id="2fa-switch"
                  label="Enable Two-Factor Authentication"
                />
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="notifications" title="Notifications">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Notification Preferences</Card.Title>
              <Form>
                <h5>Email Notifications</h5>
                <Form.Check 
                  type="switch"
                  id="student-enrollments"
                  label="Student Enrollments"
                  defaultChecked
                />
                <Form.Check 
                  type="switch"
                  id="assignment-submissions"
                  label="Assignment Submissions"
                  defaultChecked
                />
                <Form.Check 
                  type="switch"
                  id="quiz-completions"
                  label="Quiz Completions"
                  defaultChecked
                />
                <Form.Check 
                  type="switch"
                  id="student-messages"
                  label="Student Messages"
                  defaultChecked
                />

                <hr />

                <h5>System Notifications</h5>
                <Form.Check 
                  type="switch"
                  id="browser-notifications"
                  label="Browser Notifications"
                />
                <Form.Check 
                  type="switch"
                  id="mobile-notifications"
                  label="Mobile Notifications"
                  defaultChecked
                />

                <hr />

                <h5>Notification Frequency</h5>
                <Form.Group controlId="notificationFrequency">
                  <Form.Label>Email Digest Frequency</Form.Label>
                  <Form.Select defaultValue="daily">
                    <option value="realtime">Real-time</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" className="mt-3">Save Notification Preferences</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="appearance" title="Appearance">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Appearance Settings</Card.Title>
              <Form>
                <h5>Theme</h5>
                <Form.Check 
                  type="radio"
                  label="Light"
                  name="theme"
                  id="theme-light"
                  defaultChecked
                />
                <Form.Check 
                  type="radio"
                  label="Dark"
                  name="theme"
                  id="theme-dark"
                />
                <Form.Check 
                  type="radio"
                  label="System"
                  name="theme"
                  id="theme-system"
                />

                <hr />

                <h5>Dashboard Layout</h5>
                <Form.Group controlId="dashboardLayout">
                  <Form.Label>Default Dashboard View</Form.Label>
                  <Form.Select defaultValue="cards">
                    <option value="cards">Card View</option>
                    <option value="list">List View</option>
                    <option value="compact">Compact View</option>
                  </Form.Select>
                </Form.Group>

                <hr />

                <h5>Accessibility</h5>
                <Form.Check 
                  type="switch"
                  id="reduced-motion"
                  label="Reduced Motion"
                />
                <Form.Check 
                  type="switch"
                  id="high-contrast"
                  label="High Contrast"
                />

                <Button variant="primary" className="mt-3">Save Appearance Settings</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="advanced" title="Advanced">
          <Card data-aos="fade-up">
            <Card.Body>
              <Card.Title>Advanced Settings</Card.Title>
              <Form>
                <h5>Language & Region</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="languageSelect">
                      <Form.Label>Language</Form.Label>
                      <Form.Select defaultValue="en">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="timezoneSelect">
                      <Form.Label>Timezone</Form.Label>
                      <Form.Select defaultValue="America/New_York">
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                <h5>Data & Privacy</h5>
                <Form.Check 
                  type="switch"
                  id="usage-analytics"
                  label="Usage Analytics"
                  defaultChecked
                />
                <Button variant="outline-secondary" className="me-2">Manage Cookie Preferences</Button>
                <Button variant="outline-secondary">Export Your Data</Button>

                <hr />

                <h5>API Access</h5>
                <Form.Group controlId="apiKey">
                  <Form.Label>API Key</Form.Label>
                  <Form.Control type="password" defaultValue="••••••••••••••••" readOnly />
                  <Button variant="outline-primary" className="mt-2">Regenerate</Button>
                </Form.Group>
                <Form.Check 
                  type="switch"
                  id="api-access"
                  label="Enable API Access"
                />

                <Button variant="primary" className="mt-3">Save Advanced Settings</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Settings;
