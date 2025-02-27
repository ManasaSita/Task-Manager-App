const API_URL = 'http://localhost:5000/api/tasks';

export const getAllTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllTasks:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getTaskById:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in updateTask:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in deleteTask:', error);
    throw error;
  }
};