import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextField, CircularProgress } from '@mui/material';
import teacherService from '../../../../../../services/teacherService.js';
import { toast } from 'react-toastify';

const AddTeacherModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    phone: '',
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      phone: '',
      specialization: ''
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Nama lengkap wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Mohon lengkapi form dengan benar');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullname: formData.fullname.trim(),
        phone: formData.phone.trim() || null,
        specialization: formData.specialization.trim() || null
      };

      const response = await teacherService.createTeacher(payload);

      if (response.success) {
        toast.success('Guru berhasil ditambahkan');
        resetForm();
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Failed to create teacher:', error);
      toast.error(error.message || 'Gagal menambahkan guru');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
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
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Icon icon="mdi:account-plus" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Tambah Guru Baru</h2>
              <p className="text-blue-100 text-sm">Buat akun dan profil guru</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white hover:text-blue-900 hover:bg-white rounded-lg p-2 transition-all disabled:opacity-50"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Account Information Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b-2 border-blue-500">
              <Icon icon="mdi:account-key" className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Informasi Akun</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                size="small"
                label="Username *"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password || 'Minimal 6 karakter'}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="Konfirmasi Password *"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div>
            <div className="flex items-center mb-4 pb-2 border-b-2 border-green-500">
              <Icon icon="mdi:account-details" className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Informasi Pribadi</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                size="small"
                label="Nama Lengkap *"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                error={!!errors.fullname}
                helperText={errors.fullname}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                label="No. Telepon"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              <div className="md:col-span-2">
                <TextField
                  fullWidth
                  size="small"
                  label="Spesialisasi"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Contoh: Matematika, Fisika, Bahasa Inggris"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#2563eb',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end items-center space-x-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                Menyimpan...
              </>
            ) : (
              <>
                <Icon icon="mdi:content-save" className="w-5 h-5 mr-2" />
                Simpan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;