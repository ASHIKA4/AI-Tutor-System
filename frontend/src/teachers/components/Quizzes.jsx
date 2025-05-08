import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchQuizzes();
    fetchCourses();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const teacherId = localStorage.getItem("teacheruserId");
      const response = await axios.get(
        `http://127.0.0.1:8000/quizzes/?teacher_id=${teacherId}`
      );
      setQuizzes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const teacherId = localStorage.getItem("teacheruserId");
      const response = await axios.get(
        `http://127.0.0.1:8000/courses/?teacher=${teacherId}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCourse =
      courseFilter === "all" || quiz.course.id.toString() === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Quiz Management</h2>
        </Col>
        <Col className="text-end">
          <Link to="/teacher/newquiz">
            <Button variant="outline-primary">
              <FaPlus className="me-2" />
              Create Quiz
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="courseFilter">
            <Form.Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Card data-aos="fade-up">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">Loading quizzes...</div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Course</th>
                  <th>Questions</th>
                  <th>Time Limit (min)</th>
                  <th>Created At</th>
                  <th className="text-end">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.title}</td>
                    <td>{quiz.course.title}</td>
                    <td>{quiz.questions.length}</td>
                    <td>{quiz.time_limit}</td>
                    <td>{formatDate(quiz.created_at)}</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewQuiz(quiz)}
                      >
                        <FaEye className="me-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Quiz Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedQuiz?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuiz && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <p>
                    <strong>Course:</strong> {selectedQuiz.course.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedQuiz.description}
                  </p>
                  <p>
                    <strong>Time Limit:</strong> {selectedQuiz.time_limit}{" "}
                    minutes
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Passing Score:</strong> {selectedQuiz.passing_score}
                    %
                  </p>
                  <p>
                    <strong>Max Attempts:</strong> {selectedQuiz.max_attempts}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {formatDate(selectedQuiz.created_at)}
                  </p>
                </Col>
              </Row>

              <h5 className="mb-3">
                Questions ({selectedQuiz.questions.length})
              </h5>
              {selectedQuiz.questions.map((question, qIndex) => (
                <Card key={question.id} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>
                        Q{qIndex + 1}: {question.text}
                      </strong>
                      <span className="badge bg-primary">
                        {question.points} pts
                      </span>
                    </div>
                    <div>
                      {question.type === "multiple-choice" && (
                        <ul className="list-unstyled">
                          {question.options.map((option, oIndex) => (
                            <li
                              key={oIndex}
                              className={
                                option.is_correct ? "text-success fw-bold" : ""
                              }
                            >
                              {String.fromCharCode(65 + oIndex)}. {option.text}
                              {option.is_correct && " (Correct)"}
                            </li>
                          ))}
                        </ul>
                      )}
                      {question.type === "true-false" && (
                        <ul className="list-unstyled">
                          {question.options.map((option, oIndex) => (
                            <li
                              key={oIndex}
                              className={
                                option.is_correct ? "text-success fw-bold" : ""
                              }
                            >
                              {option.text}
                              {option.is_correct && " (Correct)"}
                            </li>
                          ))}
                        </ul>
                      )}
                      {question.type === "short-answer" && (
                        <div className="text-success fw-bold">
                          Correct answer:{" "}
                          {question.options.find((o) => o.is_correct)?.text}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Quizzes;
