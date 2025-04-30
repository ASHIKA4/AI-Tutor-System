import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage'; // Landing Page component
import Login from './components/Login'; // Login component
import Register from './components/Register'; // Register component
import Home from './pages/Home'; // Home component (with Dashboard, Course Catalog routes)
import MainLayout from './components/MainLayout';
import Enroll from './components/Enroll';
import LessonPage from './components/LessonPage';
import TeacherDashboard from './teachers/components/TeacherDashboard';
import MainLayout_Teacher from './teachers/components/MainLayout_Teacher';
import Teacher from './teachers/pages/Teacher';

import AOS from 'aos';
import './styles/App.css'
import 'aos/dist/aos.css';



function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // 👈 this enables repeated animations
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />  {/* Landing Page */}
      <Route path="/login" element={<Login />} />  {/* Login Page */}
      <Route path="/register" element={<Register />} />  {/* Register Page */}
      <Route path="/Student/*" element={<Home />} />  {/* Home component with nested routes */}
      <Route path="/" element={<MainLayout />}/>
      <Route path="enroll/:id" element={<Enroll />} />
      <Route path="student/course/:courseId/lesson/:lessonId" element={<LessonPage />} />

      
      <Route path="/teacher/*" element={<Teacher />} />


     
    



    </Routes>
  );
}

export default App;
