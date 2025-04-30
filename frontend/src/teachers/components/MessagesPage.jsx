import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Tab,
  Tabs,
  Badge,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const conversations = [
    {
      id: 1,
      name: 'John Smith',
      lastMessage: 'I have a question about the assignment',
      time: '10:30 AM',
      unread: true,
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Emily Johnson',
      lastMessage: 'Thanks for the feedback on my project',
      time: 'Yesterday',
      unread: false,
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  const messages = [
    {
      id: 1,
      conversationId: 1,
      sender: 'student',
      content: "I'm having trouble understanding gradient descent.",
      time: '10:15 AM',
    },
    {
      id: 2,
      conversationId: 1,
      sender: 'teacher',
      content: "No worries! Let's go over it together.",
      time: '10:20 AM',
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Deadline Extended',
      course: 'Machine Learning',
      date: 'Apr 25, 2025',
      content: 'Final project deadline extended to May 2nd.',
    },
    {
      id: 2,
      title: 'Guest Lecture',
      course: 'Data Structures',
      date: 'Apr 20, 2025',
      content: 'Join us for a guest lecture from Google engineer.',
    },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = messages.filter(
    (m) => m.conversationId === selectedConversation
  );

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      console.log('Send message:', newMessage);
      setNewMessage('');
    }
  };

  const handleSendAnnouncement = () => {
    if (newAnnouncementTitle.trim() && newAnnouncementContent.trim()) {
      console.log('New Announcement:', {
        title: newAnnouncementTitle,
        content: newAnnouncementContent,
      });
      setShowAnnouncementModal(false);
      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 data-aos="fade-down">Messages & Announcements</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShowAnnouncementModal(true)}>New Announcement</Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey="messages" className="mb-3">
        <Tab eventKey="messages" title="Messages">
          <Row>
            <Col md={4}>
              <Card data-aos="fade-right">
                <Card.Header>
                  <InputGroup>
                    <FormControl
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                </Card.Header>
                <Card.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  {filteredConversations.map((c) => (
                    <div
                      key={c.id}
                      className={`p-2 mb-2 rounded ${selectedConversation === c.id ? 'bg-light' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedConversation(c.id)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="rounded-circle me-3"
                          width="40"
                          height="40"
                        />
                        <div>
                          <strong>{c.name}</strong>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.875rem' }}>
                            {c.lastMessage}
                          </p>
                          {c.unread && <Badge bg="danger">New</Badge>}
                        </div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card data-aos="fade-left">
                <Card.Header>
                  <strong>{currentConversation?.name || 'Select a conversation'}</strong>
                </Card.Header>
                <Card.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {currentMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-3 d-flex ${msg.sender === 'teacher' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div
                        className={`p-2 rounded ${
                          msg.sender === 'teacher' ? 'bg-primary text-white' : 'bg-light'
                        }`}
                        style={{ maxWidth: '75%' }}
                      >
                        <p className="mb-1">{msg.content}</p>
                        <small className="text-muted">{msg.time}</small>
                      </div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <InputGroup>
                    <FormControl
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </InputGroup>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="announcements" title="Announcements">
          <Row className="mt-4">
            {announcements.map((a) => (
              <Col md={6} key={a.id} className="mb-4">
                <Card data-aos="fade-up">
                  <Card.Body>
                    <Card.Title>{a.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{a.course}</Card.Subtitle>
                    <Card.Text>{a.content}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Posted on {a.date}</small>
                      <div>
                        <Button variant="outline-secondary" size="sm" className="me-2">
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      {/* Announcement Modal */}
      <Modal show={showAnnouncementModal} onHide={() => setShowAnnouncementModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newAnnouncementTitle}
                onChange={(e) => setNewAnnouncementTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newAnnouncementContent}
                onChange={(e) => setNewAnnouncementContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAnnouncementModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendAnnouncement}>Post</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MessagesPage;
