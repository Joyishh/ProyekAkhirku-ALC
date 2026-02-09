import api from '../utils/api';

const dashboardService = {
  /**
   * Get Admin Dashboard Statistics
   * Fetches KPIs for admin dashboard (pending registrations, active students, total registrations)
   * @returns {Promise} API response with dashboard stats
   */
  getAdminStats: async () => {
    try {
      const response = await api.get('/dashboard/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error.response?.data || { message: 'Failed to fetch dashboard statistics' };
    }
  }
};

export default dashboardService;