import api from '../utils/api';

const teacherService = {
  /**
   * Get all teachers
   * @returns {Promise} API response with teachers array
   */
  getAllTeachers: async () => {
    try {
      const response = await api.get('/teachers');
      return response.data;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error.response?.data || { message: 'Failed to fetch teachers' };
    }
  },

  /**
   * Create new teacher
   * @param {Object} data - Teacher data (username, email, password, fullname, phone, specialization)
   * @returns {Promise} API response with created teacher data
   */
  createTeacher: async (data) => {
    try {
      const response = await api.post('/teachers', data);
      return response.data;
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error.response?.data || { message: 'Failed to create teacher' };
    }
  },

  /**
   * Get teacher by ID
   * @param {number} id - Teacher ID
   * @returns {Promise} API response with teacher detail
   */
  getTeacherById: async (id) => {
    try {
      const response = await api.get(`/teachers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher detail:', error);
      throw error.response?.data || { message: 'Failed to fetch teacher detail' };
    }
  }
};

export default teacherService;