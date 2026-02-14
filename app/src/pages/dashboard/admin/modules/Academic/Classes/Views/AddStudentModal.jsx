import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import api from '../../../../../../../utils/api';

const AddStudentModal = ({ isOpen, onClose, onSuccess, classId, packageId }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch available students when modal opens
  const fetchAvailableStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/students/available', {
        params: {
          packageId,
          classId
        }
      });
      setStudents(response.data.data || []);
      setFilteredStudents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching available students:', error);
      toast.error('Gagal memuat data siswa tersedia');
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  }, [packageId, classId]);

  useEffect(() => {
    if (isOpen && packageId) {
      fetchAvailableStudents();
    }
  }, [isOpen, packageId, fetchAvailableStudents]);

  // Filter students based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.fullname.toLowerCase().includes(term) ||
          (student.studentIdFormatted && student.studentIdFormatted.toLowerCase().includes(term))
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const handleSelectStudent = (studentId) => {
    setSelectedStudentIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === filteredStudents.length) {
      // Deselect all
      setSelectedStudentIds([]);
    } else {
      // Select all filtered students
      setSelectedStudentIds(filteredStudents.map((s) => s.studentId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedStudentIds.length === 0) {
      toast.warning('Pilih minimal satu siswa');
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post(`/classes/${classId}/members`, {
        student_ids: selectedStudentIds
      });

      toast.success(response.data.message || 'Siswa berhasil ditambahkan ke kelas');
      
      // Reset state
      setSelectedStudentIds([]);
      setSearchTerm('');
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding students to class:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Gagal menambahkan siswa ke kelas';
      toast.error(errorMessage);
      
      // Show detailed error in console for debugging
      if (error.response?.data?.error) {
        console.error('Backend error details:', error.response.data.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setSelectedStudentIds([]);
      setSearchTerm('');
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
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center">
            <Icon icon="mdi:account-multiple-plus" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Tambah Siswa ke Kelas</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-white hover:bg-blue-800 rounded-lg p-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari nama atau ID siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                disabled={loading || submitting}
              />
            </div>

            {/* Select All Checkbox */}
            {filteredStudents.length > 0 && (
              <div className="mt-3 flex items-center">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                  onChange={handleSelectAll}
                  disabled={loading || submitting}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="selectAll"
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  Pilih Semua ({filteredStudents.length} siswa)
                </label>
              </div>
            )}
          </div>

          {/* Student List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Icon icon="mdi:loading" className="w-12 h-12 text-blue-500 animate-spin mb-3" />
                <p className="text-gray-500">Memuat data siswa...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Icon icon="mdi:account-off" className="w-16 h-16 text-gray-300 mb-3" />
                <p className="text-gray-600 font-medium">
                  {students.length === 0
                    ? 'Tidak ada siswa tersedia untuk paket ini'
                    : 'Tidak ada hasil pencarian'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {students.length === 0
                    ? 'Semua siswa sudah terdaftar di kelas ini'
                    : 'Coba kata kunci lain'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <label
                    key={student.studentId}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
                      selectedStudentIds.includes(student.studentId)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(student.studentId)}
                      onChange={() => handleSelectStudent(student.studentId)}
                      disabled={submitting}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {student.fullname}
                      </div>
                      <div className="text-xs text-gray-500">ID: {student.studentIdFormatted}</div>
                    </div>
                    {selectedStudentIds.includes(student.studentId) && (
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Selected Count */}
          {selectedStudentIds.length > 0 && (
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
              <p className="text-sm text-blue-700 font-medium">
                <Icon icon="mdi:check-circle" className="inline w-4 h-4 mr-1" />
                {selectedStudentIds.length} siswa dipilih
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || selectedStudentIds.length === 0}
            className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all ${
              submitting || selectedStudentIds.length === 0
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {submitting ? (
              <>
                <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                Menambahkan...
              </>
            ) : (
              <>
                <Icon icon="mdi:account-plus" className="w-5 h-5 mr-2" />
                Tambahkan ({selectedStudentIds.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
