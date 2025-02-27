import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, deleteTask } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
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
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <div>
          <select 
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          No tasks found. <Link to="/create-task" className="text-blue-600">Add a new task</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <div 
              key={task._id} 
              className="border p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <Link to={`/tasks/${task._id}`} className="text-xl font-semibold hover:text-blue-600">
                  {task.title}
                </Link>
                <span className={`text-sm px-2 py-1 rounded ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <p className="text-gray-600 mt-2">{task.description?.substring(0, 150)}...</p>
              
              {task.dueDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
              
              <div className="flex mt-4 space-x-2">
                <Link 
                  to={`/edit-task/${task._id}`} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteTask(task._id)} 
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;