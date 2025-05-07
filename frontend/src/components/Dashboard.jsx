import React, { useEffect } from 'react';
import StatsCard from './StatsCard';
import ContinueLearning from './ContinueLearning';
import UpcomingAssignments from './UpcomingAssignments';
import QuickAccess from './QuickAccess';
import RecentNotifications from './RecentNotifications';
import { Bell } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Ensure AOS styles are included
import '../styles/Dashboard.css'; // Make sure this path is correct for your project structure

const Dashboard = () => {
  const name=localStorage.getItem("studentname")
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" data-aos="fade-up">Welcome back, {name}!</h2>
        <button className="btn btn-outline-secondary rounded-circle">
          <Bell />
        </button>
      </div>

      <div className="row g-3 mb-4">
        <StatsCard 
          title="Courses Enrolled" 
          value="3" 
          subtitle="2 in progress, 1 completed"
          data-aos="fade-up"
        />
        <StatsCard 
          title="Average Progress" 
          value="58%" 
          subtitle=""
          progress={58}
          data-aos="fade-up"
        />
        <StatsCard 
          title="Quizzes Completed" 
          value="7" 
          subtitle="Average score: 85%" 
          data-aos="fade-up"
        />
        <StatsCard 
          title="Learning Streak" 
          value="5 days" 
          subtitle="Keep it up!"
          data-aos="fade-up"
        />
      </div>

      <div className="row g-3">
        <div className="col-lg-6" data-aos="fade-up">
          <ContinueLearning />
        </div>
        <div className="col-lg-6" data-aos="fade-up">
          <UpcomingAssignments />
          <QuickAccess />
        </div>
        <div className="container mt-2" data-aos="fade-up">
          <RecentNotifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
