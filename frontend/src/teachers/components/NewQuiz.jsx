import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Tabs,
  Tab,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'multiple-choice',
      text: 'Which of the following is NOT a type of machine learning?',
      options: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Reinforcement Learning',
        'Prescriptive Learning',
      ],
      correctAnswer: 'Prescriptive Learning',
      points: 10,
    },
    {
      id: 2,
      type: 'true-false',
      text: 'Neural networks are inspired by the human brain.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      points: 5,
    },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addQuestion = (type) => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const newQuestion = {
      id: newId,
      type: type,
      text: '',
      options: [],
      correctAnswer: '',
      points: 5,
    };

    if (type === 'multiple-choice') {
      newQuestion.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    } else if (type === 'true-false') {
      newQuestion.options = ['True', 'False'];
    }

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionId, optionIndex, value) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4" data-aos="fade-down">Create New Quiz</h1>
      <Tabs defaultActiveKey="details" id="quiz-tabs" className="mb-3">
        <Tab eventKey="details" title="Quiz Details">
          <Card data-aos="fade-up">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="quizTitle">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter quiz title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quizDescription">
                  <Form.Label>Quiz Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter quiz description" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="quizCourse">
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
                    <Form.Group className="mb-3" controlId="timeLimit">
                      <Form.Label>Time Limit (minutes)</Form.Label>
                      <Form.Control type="number" placeholder="15" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="passingScore">
                      <Form.Label>Passing Score (%)</Form.Label>
                      <Form.Control type="number" placeholder="70" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="attempts">
                      <Form.Label>Maximum Attempts</Form.Label>
                      <Form.Control type="number" placeholder="2" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="instructions">
                  <Form.Label>Instructions for Students</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter instructions" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => addQuestion('multiple-choice')} className="me-2">
              Add Multiple Choice
            </Button>
            <Button variant="secondary" onClick={() => addQuestion('true-false')}>
              Add True/False
            </Button>
          </div>
          {questions.map((question, index) => (
            <Card key={question.id} className="mb-3" data-aos="fade-up">
              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId={`questionType-${question.id}`}>
                      <Form.Label>Question Type</Form.Label>
                      <Form.Select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="short-answer">Short Answer</option>
                        <option value="essay">Essay</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`points-${question.id}`}>
                      <Form.Label>Points</Form.Label>
                      <Form.Control
                        type="number"
                        value={question.points}
                        onChange={(e) =>
                          updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId={`questionText-${question.id}`}>
                  <Form.Label>Question Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                  />
                </Form.Group>

                {question.type === 'multiple-choice' && (
                  <>
                    <Form.Label>Options</Form.Label>
                    {question.options.map((option, idx) => (
                      <InputGroup className="mb-2" key={idx}>
                        <InputGroup.Radio
                          name={`correctAnswer-${question.id}`}
                          checked={question.correctAnswer === option}
                          onChange={() => updateQuestion(question.id, 'correctAnswer', option)}
                        />
                        <FormControl
                          value={option}
                          onChange={(e) => updateOption(question.id, idx, e.target.value)}
                        />
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            const newOptions = [...question.options];
                            newOptions.splice(idx, 1);
                            updateQuestion(question.id, 'options', newOptions);
                          }}
                        >
                          Delete
                        </Button>
                      </InputGroup>
                    ))}
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        const newOptions = [...question.options, `Option ${question.options.length + 1}`];
                        updateQuestion(question.id, 'options', newOptions);
                      }}
                    >
                      Add Option
                    </Button>
                  </>
                )}

                {question.type === 'true-false' && (
                  <Form.Group className="mt-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Check
                      type="radio"
                      label="True"
                      name={`correctAnswer-${question.id}`}
                      checked={question.correctAnswer === 'True'}
                      onChange={() => updateQuestion(question.id, 'correctAnswer', 'True')}
                    />
                    <Form.Check
                      type="radio"
                      label="False"
                      name={`correctAnswer-${question.id}`}
                      checked={question.correctAnswer === 'False'}
                      onChange={() => updateQuestion(question.id, 'correctAnswer', 'False')}
                    />
                  </Form.Group>
                )}

                {question.type === 'short-answer' && (
                  <Form.Group className="mt-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                    />
                  </Form.Group>
                )}

                {question.type === 'essay' && (
                  <Form.Group className="mt-3">
                    <Form.Label>Grading Notes</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter grading notes" />
                  </Form.Group>
                )}

                <div className="d-flex justify-content-end mt-3">
                  <Button variant="danger" onClick={() => removeQuestion(question.id)}>
                    Remove Question
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Tab>

        <Tab eventKey="settings" title="Settings">
          <Card data-aos="fade-up">
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="publishQuiz"
                  label="Publish Quiz"
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="randomize"
                  label="Randomize Questions"
                  className="mb-3"
                  defaultChecked
                />
                <Form.Check
                  type="switch"
                  id="showResults"
                  label="Show Results Immediately"
                  className="mb-3"
                  defaultChecked
                />
                <Form.Check
                  type="switch"
                  id="showAnswers"
                  label="Show Correct Answers After Submission"
                  className="mb-3"
                />
                <Form.Check
                  type="switch"
                  id="enforceTimeLimit"
                  label="Enforce Time Limit"
                  className="mb-4"
                  defaultChecked
                />
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button variant="outline-secondary" className="me-2">Cancel</Button>
                  <Button variant="primary">Save Settings</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default NewQuiz;


