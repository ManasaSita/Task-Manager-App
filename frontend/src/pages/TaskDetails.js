import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTaskById, deleteTask, updateTask } from '../services/taskService';
import AuthContext from '../context/AuthContext';

const TaskDetails = () => {
  // console.log(useParams());
  const { user } = useContext(AuthContext);
  let userId = user.id;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId, userId);
        setTask(data);
        // console.log(task);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(userId, taskId);
        navigate('/');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, userId, { status: newStatus });
      setTask(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
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

  if (!task) {
    return (
      <div className="text-center py-5">
        <h2 className="fs-3 fw-bold text-secondary">Task not found</h2>
        <p className="mt-2 text-muted">The task you're looking for doesn't exist or has been deleted.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success bg-opacity-10 text-success border-success';
      case 'in-progress':
        return 'bg-warning bg-opacity-10 text-warning border-warning';
      default:
        return 'bg-danger bg-opacity-10 text-danger border-danger';
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="mb-3">
          <Link to="/" className="text-primary d-flex align-items-center text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-left me-1" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            Back to Tasks
          </Link>
        </div>

        <div className="card shadow-sm detail-card">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <h1 className="fs-3 fw-bold text-dark">{task.title}</h1>
              <span className={`badge rounded-pill ${getStatusStyles(task.status)}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              <Link 
                to={`/edit-task/${task._id}`} 
                className="btn btn-primary d-flex align-items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </Link>
            </div>

            <div className="mb-4">
              <p className="text-secondary" style={{whiteSpace: 'pre-line'}}>
                {task.description || 'No description provided.'}
              </p>
            </div>

            <div className="row mb-4 g-4">
              <div className="col-md-6">
                <div className="bg-light p-3 rounded">
                  <div className="fw-medium text-secondary mb-2">Due Date</div>
                  <div className="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-calendar me-2 text-secondary" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    {formatDate(task.dueDate)}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-light p-3 rounded">
                  <div className="fw-medium text-secondary mb-2">Created</div>
                  <div className="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-clock me-2 text-secondary" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-top pt-4">
              <h3 className="fw-medium text-secondary mb-3">Update Status</h3>
              <div className="d-flex flex-wrap gap-2">
                <button 
                  onClick={() => handleStatusChange('pending')}
                  className={`btn ${task.status === 'pending' ? 'btn-danger' : 'btn-outline-danger'}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => handleStatusChange('in-progress')}
                  className={`btn ${task.status === 'in-progress' ? 'btn-warning' : 'btn-outline-warning'}`}
                >
                  In Progress
                </button>
                <button 
                  onClick={() => handleStatusChange('completed')}
                  className={`btn ${task.status === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
          
          <div className="card-footer d-flex justify-content-between p-3 detail-card">
            <button 
              onClick={handleDeleteTask} 
              className="btn btn-danger d-flex align-items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
            {/* <Link 
              to={`/edit-task/${task._id}`} 
              className="btn btn-primary d-flex align-items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil me-1" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
              Edit
            </Link> */}
            <button 
              className="btn btn-success d-flex align-items-center px-2" 
              onClick={() => navigate('/')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle  me-2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;