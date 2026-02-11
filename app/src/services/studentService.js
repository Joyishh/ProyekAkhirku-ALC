import api from '../utils/api';

const studentService = {
  /**
   * Get all students (lightweight list for table view)
   * @returns {Promise} API response with students array
   */
  getAllStudents: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error.response?.data || { message: 'Failed to fetch students' };
    }
  },

  /**
   * Get student detail by ID (heavy detail with all relations)
   * @param {number} studentId - Student ID
   * @returns {Promise} API response with detailed student data
   */
  getStudentDetail: async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student detail:', error);
      throw error.response?.data || { message: 'Failed to fetch student detail' };
    }
  },

  /**
   * Update student data
   * @param {number} studentId - Student ID
   * @param {Object} data - Updated student data
   * @returns {Promise} API response with updated student data
   */
  updateStudent: async (studentId, data) => {
    try {
      const response = await api.put(`/students/${studentId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error.response?.data || { message: 'Failed to update student' };
    }
  }
};

export default studentService;