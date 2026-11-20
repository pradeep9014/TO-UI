import axios from 'axios';
import { getToken, clearAuth } from '../utils/auth-storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      // Only redirect if not already on an auth page
      const path = window.location.pathname;
      if (!path.includes('login.html') && !path.includes('register.html')) {
        window.location.href = '/login.html';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
