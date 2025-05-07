import { Button, Row, Col } from 'react-bootstrap';
import { FaRobot, FaBookOpen, FaChartBar } from 'react-icons/fa';
import {List} from 'react-feather';
import '../styles/QuickAccess.css';  
import { useNavigate } from 'react-router-dom';

const QuickAccess = () => {
  const navigate = useNavigate();
return(
  <div className="p-3 bg-white shadow-sm rounded mb-4" data-aos="fade-up" data-aos-duration="1000">
    <h5 className="fw-bold mb-3" data-aos="fade-up" data-aos-duration="1000">Quick Access</h5>
    <Row className="g-2">
      <Col xs={12} md={6} data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <Button variant="outline-dark" className="w-100 d-flex align-items-center gap-2 justify-content-center" onClick={() => navigate('/student/ask-ai')}>
          <FaRobot /> Ask AI
        </Button>
      </Col>
      <Col xs={12} md={6} data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
        <Button variant="outline-dark" className="w-100 d-flex align-items-center gap-2 justify-content-center" onClick={() => navigate('/student/my-courses')}>
          <List /> My Courses
        </Button>
      </Col>
      <Col xs={12} md={6} data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
        <Button variant="outline-dark" className="w-100 d-flex align-items-center gap-2 justify-content-center" onClick={() => navigate('/student/course-catalog')}>
          <FaBookOpen /> Browse Courses
        </Button>
      </Col>
      <Col xs={12} md={6} data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000" onClick={() => navigate('/student/progress')}>
        <Button variant="outline-dark" className="w-100 d-flex align-items-center gap-2 justify-content-center">
          <FaChartBar /> View Progress
        </Button>
      </Col>
    </Row>
  </div>
);
};
export default QuickAccess;
