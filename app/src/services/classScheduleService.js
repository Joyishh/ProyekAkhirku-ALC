import api from "../utils/api";

export const classScheduleService = {
  getSchedulesByClassId: async (classId) => {
    const response = await api.get(`/class-schedules/class/${classId}`);
    return response.data;
  },
  createSchedule: async (data) => {
    const response = await api.post("/class-schedules", data);
    return response.data;
  },
  deleteSchedule: async (id) => {
    const response = await api.delete(`/class-schedules/${id}`);
    return response.data;
  }
};