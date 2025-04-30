import React, { useState } from 'react';
import { Tabs, Tab, Card, Button, Form, Row, Col, Image } from 'react-bootstrap';
import '../styles/profile.css';

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const [key, setKey] = useState('profile');

  const user = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    joinDate: 'January 15, 2025',
    timezone: 'America/New_York',
    language: 'English',
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-4 profile-container" data-aos="fade-up">
      <h1 className="mb-4 text-primary">Profile & Settings</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 profile-tabs">
        <Tab eventKey="profile" title="Profile">
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Profile Information</Card.Title>
            <Card.Text>Update your personal information</Card.Text>
            <div className="text-center mb-4">
              <Image
                roundedCircle
                width={96}
                height={96}
                src={profileImage || '/placeholder.svg'}
                alt="avatar"
              />
              <div className="mt-3">
                <Form.Label htmlFor="profileUpload" className="btn btn-primary me-2">
                  Upload Photo
                </Form.Label>
                <Form.Control
                  id="profileUpload"
                  type="file"
                  className="d-none"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                {profileImage && (
                  <Button variant="outline-secondary" size="sm" onClick={() => setProfileImage(null)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control defaultValue="John" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control defaultValue="Smith" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control defaultValue="John Smith" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control defaultValue="Student passionate about machine learning and AI" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Timezone</Form.Label>
                  <Form.Select defaultValue={user.timezone}>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Preferred Language</Form.Label>
                  <Form.Select defaultValue={user.language}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary">
              <i className="bi bi-save me-2"></i>Save Changes
            </Button>
          </Card>
        </Tab>

        <Tab eventKey="account" title="Account">
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Account Settings</Card.Title>
            <Card.Text>Manage your account details and security</Card.Text>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control type="email" defaultValue={user.email} readOnly />
                <Button variant="outline-secondary">Verify</Button>
              </div>
            </Form.Group>

            <hr />

            <h5>Change Password</h5>
            <Form.Group className="mb-2">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button>Update Password</Button>

            <hr />

            <h5 className="text-danger">Danger Zone</h5>
            <p className="text-muted">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="danger">Delete Account</Button>
          </Card>
        </Tab>

        <Tab eventKey="notifications" title="Notifications">
          <Card className="p-4 shadow-sm mb-4">
            <Card.Title>Notification Preferences</Card.Title>
            <Card.Text>Manage how you receive notifications</Card.Text>

            <h5>Email Notifications</h5>
            {['Course Updates', 'Assignment Reminders', 'Feedback Notifications', 'Discussion Replies'].map((label, i) => (
              <Form.Check
                type="switch"
                key={i}
                label={label}
                className="mb-2"
                defaultChecked
              />
            ))}

            <hr />
            <h5>System Notifications</h5>
            <Form.Check type="switch" label="Browser Notifications" />
            <Form.Check type="switch" label="Mobile Notifications" defaultChecked />

            <hr />
            <h5>Marketing Communications</h5>
            <Form.Check type="switch" label="Promotional Emails" />
            <Form.Check type="switch" label="Newsletter" defaultChecked />

            <div className="mt-3">
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
