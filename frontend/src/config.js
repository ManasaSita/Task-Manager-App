// Base API URL
export const BASE_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://task-manager-app-6n2b.onrender.com' 
  : 'http://localhost:5000';

// Endpoint URLs
export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_API_URL}/auth/login`,
    register: `${BASE_API_URL}/auth/register`,
    profile: `${BASE_API_URL}/auth/profile`,
  },
  tasks: {
    base: `${BASE_API_URL}/api/tasks`,
    byId: (id) => `${BASE_API_URL}/api/tasks/${id}`,
  }
};

// Helper function for headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};