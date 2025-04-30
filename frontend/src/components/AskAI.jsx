import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Send, Image, Paperclip, Cpu, MessageCircle } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AskAI.css';

export default function AskAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content:
        "Hello! I'm your AI tutor. Ask me any questions about your courses or learning materials.",
    },
  ]);
  const [history, setHistory] = useState([
    { id: 1, question: 'Explain supervised learning algorithms', date: 'Apr 10, 2025' },
    { id: 2, question: "What's the difference between CNN and RNN?", date: 'Apr  8, 2025' },
    { id: 3, question: 'Help me understand Big O notation', date: 'Apr  5, 2025' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setHistory((h) => [
      { id: Date.now(), question: input.trim(), date: 'Just now' },
      ...h,
    ]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        role: 'ai',
        content:
          "I'd be happy to help! Here's a detailed explanation with examples to clarify the concept.",
      };
      setMessages((m) => [...m, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Container fluid className="askai-container py-4">
      <h1 className="mb-4 text-center" data-aos="fade-down">
        AI Doubt Solver
      </h1>

      <Row>
        {/* Chat Column */}
        <Col lg={8} data-aos="fade-right">
          <Card className="chat-card d-flex flex-column h-100">
            <Card.Body className="chat-body overflow-auto px-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'
                    }`}
                >
                  <div className={`chat-bubble ${msg.role}`}>
                    <span>{msg.content}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="d-flex mb-3 justify-content-start">
                  <div className="chat-bubble ai typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </Card.Body>

            <Card.Footer className="py-3">
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Button variant="outline-secondary">
                    <Paperclip size={16} />
                  </Button>
                  <Button variant="outline-secondary">
                    <Image size={16} />
                  </Button>
                  <Form.Control
                    placeholder="Ask anything about your courses..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!input.trim() || isLoading}
                  >
                    <Send size={16} />
                  </Button>
                </InputGroup>
              </Form>
            </Card.Footer>
          </Card>
        </Col>

        {/* History / Suggestions Column */}
        <Col lg={4} className="mt-4 mt-lg-0" data-aos="fade-left">
          <Tabs defaultActiveKey="history" id="askai-tabs" className="mb-3">
            <Tab eventKey="history" title="History">
              <Card className="history-card">
                <Card.Body>
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="history-item mb-2 p-2 rounded"
                      onClick={() => setInput(item.question)}
                    >
                      <div className="fw-medium">{item.question}</div>
                      <small className="text-muted">{item.date}</small>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="suggestions" title="Suggestions">
              <Card className="suggestions-card">
                <Card.Body className="d-grid gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setInput(
                        'Explain the difference between supervised and unsupervised learning'
                      )
                    }
                  >
                    <Cpu size={16} className="me-2" />
                    Supervised vs Unsupervised
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setInput('How do neural networks work?')}
                  >
                    <Cpu size={16} className="me-2" />
                    Neural Networks
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setInput('Explain Big O notation with examples')}
                  >
                    <Cpu size={16} className="me-2" />
                    Big O Notation
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setInput('What are the best practices for clean code?')}
                  >
                    <Cpu size={16} className="me-2" />
                    Clean Code
                  </Button>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
