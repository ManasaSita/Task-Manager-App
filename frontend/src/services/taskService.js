import API_URL from "./config";

fetch(`${API_URL}/tasks`)
  .then(response => response.json())
  .then(data => console.log(data));

export const getAllTasks = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`); // Updated route
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getAllTasks:", error);
    throw error;
  }
};

export const getTaskById = async (taskId, userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${taskId}`); // Updated route
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

export const updateTask = async (taskId, userId, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${taskId}`, {
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

export const deleteTask = async (userId, taskId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${taskId}`, {
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
