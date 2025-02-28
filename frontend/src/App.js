import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import TaskForm from './pages/TaskForm';
import Login from './components/auth/Login';
import { AuthProvider, AuthContext } from './context/AuthContext';  // ✅ Fixed import
import PrivateRoute from './components/PrivateRoutes';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Register from './components/auth/Register';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && window.location.pathname !== "/login") {
      navigate("/register");
    }
  }, [user, navigate, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App min-vh-100 bg-light">
      {user && <Navbar />}
      <div className="container py-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/tasks/:taskId" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
          <Route path="/create-task" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          <Route path="/edit-task/:taskId" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
