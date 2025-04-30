
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button, Card, ProgressBar, Nav, Tab } from "react-bootstrap"
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, FileText, Video, MessageSquare } from "lucide-react"
import '../styles/LessonPage.css'
import { useLocation } from 'react-router-dom'



export default function LessonPage() {
    const params = useParams()
    const location = useLocation()
    const courseFromState = location.state?.course
    const [completed, setCompleted] = useState(false)
  
    const course = {
      id: Number.parseInt(params.courseId),
      title: "Introduction to Machine Learning",
      progress: 65,
      totalLessons: 12,
    }
  
  const lesson = {
    id: Number.parseInt(params.lessonId),
    title: "Supervised Learning Algorithms",
    description: "Learn about the most common supervised learning algorithms and their applications.",
    content: `
      <h2>Supervised Learning Algorithms</h2>
      <p>Supervised learning is a type of machine learning where the algorithm learns from labeled training data...</p>
      <h3>Common Supervised Learning Algorithms</h3>
      <ul>
        <li><strong>Linear Regression</strong>: Used for predicting a continuous value.</li>
        <li><strong>Logistic Regression</strong>: Used for binary classification problems.</li>
      </ul>
    `,
    videoUrl: "https://example.com/video.mp4",
    resources: [
      { title: "Supervised Learning Cheat Sheet", type: "pdf", url: "#" },
      { title: "Linear Regression Example", type: "notebook", url: "#" },
      { title: "Decision Trees Visualization", type: "interactive", url: "#" },
    ],
  }

  const nextLessonId = lesson.id + 1
  const prevLessonId = lesson.id - 1

  const handleMarkComplete = () => {
    setCompleted(true)
  }

  return (
    <div className="container my-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2>{lesson.title}</h2>
          <small className="text-muted">
            {course.title} • Lesson {params.lessonId} of {course.totalLessons}
          </small>
        </div>
        <div className="mt-3 mt-md-0">
          {lesson.id > 1 && (
            <Link to={`/student/course/${params.courseId}/lesson/${prevLessonId}`}>
              <Button variant="outline-secondary" className="me-2">
                <ChevronLeft size={16} /> Previous
              </Button>
            </Link>
          )}
          {lesson.id < course.totalLessons && (
            <Link to={`/student/course/${params.courseId}/lesson/${nextLessonId}`}>
              <Button variant="outline-secondary">
                Next <ChevronRight size={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>

     <ProgressBar
  now={course.progress}label={`${course.progress}%`}style={{ height: '20px', borderRadius: '10px' }}/>


      <div className="row">
        <div className="col-lg-8">
          <Tab.Container defaultActiveKey="content">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="content">
                  <FileText size={16} className="me-1" /> Content
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="video">
                  <Video size={16} className="me-1" /> Video
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="discussion">
                  <MessageSquare size={16} className="me-1" /> Discussion
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="content">
                <Card>
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} className="lesson-content" />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="video">
                <Card>
                  <Card.Body className="d-flex justify-content-center align-items-center aspect-ratio-box">
                    <Video size={40} className="text-muted me-2" />
                    <span>Video player would be here</span>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="discussion">
                <Card>
                  <Card.Body className="text-center py-5">
                    <MessageSquare size={40} className="text-muted mb-3" />
                    <h5>Join the discussion</h5>
                    <p className="text-muted">Ask questions and discuss with peers and instructors.</p>
                    <Button>Start a discussion</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <Card className="mb-4">
            <Card.Header>Lesson Progress</Card.Header>
            <Card.Body>
              <Button onClick={handleMarkComplete} disabled={completed} className="w-100">
                {completed ? (
                  <>
                    <CheckCircle size={16} className="me-2" /> Completed
                  </>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Resources</Card.Header>
            <Card.Body>
              {lesson.resources.map((res, i) => (
                <div key={i}>
                  <a href={res.url} className="d-flex align-items-center py-2 text-decoration-none text-dark hover-link">
                    {res.type === "pdf" ? (
                      <FileText size={16} className="me-2" />
                    ) : res.type === "notebook" ? (
                      <BookOpen size={16} className="me-2" />
                    ) : (
                      <Video size={16} className="me-2" />
                    )}
                    {res.title}
                  </a>
                  {i < lesson.resources.length - 1 && <hr className="my-2" />}
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Need Help?</Card.Header>
            <Card.Body>
              <Link to="/student/ask-ai">
                <Button variant="outline-secondary" className="w-100 mb-2 text-start">
                  <MessageSquare size={16} className="me-2" /> Ask AI Tutor
                </Button>
              </Link>
              <Button variant="outline-secondary" className="w-100 text-start">
                <MessageSquare size={16} className="me-2" /> Contact Instructor
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
