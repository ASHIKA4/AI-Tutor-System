import React, { useState, useEffect } from "react";
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
  FormControl,
  Alert,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      text: "Which of the following is NOT a type of machine learning?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Prescriptive Learning",
      ],
      correctAnswer: "Prescriptive Learning",
      points: 10,
    },
    {
      id: 2,
      type: "true-false",
      text: "Neural networks are inspired by the human brain.",
      options: ["True", "False"],
      correctAnswer: "True",
      points: 5,
    },
  ]);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    course_id: "",
    time_limit: 15,
    passing_score: 70,
    max_attempts: 2,
    instructions: "",
    is_published: false,
    randomize_questions: true,
    show_results: true,
    show_answers: false,
    enforce_time_limit: true,
    start_date: "",
    end_date: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchCourses = async () => {
      try {
        const teacherId = localStorage.getItem("teacheruserId");
        const response = await axios.get(
          `http://127.0.0.1:8000/courses/?teacher=${teacherId}`
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleQuizChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addQuestion = (type) => {
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const newQuestion = {
      id: newId,
      type: type,
      text: "",
      options: [],
      correctAnswer: "",
      points: 5,
    };

    if (type === "multiple-choice") {
      newQuestion.options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    } else if (type === "true-false") {
      newQuestion.options = ["True", "False"];
    }

    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };
  const resetForm = () => {
    setQuizData(initialQuizData);
    setQuestions(initialQuestions);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const teacherId = localStorage.getItem("teacheruserId");
      const quizPayload = {
        ...quizData,
        teacher_id: teacherId,
        questions: questions.map((question) => {
          const baseQuestion = {
            type: question.type,
            text: question.text,
            points: question.points,
          };

          if (
            question.type === "multiple-choice" ||
            question.type === "true-false"
          ) {
            return {
              ...baseQuestion,
              options: question.options.map((option) => ({
                text: option,
                is_correct: option === question.correctAnswer,
              })),
            };
          } else {
            return {
              ...baseQuestion,
              options: [
                {
                  text: question.correctAnswer,
                  is_correct: true,
                },
              ],
            };
          }
        }),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/quizzes/",
        quizPayload
      );
      toast.success("Quiz created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      resetForm();

      setAlert({
        show: true,
        message: "Quiz created successfully!",
        variant: "success",
      });

      // Reset form if needed
      // setQuizData({...initialState});
      // setQuestions([]);
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAlert({
        show: true,
        message: "Failed to create quiz. Please try again.",
        variant: "danger",
      });
    }
  };

  return (
    <Container className="my-4">
      <ToastContainer />
      <h1 className="mb-4" data-aos="fade-down">
        Create New Quiz
      </h1>

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Tabs defaultActiveKey="details" id="quiz-tabs" className="mb-3">
        <Tab eventKey="details" title="Quiz Details">
          <Card data-aos="fade-up">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="quizTitle">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quiz title"
                    name="title"
                    value={quizData.title}
                    onChange={handleQuizChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quizDescription">
                  <Form.Label>Quiz Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter quiz description"
                    name="description"
                    value={quizData.description}
                    onChange={handleQuizChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="quizCourse">
                      <Form.Label>Course</Form.Label>
                      {loading ? (
                        <Form.Control as="select" disabled>
                          <option>Loading courses...</option>
                        </Form.Control>
                      ) : (
                        <Form.Select
                          name="course_id"
                          value={quizData.course_id}
                          onChange={handleQuizChange}
                          required
                        >
                          <option value="">Select course</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.title}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="timeLimit">
                      <Form.Label>Time Limit (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="15"
                        name="time_limit"
                        value={quizData.time_limit}
                        onChange={handleQuizChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="passingScore">
                      <Form.Label>Passing Score (%)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="70"
                        name="passing_score"
                        value={quizData.passing_score}
                        onChange={handleQuizChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="attempts">
                      <Form.Label>Maximum Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="2"
                        name="max_attempts"
                        value={quizData.max_attempts}
                        onChange={handleQuizChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="instructions">
                  <Form.Label>Instructions for Students</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter instructions"
                    name="instructions"
                    value={quizData.instructions}
                    onChange={handleQuizChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="isPublished">
                  <Form.Check
                    type="checkbox"
                    label="Publish Quiz"
                    name="is_published"
                    checked={quizData.is_published}
                    onChange={handleQuizChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="start_date"
                        value={quizData.start_date}
                        onChange={handleQuizChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="end_date"
                        value={quizData.end_date}
                        onChange={handleQuizChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit">
                    Create Quiz
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="primary"
              onClick={() => addQuestion("multiple-choice")}
              className="me-2"
            >
              Add Multiple Choice
            </Button>
            <Button
              variant="secondary"
              onClick={() => addQuestion("true-false")}
            >
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
                        onChange={(e) =>
                          updateQuestion(question.id, "type", e.target.value)
                        }
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
                          updateQuestion(
                            question.id,
                            "points",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId={`questionText-${question.id}`}
                >
                  <Form.Label>Question Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={question.text}
                    onChange={(e) =>
                      updateQuestion(question.id, "text", e.target.value)
                    }
                  />
                </Form.Group>

                {question.type === "multiple-choice" && (
                  <>
                    <Form.Label>Options</Form.Label>
                    {question.options.map((option, idx) => (
                      <InputGroup className="mb-2" key={idx}>
                        <InputGroup.Radio
                          name={`correctAnswer-${question.id}`}
                          checked={question.correctAnswer === option}
                          onChange={() =>
                            updateQuestion(question.id, "correctAnswer", option)
                          }
                        />
                        <FormControl
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, idx, e.target.value)
                          }
                        />
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            const newOptions = [...question.options];
                            newOptions.splice(idx, 1);
                            updateQuestion(question.id, "options", newOptions);
                          }}
                        >
                          Delete
                        </Button>
                      </InputGroup>
                    ))}
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        const newOptions = [
                          ...question.options,
                          `Option ${question.options.length + 1}`,
                        ];
                        updateQuestion(question.id, "options", newOptions);
                      }}
                    >
                      Add Option
                    </Button>
                  </>
                )}

                {question.type === "true-false" && (
                  <Form.Group className="mt-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Check
                      type="radio"
                      label="True"
                      name={`correctAnswer-${question.id}`}
                      checked={question.correctAnswer === "True"}
                      onChange={() =>
                        updateQuestion(question.id, "correctAnswer", "True")
                      }
                    />
                    <Form.Check
                      type="radio"
                      label="False"
                      name={`correctAnswer-${question.id}`}
                      checked={question.correctAnswer === "False"}
                      onChange={() =>
                        updateQuestion(question.id, "correctAnswer", "False")
                      }
                    />
                  </Form.Group>
                )}

                {question.type === "short-answer" && (
                  <Form.Group className="mt-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(
                          question.id,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                )}

                {question.type === "essay" && (
                  <Form.Group className="mt-3">
                    <Form.Label>Grading Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Enter grading notes"
                    />
                  </Form.Group>
                )}
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="danger"
                    onClick={() => removeQuestion(question.id)}
                  >
                    Remove Question
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default NewQuiz;
