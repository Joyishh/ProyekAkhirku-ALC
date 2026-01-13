import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem } from '@mui/material';

/**
 * RegisterForm - Registration form for new students
 * @param {Object} props
 * @param {Object} props.formData - Form data object
 * @param {Object} props.errors - Form validation errors
 * @param {Array} props.packageOptions - Available package options
 * @param {Function} props.onInputChange - Handler for input changes
 * @param {Function} props.onSubmit - Handler for form submission
 * @param {Function} props.onCancel - Handler to cancel and go back
 */
const RegisterForm = ({ 
  formData, 
  errors, 
  packageOptions, 
  onInputChange, 
  onSubmit, 
  onCancel 
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon icon="mdi:account-plus" className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Register New Student</h1>
              <p className="text-gray-600">Fill in student information to create a new registration</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
            Back to Menu
          </button>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={onSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Section 1: Account Information */}
        <div className="mb-8">
          <div className="flex items-center mb-6 pb-3 border-b-2 border-blue-500">
            <Icon icon="mdi:account-key" className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Akun Siswa</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Username */}
            <TextField
              fullWidth
              size="small"
              label="Username"
              name="username"
              value={formData.username}
              onChange={onInputChange}
              variant="outlined"
              placeholder="e.g., ahmad.pratama"
              error={!!errors.username}
              helperText={errors.username}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              variant="outlined"
              placeholder="e.g., ahmad@email.com"
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              size="small"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={onInputChange}
              variant="outlined"
              placeholder="Minimal 6 karakter"
              error={!!errors.password}
              helperText={errors.password}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              size="small"
              label="Konfirmasi Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={onInputChange}
              variant="outlined"
              placeholder="Ketik ulang password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />
          </div>
        </div>

        {/* Section 2: Personal Data & Package */}
        <div className="mb-8">
          <div className="flex items-center mb-6 pb-3 border-b-2 border-blue-500">
            <Icon icon="mdi:account-details" className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Data Pribadi & Paket</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <TextField
              fullWidth
              size="small"
              label="Nama Lengkap"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              variant="outlined"
              placeholder="Masukkan nama lengkap"
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Date of Birth */}
            <TextField
              fullWidth
              size="small"
              label="Tanggal Lahir"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={onInputChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Gender */}
            <TextField
              select
              fullWidth
              size="small"
              label="Jenis Kelamin"
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
              variant="outlined"
              error={!!errors.gender}
              helperText={errors.gender}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            >
              <MenuItem value="">Pilih jenis kelamin</MenuItem>
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </TextField>

            {/* Package Selection */}
            <TextField
              select
              fullWidth
              size="small"
              label="Paket Belajar"
              name="selectedPackage"
              value={formData.selectedPackage}
              onChange={onInputChange}
              variant="outlined"
              error={!!errors.selectedPackage}
              helperText={errors.selectedPackage}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            >
              <MenuItem value="">Pilih paket belajar</MenuItem>
              {packageOptions.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.name}>
                  {pkg.name} - {pkg.price}
                </MenuItem>
              ))}
            </TextField>

            {/* Payment Method */}
            <TextField
              select
              fullWidth
              size="small"
              label="Metode Pembayaran"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={onInputChange}
              variant="outlined"
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            >
              <MenuItem value="">Pilih metode pembayaran</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Transfer Bank">Transfer Bank</MenuItem>
            </TextField>

            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <TextField
                fullWidth
                size="small"
                label="Alamat Lengkap"
                name="address"
                value={formData.address}
                onChange={onInputChange}
                variant="outlined"
                multiline
                rows={3}
                placeholder="Masukkan alamat lengkap"
                error={!!errors.address}
                helperText={errors.address}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      borderWidth: '2px',
                    },
                  } 
                }}
              />
            </div>

            {/* Parent Name */}
            <TextField
              fullWidth
              size="small"
              label="Nama Orang Tua"
              name="parentName"
              value={formData.parentName}
              onChange={onInputChange}
              variant="outlined"
              placeholder="Nama orang tua/wali"
              error={!!errors.parentName}
              helperText={errors.parentName}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />

            {/* Parent Phone */}
            <TextField
              fullWidth
              size="small"
              label="No HP Orang Tua"
              name="parentPhone"
              type="tel"
              value={formData.parentPhone}
              onChange={onInputChange}
              variant="outlined"
              placeholder="e.g., 081234567890"
              error={!!errors.parentPhone}
              helperText={errors.parentPhone}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: '2px',
                  },
                } 
              }}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Wajib diisi
          </p>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center cursor-pointer"
            >
              <Icon icon="mdi:content-save" className="w-5 h-5 mr-2" />
              Submit Pendaftaran
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
