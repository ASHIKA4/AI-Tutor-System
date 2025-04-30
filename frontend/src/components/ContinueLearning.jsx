import React, { useEffect, useState } from 'react';
import '../styles/ContinueLearning.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
const courses = [
  { title: 'Introduction to Machine Learning', progress: 65 },
  { title: 'Advanced Python Programming', progress: 30 },
  { title: 'Data Structures & Algorithms', progress: 10 },
];

const ContinueLearning = () => {

  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="card shadow-sm mb-3 h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold mb-3">Continue Learning</h5>
        {courses.map((course, idx) => (
          <div key={idx} className="mb-4">
            <h6>{course.title}</h6>
            <div className="progress mb-2">
              <div
                className={`progress-bar bg-success animated-progress-bar`}
                style={{ width: mounted ? `${course.progress}%` : '0%' }}
              ></div>
            </div>
            <button className="btn btn-outline-primary btn-sm" onClick={() =>
              navigate(`/home/student/course/${course.id}/lesson/1`, { state: { course } })}>Continue</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearning;
