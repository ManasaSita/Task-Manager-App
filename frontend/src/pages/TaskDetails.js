import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTaskById, deleteTask } from '../services/taskService';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading task details...</div>;
  }

  if (!task) {
    return <div className="text-center py-8">Task not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <span className={`text-sm px-2 py-1 rounded ${
          task.status === 'completed' ? 'bg-green-100 text-green-800' : 
          task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {task.status}
        </span>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <p className="text-gray-700 mb-4">{task.description}</p>
        
        {task.dueDate && (
          <p className="text-sm text-gray-600 mb-4">
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        
        <p className="text-sm text-gray-600 mb-6">
          <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
        </p>
        
        <div className="flex space-x-4">
          <Link 
            to={`/edit-task/${task._id}`} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Task
          </Link>
          <button 
            onClick={handleDeleteTask} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Task
          </button>
          <Link 
            to="/" 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;