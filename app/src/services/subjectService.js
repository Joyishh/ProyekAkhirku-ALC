import api from "../utils/api";

export const subjectService = {
  // Ambil semua mata pelajaran
  getAllSubjects: async () => {
    const response = await api.get("/subjects");
    return response.data;
  },

  // (Opsional) Ambil satu mapel
  getSubjectById: async (id) => {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
  }
};