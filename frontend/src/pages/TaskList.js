import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, deleteTask } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import AuthContext from '../context/AuthContext';

const TaskList = () => {
  const {user} = useContext(AuthContext);
  const userId = user.id;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(userId);
        
        const data = await getAllTasks(userId);
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(userId, id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'dueDate':
        // Handle null due dates
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      default:
        return 0;
    }
  });

  // Get appropriate empty state message based on filter
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'pending':
        return {
          icon: "hourglass",
          title: "No pending tasks",
          message: "You have no tasks waiting to be started",
          buttonText: "Start a New Task"
        };
      case 'in-progress':
        return {
          icon: "clock",
          title: "No tasks in progress",
          message: "You don't have any tasks currently in progress",
          buttonText: "Update the Status of Task"
        };
      case 'completed':
        return {
          icon: "check-circle",
          title: "No completed tasks",
          message: "You haven't completed any tasks yet",
          buttonText: "View All Tasks"
        };
      default:
        return {
          icon: "clipboard",
          title: "No tasks found",
          message: "Create your first task to get started",
          buttonText: "Add New Task"
        };
    }
  };

  // Get icon based on the type
  const getIcon = (iconType) => {
    switch (iconType) {
      case "hourglass":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-hourglass text-danger mb-4" viewBox="0 0 16 16">
            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
          </svg>
        );
      case "clock":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-clock-history text-warning mb-4" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        );
      case "check-circle":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-check-circle text-success mb-4" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-clipboard text-secondary mb-4" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const emptyState = getEmptyStateContent();

  return (
    <div>
      <div className="mb-4">
        <h1 className="display-6 fw-bold text-dark mb-2">Your Tasks</h1>
        <p className="text-secondary">Manage and organize all your tasks in one place</p>
      </div>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
          <div className="btn-group">
            <button 
              onClick={() => setFilter('all')} 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
              disabled={tasks.length === 0}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`btn ${filter === 'pending' ? 'btn-danger' : 'btn-outline-secondary'}`}
              disabled={tasks.length === 0}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('in-progress')} 
              className={`btn ${filter === 'in-progress' ? 'btn-warning' : 'btn-outline-secondary'}`}
              disabled={tasks.length === 0}
            >
              In Progress
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-secondary'}`}
              disabled={tasks.length === 0}
            >
              Completed
            </button>
          </div>
          
          <div className="d-flex align-items-center">
            <label className="form-label me-2 mb-0">Sort by:</label>
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={tasks.length === 0}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-5 card shadow">
          <div className="card-body">
            {getIcon(emptyState.icon)}
            <h3 className="fs-4 fw-medium text-secondary mb-2">{emptyState.title}</h3>
            <p className="text-muted mb-4">{emptyState.message}</p>
            <Link to='/create-task'
              className="btn btn-primary px-4 py-2">
              {emptyState.buttonText}
            </Link>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {sortedTasks.map(task => (
            <div className="col" key={task._id}>
              <TaskCard task={task} onDelete={handleDeleteTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;