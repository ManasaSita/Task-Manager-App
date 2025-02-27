import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import TaskForm from './pages/TaskForm';
// import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/create-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;