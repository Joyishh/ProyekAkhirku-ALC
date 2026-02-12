import api from '../utils/api.js';

export const getSchedulesByClass = async (classId) => {
  const response = await api.get(`/schedules/class/${classId}`);
  return response.data;
};

export const createSchedule = async (data) => {
  const response = await api.post('/schedules', data);
  return response.data;
};

export const deleteSchedule = async (id) => {
  const response = await api.delete(`/schedules/${id}`);
  return response.data;
};