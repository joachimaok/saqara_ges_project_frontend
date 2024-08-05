import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import CreateProject from './pages/project/CreateProject';
import ProjectDetails from './pages/project/ProjectDetails';
import EditProject from './pages/project/EditProject';
import FloatingMenu from './components/FloatingMenu';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <FloatingMenu />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/create-project"
          element={isAuthenticated ? <CreateProject /> : <Login />}
        />
        <Route
          path="/projects/:id"
          element={isAuthenticated ? <ProjectDetails /> : <Login />}
        />
        <Route
          path="/projects/edit/:id"
          element={isAuthenticated ? <EditProject /> : <Login />}
        />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
