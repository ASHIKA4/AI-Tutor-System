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
  Alert,
} from 'react-bootstrap';
import { Send, Image, Paperclip, Cpu } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/AskAI.css';

export default function AskAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI tutor. Ask me any questions about your courses or learning materials.",
    },
  ]);
  const [history, setHistory] = useState([
    { id: 1, question: 'Explain supervised learning algorithms', date: 'Apr 10, 2025' },
    { id: 2, question: "What's the difference between CNN and RNN?", date: 'Apr  8, 2025' },
    { id: 3, question: 'Help me understand Big O notation', date: 'Apr  5, 2025' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "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";
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      setError('Please enter your OpenAI API key in the settings');
      return;
    }

    const question = input.trim();
    const userMessage = { role: 'user', content: question };
  
    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) => [
      { id: Date.now(), question, date: 'Just now' },
      ...prev,
    ]);
    setInput('');
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })), 
          userMessage],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const aiMessage = { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error?.message || 'Failed to get response from AI');
      }
    } catch (error) {
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setError('API key saved successfully!');
    setTimeout(() => setError(null), 3000);
  };

  return (
    <Container fluid className="askai-container py-4">
      <h1 className="mb-4 text-center" data-aos="fade-down">
        AI Doubt Solver
      </h1>

      {/* API Key Input - Only show if not already set */}
      

      <Row>
        {/* Chat Column */}
        <Col lg={8} data-aos="fade-right">
          <Card className="chat-card d-flex flex-column h-100">
            <Card.Body className="chat-body overflow-auto px-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div className={`chat-bubble ${msg.role}`}>
                    <span>{msg.content}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="d-flex mb-3 justify-content-start">
                  <div className="chat-bubble assistant typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </Card.Body>

            <Card.Footer className="py-3">
              {error && <Alert variant="danger" className="mb-3 py-2">{error}</Alert>}
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
                    disabled={isLoading || !apiKey}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!input.trim() || isLoading || !apiKey}
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
                      setInput('Explain the difference between supervised and unsupervised learning')
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