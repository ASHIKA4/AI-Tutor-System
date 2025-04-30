import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherDashboard from '../components/TeacherDashboard';
import MainLayout_Teacher from '../components/MainLayout_Teacher';
import CoursePage from '../components/CoursePage';
import NewCourse from '../components/NewCourse'
import StudentsPage from '../components/StudentsPage';
import AssignmentsPage from '../components/AssignmentsPage';
import NewAssignment from '../components/NewAssignment';
import Quizzes from '../components/quizzes';
import Analytics from '../components/Analytics';
import NewQuiz from '../components/NewQuiz';
import MessagesPage from '../components/MessagesPage';
import Profile from '../components/Profile';
import Settings from '../components/Settings';

function Teacher() {
  const role = localStorage.getItem('role'); // 'teacher' or 'student'

  return (


    <Routes>
      <Route element={<MainLayout_Teacher />}>

        {/* Add other routes here */}

        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/newcourse" element={<NewCourse />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/newassignment" element={<NewAssignment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/newquiz" element={<NewQuiz />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>

  );
}

export default Teacher;
