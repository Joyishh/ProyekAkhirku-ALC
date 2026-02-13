import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import api from '../../../../../../../utils/api';

const AddPackageModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    packageName: '',
    description: '',
    price: ''
  });
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [searchSubject, setSearchSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch subjects when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchSubjects();
    }
  }, [isOpen]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/subjects');
      setAvailableSubjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Gagal memuat daftar mata pelajaran');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjectIds(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  // Filter subjects based on search
  const filteredSubjects = availableSubjects.filter(subject =>
    (subject.subjectName || subject.subject_name || '')
      .toLowerCase()
      .includes(searchSubject.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.packageName.trim()) {
      toast.error('Nama paket wajib diisi');
      return;
    }

    const priceValue = parseInt(formData.price);
    if (!formData.price || isNaN(priceValue) || priceValue < 0) {
      toast.error('Harga harus berupa angka yang valid (minimal 0)');
      return;
    }

    if (selectedSubjectIds.length === 0) {
      toast.error('Pilih minimal 1 mata pelajaran');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        packageName: formData.packageName.trim(),
        description: formData.description.trim() || null,
        basePrice: priceValue, // Send as integer
        isActive: true,
        subjectIds: selectedSubjectIds // Array of integers
      };

      const response = await api.post('/package', payload);
      toast.success(response.data.message || 'Paket berhasil ditambahkan');

      // Reset form
      setFormData({
        packageName: '',
        description: '',
        price: ''
      });
      setSelectedSubjectIds([]);
      setSearchSubject('');

      // Call success callback and close modal
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating package:', error);
      const errorMessage = error.response?.data?.message || 'Gagal menambahkan paket';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setFormData({
        packageName: '',
        description: '',
        price: ''
      });
      setSelectedSubjectIds([]);
      setSearchSubject('');
      onClose();
    }
  };

  // Format price for display
  const formatPrice = (value) => {
    if (!value) return 'Rp 0';
    const number = parseInt(value.toString().replace(/\D/g, ''));
    return `Rp ${number.toLocaleString('id-ID')}`;
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between rounded-t-xl flex-shrink-0">
          <div className="flex items-center">
            <Icon icon="mdi:package-variant" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Tambah Paket Belajar</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-white hover:bg-purple-800 rounded-lg p-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-5" id="packageForm">
          {/* Package Name Input */}
          <div>
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Paket <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              placeholder="Contoh: Paket Intensif UTBK"
              required
              disabled={submitting}
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
              placeholder="Deskripsi singkat paket belajar..."
              rows="3"
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Harga <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="500000"
              min="0"
              required
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.price && formatPrice(formData.price)}
            </p>
          </div>

          {/* Multi-Select Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mata Pelajaran <span className="text-red-500">*</span>
            </label>
            
            {/* Search Input */}
            <div className="mb-3">
              <div className="relative">
                <Icon 
                  icon="mdi:magnify" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                  type="text"
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  placeholder="Cari mata pelajaran..."
                  disabled={loading || submitting}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Subject List */}
            <div className="border border-gray-300 rounded-lg divide-y divide-gray-200 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Icon icon="mdi:loading" className="w-6 h-6 text-purple-600 animate-spin" />
                  <span className="ml-2 text-sm text-gray-600">Memuat mata pelajaran...</span>
                </div>
              ) : filteredSubjects.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  {searchSubject ? 'Mata pelajaran tidak ditemukan' : 'Belum ada mata pelajaran tersedia'}
                </div>
              ) : (
                filteredSubjects.map((subject) => {
                  const subjectId = subject.subjectId || subject.subject_id;
                  const subjectName = subject.subjectName || subject.subject_name;
                  const isSelected = selectedSubjectIds.includes(subjectId);

                  return (
                    <div
                      key={subjectId}
                      onClick={() => !submitting && toggleSubject(subjectId)}
                      className={`px-4 py-3 flex items-center cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-purple-50 border-l-4 border-purple-500' 
                          : 'hover:bg-gray-50'
                      } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        disabled={submitting}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                      />
                      <div className="ml-3 flex items-center flex-1">
                        <Icon 
                          icon="mdi:book-open-variant" 
                          className={`w-5 h-5 mr-2 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`}
                        />
                        <span className={`text-sm font-medium ${
                          isSelected ? 'text-purple-900' : 'text-gray-700'
                        }`}>
                          {subjectName}
                        </span>
                      </div>
                      {isSelected && (
                        <Icon icon="mdi:check-circle" className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected Count */}
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold text-purple-600">{selectedSubjectIds.length}</span> mata pelajaran dipilih
            </p>
          </div>

          </form>
        </div>

        {/* Modal Footer - Sticky Buttons */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-white rounded-b-xl flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="submit"
            form="packageForm"
            disabled={submitting}
            className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all ${
              submitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white`}
          >
            {submitting ? (
              <>
                <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Icon icon="mdi:check" className="w-5 h-5 mr-2" />
                Simpan Paket
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPackageModal;
