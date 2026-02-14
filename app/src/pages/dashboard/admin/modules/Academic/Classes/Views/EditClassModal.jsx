import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import api from '../../../../../../../utils/api';

const EditClassModal = ({ isOpen, onClose, onSuccess, classData }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    className: '',
    packageId: '',
    capacity: 30,
    isActive: true
  });

  // Fetch packages when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchPackages();
    }
  }, [isOpen]);

  // Populate form when classData changes
  useEffect(() => {
    if (classData) {
      setFormData({
        className: classData.className || '',
        packageId: classData.packageId || classData.package_id || '',
        capacity: classData.capacity || 30,
        isActive: typeof classData.isActive === 'boolean' ? classData.isActive : true
      });
    }
  }, [classData]);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/package');
      setPackages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Gagal memuat data paket');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle isActive as boolean
    if (name === 'isActive') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.className.trim()) {
      toast.error('Nama kelas wajib diisi');
      return;
    }

    if (!formData.packageId) {
      toast.error('Pilih paket terlebih dahulu');
      return;
    }

    if (formData.capacity < 1) {
      toast.error('Kapasitas harus minimal 1');
      return;
    }

    if (!classData?.classId) {
      toast.error('ID kelas tidak ditemukan');
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(`/classes/${classData.classId}`, {
        package_id: parseInt(formData.packageId),
        class_name: formData.className.trim(),
        capacity: parseInt(formData.capacity),
        is_active: formData.isActive
      });

      toast.success(response.data.message || 'Kelas berhasil diperbarui');

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating class:', error);
      const errorMessage = error.response?.data?.message || 'Gagal memperbarui kelas';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center">
            <Icon icon="mdi:pencil-box" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Edit Kelas</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white hover:bg-blue-800 rounded-lg p-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama Kelas */}
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kelas <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="className"
              name="className"
              value={formData.className}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Contoh: Kelas A Matematika"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Pilih Paket */}
          <div>
            <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Paket <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="packageId"
                name="packageId"
                value={formData.packageId}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Pilih paket</option>
                {packages.map(pkg => (
                  <option key={pkg.packageId} value={pkg.packageId}>
                    {pkg.packageName}
                  </option>
                ))}
              </select>
              <Icon 
                icon="mdi:chevron-down" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Kapasitas */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
              Kapasitas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              required
              disabled={loading}
              placeholder="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="isActive" className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="isActive"
                name="isActive"
                value={formData.isActive.toString()}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <Icon 
                icon="mdi:chevron-down" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              />
            </div>
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
                  : 'bg-blue-500 hover:bg-blue-600'
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
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;
