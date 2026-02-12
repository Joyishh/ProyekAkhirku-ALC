import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { subjectService } from '../../../../../../../services/subjectService';
import teacherService from '../../../../../../../services/teacherService';
import { classScheduleService } from '../../../../../../../services/classScheduleService';

const AddScheduleModal = ({ isOpen, onClose, classId, onSuccess }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject_id: '',
    teacher_id: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
    location_or_room: ''
  });

  const daysOfWeek = [
    { value: 'Monday', label: 'Senin' },
    { value: 'Tuesday', label: 'Selasa' },
    { value: 'Wednesday', label: 'Rabu' },
    { value: 'Thursday', label: 'Kamis' },
    { value: 'Friday', label: 'Jumat' },
    { value: 'Saturday', label: 'Sabtu' },
    { value: 'Sunday', label: 'Minggu' }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchSubjects();
      fetchTeachers();
    }
  }, [isOpen]);

  const fetchSubjects = async () => {
    try {
      const response = await subjectService.getAllSubjects();
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await teacherService.getAllTeachers();
      setTeachers(response.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await classScheduleService.createSchedule({
        class_id: classId,
        subject_id: formData.subject_id,
        teacher_id: formData.teacher_id,
        day_of_week: formData.day_of_week,
        start_time: formData.start_time,
        end_time: formData.end_time,
        location_or_room: formData.location_or_room
      });

      // Reset form
      setFormData({
        subject_id: '',
        teacher_id: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
        location_or_room: ''
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Gagal membuat jadwal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        subject_id: '',
        teacher_id: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
        location_or_room: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center">
            <Icon icon="mdi:calendar-clock" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Tambah Jadwal Pelajaran</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white hover:bg-purple-800 rounded-lg p-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Mata Pelajaran */}
          <div>
            <label htmlFor="subject_id" className="block text-sm font-medium text-gray-700 mb-2">
              Mata Pelajaran <span className="text-red-500">*</span>
            </label>
            <select
              id="subject_id"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Mata Pelajaran</option>
              {subjects.map(subject => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.subject_name}
                </option>
              ))}
            </select>
          </div>

          {/* Guru */}
          <div>
            <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700 mb-2">
              Guru <span className="text-red-500">*</span>
            </label>
            <select
              id="teacher_id"
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Guru</option>
              {teachers.map(teacher => (
                <option key={teacher.teacherId} value={teacher.teacherId}>
                  {teacher.fullname}
                </option>
              ))}
            </select>
          </div>

          {/* Hari */}
          <div>
            <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700 mb-2">
              Hari <span className="text-red-500">*</span>
            </label>
            <select
              id="day_of_week"
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">Pilih Hari</option>
              {daysOfWeek.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* Waktu Mulai dan Selesai */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Selesai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Ruangan */}
          <div>
            <label htmlFor="location_or_room" className="block text-sm font-medium text-gray-700 mb-2">
              Ruangan
            </label>
            <input
              type="text"
              id="location_or_room"
              name="location_or_room"
              value={formData.location_or_room}
              onChange={handleChange}
              placeholder="Contoh: Lab Komputer, Ruang 12A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
              } text-white`}
            >
              {loading ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Icon icon="mdi:check" className="w-5 h-5 mr-2" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleModal;
