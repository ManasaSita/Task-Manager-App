import { API_ENDPOINTS, getAuthHeaders } from "../config";

export const getAllTasks = async (userId) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.tasks.base}/user/${userId}`, {
      headers: getAuthHeaders()
    });
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
    const response = await fetch(`${API_ENDPOINTS.tasks.base}/${userId}/${taskId}`, {
      headers: getAuthHeaders()
    });
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
    // console.log('Creating task with data:', taskData);
    // console.log('Using API URL:', API_ENDPOINTS.tasks.base);
    
    const response = await fetch(API_ENDPOINTS.tasks.base, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server responded with error:', response.status, errorData);
      throw new Error(`Failed to create task: ${response.status} ${errorData.message || ''}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
};

export const updateTask = async (taskId, userId, taskData) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.tasks.base}/${userId}/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
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
    const response = await fetch(`${API_ENDPOINTS.tasks.base}/${userId}/${taskId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
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