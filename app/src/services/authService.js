import api from '../utils/api';

const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.delete('/auth/logout');
      
      // Hapus token dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response.data;
    } catch (error) {
      // Tetap hapus token meskipun request gagal
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error.response?.data || { message: 'Logout failed' };
    }
  },

  // Get current user info
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      
      const userData = response.data.user;
    
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user info' };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
