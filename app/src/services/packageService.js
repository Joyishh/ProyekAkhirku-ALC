import api from '../utils/api';

const packageService = {
  // Get all active packages
  getAllPackages: async () => {
    try {
      const response = await api.get('/package/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error.response?.data || { message: 'Failed to fetch packages' };
    }
  },

  // Get package by ID
  getPackageById: async (packageId) => {
    try {
      const response = await api.get(`/package/${packageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching package details:', error);
      throw error.response?.data || { message: 'Failed to fetch package details' };
    }
  },
};

export default packageService;