import axios from 'axios';

const API_BASE_URL = 'http://3.109.1.245:9999/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API service for user related operations
export const userAPI = {
  // User login
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/user/userLogin', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/user/getUserById/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  // Logout (optional - if you have a logout endpoint)
  logout: async () => {
    try {
      const response = await apiClient.post('/user/logout');
      return response.data;
    } catch (error) {
      // Even if API fails, we still clear local storage
      console.error('Logout API error:', error);
      throw error.response?.data || error.message;
    }
  }
};