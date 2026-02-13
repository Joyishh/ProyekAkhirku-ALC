import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import api from '../../../../../../../utils/api';

const AddSubjectModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.subjectName.trim()) {
      toast.error('Nama mata pelajaran wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/subjects/admin/', {
        subjectName: formData.subjectName.trim(),
        description: formData.description.trim() || null
      });

      toast.success(response.data.message || 'Mata pelajaran berhasil ditambahkan');
      
      // Reset form
      setFormData({
        subjectName: '',
        description: ''
      });

      // Call success callback and close modal
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating subject:', error);
      const errorMessage = error.response?.data?.message || 'Gagal menambahkan mata pelajaran';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        subjectName: '',
        description: ''
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
            <Icon icon="mdi:book-open-page-variant" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Tambah Mata Pelajaran</h3>
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
          {/* Subject Name Input */}
          <div>
            <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Mata Pelajaran <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subjectName"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              placeholder="Contoh: Matematika Wajib"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi singkat mata pelajaran..."
              rows="4"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Modal Footer - Action Buttons */}
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

export default AddSubjectModal;
