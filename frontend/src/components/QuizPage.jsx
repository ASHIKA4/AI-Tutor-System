import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Form,
  Modal,
  ListGroup,
  Badge,
  Spinner
} from 'react-bootstrap';
import { CheckCircle, XCircle, Clock, ArrowRight, Book, User } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/QuizPage.css';

const StudentQuizzes = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseQuizzes, setCourseQuizzes] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      const response = await axios.get(`http://127.0.0.1:8000/enroll/?student=${studentId}`);
      setEnrolledCourses(response.data);
      fetchQuizzesForCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      toast.error('Failed to load enrolled courses');
      setLoading(false);
    }
  };

  const fetchQuizzesForCourses = async (courses) => {
    try {
      const quizzesMap = {};
      for (const course of courses) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/quizzes/?course_id=${course.course.id}`);
          if (response.data.length > 0) {
            quizzesMap[course.course.id] = response.data;
          }
        } catch (error) {
          console.error(`Error fetching quizzes for course ${course.course.id}:`, error);
        }
      }
      setCourseQuizzes(quizzesMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to load quizzes');
      setLoading(false);
    }
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeLeft(quiz.time_limit * 60); // Convert minutes to seconds
    startTimer(quiz.time_limit * 60);
  };

  const startTimer = (seconds) => {
    if (timer) clearInterval(timer);
    
    const newTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(newTimer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  const handleAutoSubmit = () => {
    toast.warning('Time is up! Quiz auto-submitted');
    calculateScore();
    setShowSubmitModal(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelect = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return { correct: 0, total: 0, percent: 0 };
    
    let correct = 0;
    selectedQuiz.questions.forEach(question => {
      const correctOption = question.options.find(opt => opt.is_correct);
      if (selectedAnswers[question.id] === correctOption?.text) {
        correct++;
      }
    });
    
    return {
      correct,
      total: selectedQuiz.questions.length,
      percent: Math.round((correct / selectedQuiz.questions.length) * 100)
    };
  };

  const submitQuiz = () => {
    clearInterval(timer);
    const { correct, total, percent } = calculateScore();
    
    toast.success(`Quiz submitted! You scored ${correct}/${total} (${percent}%)`, {
      autoClose: 5000
    });
    
    setShowSubmitModal(false);
    setShowResults(true);
  };

  const closeQuiz = () => {
    clearInterval(timer);
    setSelectedQuiz(null);
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (selectedQuiz) {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const totalQuestions = selectedQuiz.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;
    const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
    const { correct, total, percent } = calculateScore();

    return (
      <Container fluid className="quiz-page py-4">
        <ToastContainer />
        <Row className="align-items-center mb-4" data-aos="fade-down">
          <Col md={8}>
            <h1 className="quiz-title">{selectedQuiz.title}</h1>
            <p className="text-secondary">
              <Book size={16} className="me-1" /> {selectedQuiz.course.title}
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <Clock className="me-2 text-secondary" /> Time Left: {formatTime(timeLeft)}
          </Col>
        </Row>

        <Card className="mb-4" data-aos="fade-up">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div>
              <strong>
                Question {currentQuestion + 1} / {totalQuestions}
              </strong>
              <div className="text-muted small">{currentQ.text}</div>
            </div>
            <div className="d-flex align-items-center">
              <ProgressBar
                now={progressPercent}
                label={`${progressPercent}%`}
                style={{ width: '150px', height: '10px' }}
                className="me-2"
              />
              <small>{answeredCount}/{totalQuestions}</small>
            </div>
          </Card.Header>

          <Card.Body>
            <Form>
              {currentQ.options.map((option, i) => (
                <Form.Check
                  key={option.id}
                  type="radio"
                  id={`opt-${currentQ.id}-${i}`}
                  name={`q-${currentQ.id}`}
                  label={option.text}
                  className="option-item mb-2"
                  checked={selectedAnswers[currentQ.id] === option.text}
                  onChange={() => handleSelect(currentQ.id, option.text)}
                />
              ))}
            </Form>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between">
            <Button variant="outline-secondary" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={nextQuestion}
              disabled={!selectedAnswers[currentQ.id]}
            >
              {currentQuestion < totalQuestions - 1 ? (
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
            <Modal.Title>Submit Quiz?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You've answered {answeredCount} out of {totalQuestions} questions.</p>
            <p>Are you sure you want to submit?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitQuiz}>
              Submit Quiz
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Detailed Results */}
        {showResults && (
          <Card className="mt-4" data-aos="fade-up">
            <Card.Header>
              <h4>Quiz Results</h4>
              <div className="d-flex justify-content-between">
                <div>
                  Score: <strong>{correct}/{total}</strong> ({percent}%)
                </div>
                <Button variant="outline-primary" size="sm" onClick={closeQuiz}>
                  Back to Quizzes
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {selectedQuiz.questions.map((question, i) => {
                const correctOption = question.options.find(opt => opt.is_correct);
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === correctOption?.text;
                
                return (
                  <div key={question.id} className="result-item mb-4">
                    <div className="d-flex align-items-start mb-2">
                      {isCorrect ? (
                        <CheckCircle size={20} className="me-2 text-success" />
                      ) : (
                        <XCircle size={20} className="me-2 text-danger" />
                      )}
                      <div>
                        <strong>Q{i + 1}:</strong> {question.text}
                      </div>
                    </div>
                    <p>Your answer:{" "}
                      <span className={isCorrect ? 'text-success' : 'text-danger'}>
                        {userAnswer || '—'}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p>Correct: <span className="text-success">{correctOption?.text}</span></p>
                    )}
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        )}
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <ToastContainer />
      <Row className="mb-4">
        <Col>
          <h2>Available Quizzes</h2>
          <p className="text-muted">Select a quiz to attempt</p>
        </Col>
      </Row>

      {Object.keys(courseQuizzes).length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <Book size={48} className="text-muted mb-3" />
            <h4>No quizzes available</h4>
            <p className="text-muted">There are currently no quizzes for your enrolled courses</p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {Object.entries(courseQuizzes).map(([courseId, quizzes]) => {
            const course = enrolledCourses.find(c => c.course.id.toString() === courseId)?.course;
            return (
              <Col key={courseId} md={6} className="mb-4">
                <Card data-aos="fade-up">
                  <Card.Header>
                    <h5>
                      <Book className="me-2" size={20} />
                      {course?.title}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {quizzes.map(quiz => (
                        <ListGroup.Item key={quiz.id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>{quiz.title}</h6>
                            <div className="text-muted small">
                              <User size={14} className="me-1" />
                              {quiz.teacher.username} • {quiz.time_limit} min • {quiz.questions.length} questions
                            </div>
                          </div>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => startQuiz(quiz)}
                          >
                            Attempt Quiz
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default StudentQuizzes;