import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, createTask, updateTask } from '../services/taskService';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          const task = await getTaskById(id);
          
          // Format date for input field
          const dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
          
          setFormData({
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'pending',
            dueDate
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching task:', error);
          setError('Could not fetch task data');
          setLoading(false);
        }
      };

      fetchTask();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await updateTask(id, formData);
      } else {
        await createTask(formData);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
      setError('Failed to save task');
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter task title"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Enter task description"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
