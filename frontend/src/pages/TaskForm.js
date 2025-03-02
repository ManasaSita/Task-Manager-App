import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTaskById, createTask, updateTask } from '../services/taskService';
import AuthContext from '../context/AuthContext';

const TaskForm = () => {
  const { user } = useContext(AuthContext);
  const userId = user.id;

  const [formData, setFormData] = useState({
    id: userId,
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        setIsEditing(true);
        setLoading(true);
        try {
          const taskData = await getTaskById(taskId, userId);
          // Format the date for input element
          const formattedDueDate = taskData.dueDate 
            ? new Date(taskData.dueDate).toISOString().split('T')[0]
            : '';
          
          setFormData({
            ...taskData,
            dueDate: formattedDueDate
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching task:', error);
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error for this field when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    // Additional validations could be added here
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (isEditing) {
        await updateTask(taskId,userId, formData);
        navigate(`/tasks/${taskId}`);
      } else {
        const newTask = await createTask(formData);
        navigate(`/tasks/${newTask._id}`);
      }
    } catch (error) {
      console.error('Error saving task:', error);
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

        <div className="card task-form shadow-sm">
          <div className="card-body p-4">
            <h1 className="fs-3 fw-bold text-dark mb-4">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-medium">Task Title <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-medium">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task details (optional)"
                ></textarea>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="status" className="form-label fw-medium">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="dueDate" className="form-label fw-medium">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="border-top pt-4 d-flex justify-content-end gap-2">
                <Link to="/" className="btn btn-outline-secondary px-4">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary px-4 d-flex align-items-center"
                  disabled={loading}
                >
                  {loading && (
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {isEditing ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;