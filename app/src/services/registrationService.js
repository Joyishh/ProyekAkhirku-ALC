import api from '../utils/api';

const registrationService = {
  /**
   * Create new student registration by Admin
   * @param {Object} data - Registration data
   * @returns {Promise} API response
   */
  createRegistration: async (data) => {
    try {
      const response = await api.post('/registration/admin', data);
      return response.data;
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error.response?.data || { message: 'Failed to create registration' };
    }
  },

  /**
   * Get all registrations (Admin only)
   * @returns {Promise} API response
   */
  getAllRegistrations: async () => {
    try {
      const response = await api.get('/registration/admin');
      return response.data;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error.response?.data || { message: 'Failed to fetch registrations' };
    }
  },

  /**
   * Get registration by ID
   * @param {number} registrationId - Registration ID
   * @returns {Promise} API response
   */
  getRegistrationById: async (registrationId) => {
    try {
      const response = await api.get(`/registration/admin/${registrationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error.response?.data || { message: 'Failed to fetch registration details' };
    }
  },

  /**
   * Update registration status (approve/reject)
   * @param {number} registrationId - Registration ID
   * @param {Object} statusData - { status: string, adminNotes?: string }
   * @returns {Promise} API response
   */
  updateRegistrationStatus: async (registrationId, statusData) => {
    try {
      const response = await api.put(`/registration/admin/${registrationId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating registration status:', error);
      throw error.response?.data || { message: 'Failed to update registration status' };
    }
  },
};

export default registrationService;