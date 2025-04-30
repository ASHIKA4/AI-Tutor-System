import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Dashboard from '../components/Dashboard';
import CourseCatalog from '../components/CourseCatalog';
import Enroll from '../components/Enroll';
import MyCourses from '../components/MyCourses';
import LessonPage from '../components/LessonPage';
import AskAI from '../components/AskAI';
import QuizPage from '../components/QuizPage';
import Progress from '../components/Progress';
import ProfilePage from '../components/ProfilePage';

const Home = () => {
  return (
    <Routes>
      {/* Wrap all routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} /> {/* Default route */}
        <Route path="course-catalog" element={<CourseCatalog />} />
        <Route path="enroll/:id" element={<Enroll />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="student/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="ask-ai" element={<AskAI />} />
        <Route path="quizzes" element={<QuizPage/>} />
        <Route path="progress" element={<Progress/>} />
        <Route path="profile" element={<ProfilePage/>} />

      </Route>
    </Routes>
  );
};

export default Home;
