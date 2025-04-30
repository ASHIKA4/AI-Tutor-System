import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Form,
  Modal
} from 'react-bootstrap';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/QuizPage.css';

export default function QuizPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const quiz = {
    title: 'Machine Learning Fundamentals',
    course: 'Introduction to Machine Learning',
    timeLimit: '15 minutes',
    questions: [
      {
        question: 'Which of the following is NOT a type of machine learning?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Prescriptive Learning'],
        correct: 'Prescriptive Learning',
        explanation:
          'Prescriptive Learning is not a type of machine learning. The three main types are Supervised, Unsupervised, and Reinforcement Learning.'
      },
      {
        question: 'Which algorithm is commonly used for classification problems?',
        options: ['Linear Regression', 'K‑Means', 'Random Forest', 'PCA'],
        correct: 'Random Forest',
        explanation:
          'Random Forest is a popular classification algorithm. It’s an ensemble of decision trees that reduces overfitting.'
      },
      {
        question: 'What is the purpose of the activation function in a neural network?',
        options: ['Initialize weights', 'Introduce non‑linearity', 'Normalize data', 'Prevent overfitting'],
        correct: 'Introduce non‑linearity',
        explanation:
          'Activation functions add non‑linearity so networks can learn complex patterns rather than just linear models.'
      },
      {
        question: "What does 'overfitting' refer to?",
        options: [
          'Model good on train but poor on new data',
          'Model too complex to implement',
          'Model needs too much compute',
          'Model trained on too many examples'
        ],
        correct: 'Model good on train but poor on new data',
        explanation:
          'Overfitting means the model has memorized noise in training data and fails to generalize.'
      },
      {
        question: 'Which technique prevents overfitting?',
        options: ['Increase complexity', 'Regularization', 'Use more features', 'Skip validation'],
        correct: 'Regularization',
        explanation:
          'Regularization adds a penalty to large weights, discouraging overly complex models.'
      }
    ]
  };

  const total = quiz.questions.length;
  const answeredCount = Object.keys(selected).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  const handleSelect = (idx, opt) => {
    setSelected({ ...selected, [idx]: opt });
  };

  const next = () => {
    if (currentQuestion < total - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const prev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const score = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (selected[i] === q.correct) correct++;
    });
    return {
      correct,
      total,
      percent: Math.round((correct / total) * 100)
    };
  };

  const { correct, percent } = score();

  return (
    <Container fluid className="quiz-page py-4">
      <Row className="align-items-center mb-4" data-aos="fade-down">
        <Col md={8}>
          <h1 className="quiz-title">{quiz.title}</h1>
          <p className="text-secondary">{quiz.course}</p>
        </Col>
        <Col md={4} className="text-md-end">
          <Clock className="me-2 text-secondary" /> {quiz.timeLimit}
        </Col>
      </Row>

      <Card className="mb-4" data-aos="fade-up">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <strong>
              Question {currentQuestion + 1} / {total}
            </strong>
            <div className="text-muted small">Select the best answer below</div>
          </div>
          <div className="d-flex align-items-center">
            <ProgressBar
              now={progressPercent}
              label={`${progressPercent}%`}
              style={{ width: '150px', height: '10px' }}
              className="me-2"
            />
            <small>{answeredCount}/{total}</small>
          </div>
        </Card.Header>

        <Card.Body>
          <h5 className="question-text mb-4">
            {quiz.questions[currentQuestion].question}
          </h5>
          <Form>
            {quiz.questions[currentQuestion].options.map((opt, i) => (
              <Form.Check
                key={i}
                type="radio"
                id={`opt-${currentQuestion}-${i}`}
                name={`q-${currentQuestion}`}
                label={opt}
                className="option-item mb-2"
                checked={selected[currentQuestion] === opt}
                onChange={() => handleSelect(currentQuestion, opt)}
              />
            ))}
          </Form>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={prev} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={next}
            disabled={!selected[currentQuestion]}
          >
            {currentQuestion < total - 1 ? (
              <>
                Next <ArrowRight className="ms-1" size={16} />
              </>
            ) : (
              'Submit Quiz'
            )}
          </Button>
        </Card.Footer>
      </Card>

      {/* Submission Modal */}
      <Modal show={showSubmitModal} centered onHide={() => setShowSubmitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Completed!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="score-circle mb-3">{percent}%</div>
          <p>
            You got <strong>{correct}</strong> out of <strong>{total}</strong> correct
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => {
              setShowSubmitModal(false);
              setShowResults(true);
            }}
          >
            View Detailed Results
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detailed Results */}
      {showResults && (
        <Card className="mt-4" data-aos="fade-up">
          <Card.Header>
            <h4>Quiz Results</h4>
            <div className="text-muted small">Review your answers and explanations</div>
          </Card.Header>
          <Card.Body>
            {quiz.questions.map((q, i) => (
              <div key={i} className="result-item mb-4">
                <div className="d-flex align-items-start mb-2">
                  {selected[i] === q.correct ? (
                    <CheckCircle size={20} className="me-2 text-success" />
                  ) : (
                    <XCircle size={20} className="me-2 text-danger" />
                  )}
                  <div>
                    <strong>Q{i + 1}:</strong> {q.question}
                  </div>
                </div>
                <p>Your answer:{" "}
                  <span className={selected[i] === q.correct ? 'text-success' : 'text-danger'}>
                    {selected[i] || '—'}
                  </span>
                </p>
                {selected[i] !== q.correct && (
                  <p>Correct: <span className="text-success">{q.correct}</span></p>
                )}
                <div className="explanation bg-light p-3 rounded">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => setShowResults(false)}
            >
              Back to Quiz
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}
