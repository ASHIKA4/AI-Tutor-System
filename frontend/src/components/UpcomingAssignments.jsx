import React from 'react';
import "../styles/UpcomingAssignments.css";

const assignments = [
  { title: 'ML Model Evaluation', course: 'Introduction to Machine Learning', due: 'Apr 15, 2025' },
  { title: 'Python Project Submission', course: 'Advanced Python Programming', due: 'Apr 20, 2025' },
];

const UpcomingAssignments = () => {
  return (
    <div className="card shadow-sm mb-3" data-aos="fade-up" data-aos-duration="1000">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Upcoming Assignments</h5>
        {assignments.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between align-items-center mb-2" data-aos="fade-up" data-aos-delay={`${idx * 200}`} data-aos-duration="1000">
            <div>
              <strong>{item.title}</strong>
              <p className="mb-0 text-muted small">{item.course}</p>
            </div>
            <span className="badge bg-secondary p-2">{item.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAssignments;
