import { useEffect, useState } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { Button, Card, ProgressBar, Nav, Tab } from "react-bootstrap"
import {
  ChevronLeft, ChevronRight, CheckCircle, FileText, Video, MessageSquare
} from "lucide-react"
import axios from "axios"
import "../styles/LessonPage.css"

export default function LessonPage() {
  const params = useParams()
  const location = useLocation()
  const course = location.state?.course
  const [completed, setCompleted] = useState(false)
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [activeTab, setActiveTab] = useState("content")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const courseId = course.course_id

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://127.0.0.1:8000/modules/?course=${courseId}`)
        const datas = response.data
        setModules(datas)
        if (datas.length > 0 && !selectedModule) {
          setSelectedModule(datas[0])
        }
      } catch (error) {
        console.error("Error fetching modules:", error)
        setError("Failed to load course modules")
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchModules()
    }
  }, [courseId])

  const handleModuleClick = (module) => {
    setSelectedModule(module)
    setActiveTab(module.video_url ? "video" : "content")
  }

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const lesson = {
    id: Number.parseInt(params.lessonId),
    title: course.title,
    description: "Learn about the most common supervised learning algorithms and their applications.",
    content: selectedModule ? `
      <div class="module-content">
        <h2>${selectedModule.title}</h2>
        <p class="module-description">${selectedModule.description}</p>
      </div>
    ` : `
      <div class="welcome-content">
        <h1>${course.course_title}</h1>
        <h4>${course.description}</h4>
        <p>Select a module from the resources section to begin learning.</p>
      </div>
    `
  }

  const nextLessonId = lesson.id + 1
  const prevLessonId = lesson.id - 1

  const handleMarkComplete = () => {
    setCompleted(true)
  }

  if (loading) {
    return <div className="container my-4 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container my-4 text-center text-danger">{error}</div>
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
        now={course.progress}
        label={`${course.progress}%`}
        style={{ height: '20px', borderRadius: '10px' }}
      />

      <div className="row">
        <div className="col-lg-8">
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="content">
                  <FileText size={16} className="me-1" /> Content
                </Nav.Link>
              </Nav.Item>
              {selectedModule?.video_url && (
                <Nav.Item>
                  <Nav.Link eventKey="video">
                    <Video size={16} className="me-1" /> Video
                  </Nav.Link>
                </Nav.Item>
              )}
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
              {selectedModule?.video_url && (
                <Tab.Pane eventKey="video">
                  <Card>
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <div className="video-container w-100">
                        <iframe
                          width="100%"
                          height="480"
                          id="youtube-player"
                          src={`https://www.youtube.com/embed/${getYouTubeId(selectedModule.video_url)}?enablejsapi=1&origin=${window.location.origin}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="YouTube video player"
                        ></iframe>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}
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
              {modules.length > 0 ? (
                modules.map((module) => {
                  const isSelected = selectedModule?.id === module.id

                  return (
                    <div key={module.id}>
                      <a
                        href="#"
                        className={`d-flex align-items-center py-2 text-decoration-none ${
                          isSelected ? 'text-primary fw-bold' : 'text-dark'
                        } hover-link`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleModuleClick(module)
                        }}
                      >
                        {module.video_url ? (
                          <Video size={16} className="me-2" />
                        ) : (
                          <FileText size={16} className="me-2" />
                        )}
                        {module.title}
                      </a>
                      <hr className="my-2" />
                    </div>
                  )
                })
              ) : (
                <p className="text-muted">No resources available</p>
              )}
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
