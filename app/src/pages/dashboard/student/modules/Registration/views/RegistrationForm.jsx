import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const RegistrationForm = ({
  formData,
  errors,
  isSubmitting,
  packageOptions,
  classLevels,
  colorClasses,
  studentData,
  canSubmitForm,
  handleInputChange,
  handlePackageSelect,
  handleSubmit,
  handleNavigateToPayment
}) => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Formulir Pendaftaran Siswa Baru
          </h1>
          <p className="mt-2 text-gray-600">
            Lengkapi data siswa dan orang tua untuk melanjutkan.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-blue-200 mb-6" />

        {/* Registration Status (if exists) */}
        {studentData?.registrationStatus && studentData.registrationStatus !== 'none' && (
          <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Status Pendaftaran</h3>
            <div className="flex items-center">
              <Icon 
                icon={
                  studentData.registrationStatus === 'approved' ? 'mdi:check-circle' :
                  studentData.registrationStatus === 'pending' ? 'mdi:clock-outline' :
                  'mdi:close-circle'
                } 
                className={`w-6 h-6 mr-3 ${
                  studentData.registrationStatus === 'approved' ? 'text-green-500' :
                  studentData.registrationStatus === 'pending' ? 'text-yellow-500' :
                  'text-red-500'
                }`} 
              />
              <span className="font-medium">
                {studentData.registrationStatus === 'approved' ? 'Disetujui' :
                 studentData.registrationStatus === 'pending' ? 'Menunggu Persetujuan' :
                 'Ditolak'}
              </span>
            </div>
            
            {studentData.registrationNote && (
              <div className={`mt-4 p-4 rounded-lg border ${
                studentData.registrationStatus === 'rejected' 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-blue-200 bg-blue-50'
              }`}>
                <p className={`text-sm ${
                  studentData.registrationStatus === 'rejected' 
                    ? 'text-red-700' 
                    : 'text-blue-700'
                }`}>
                  <span className="font-medium">Catatan Admin:</span> {studentData.registrationNote}
                </p>
              </div>
            )}
          </div>
        )}

        {canSubmitForm && (
          <form onSubmit={handleSubmit}>
            {/* Form Grid - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Left Column - Data Siswa */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <Icon icon="mdi:account" className="text-xl text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Data Siswa</h2>
                </div>

                <div className="flex flex-col">
                  {/* Nama Lengkap Siswa */}
                  <TextField
                    fullWidth
                    size="small"
                    id="studentName"
                    name="studentName"
                    label="Nama Lengkap Siswa"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    error={!!errors.studentName}
                    helperText={errors.studentName}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  />

                  {/* Tanggal Lahir & Jenis Kelamin */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '24px' }}>
                    <TextField
                      fullWidth
                      size="small"
                      id="birthDate"
                      name="birthDate"
                      label="Tanggal Lahir"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      error={!!errors.birthDate}
                      helperText={errors.birthDate}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&:hover fieldset': {
                            borderColor: '#3b82f6',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    />

                    <FormControl 
                      fullWidth
                      size="small"
                      error={!!errors.gender}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&:hover fieldset': {
                            borderColor: '#3b82f6',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    >
                      <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        label="Jenis Kelamin"
                      >
                        <MenuItem value="">Pilih Jenis Kelamin</MenuItem>
                        <MenuItem value="male">Laki-laki</MenuItem>
                        <MenuItem value="female">Perempuan</MenuItem>
                      </Select>
                      {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>
                  </div>

                  {/* Tingkat Kelas */}
                  <FormControl 
                    fullWidth
                    size="small"
                    error={!!errors.gradeLevel}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  >
                    <InputLabel id="gradeLevel-label">Tingkat Kelas</InputLabel>
                    <Select
                      labelId="gradeLevel-label"
                      id="gradeLevel"
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleInputChange}
                      label="Tingkat Kelas"
                    >
                      <MenuItem value="">Pilih Tingkat Kelas</MenuItem>
                      {classLevels.map((level) => (
                        <MenuItem key={level} value={level}>{level}</MenuItem>
                      ))}
                    </Select>
                    {errors.gradeLevel && <FormHelperText>{errors.gradeLevel}</FormHelperText>}
                  </FormControl>

                  {/* Alamat Lengkap */}
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    name="address"
                    label="Alamat Lengkap"
                    placeholder="Masukkan alamat domisili saat ini"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={3}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Data Orang Tua / Wali */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <Icon icon="mdi:account-supervisor" className="text-xl text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Data Orang Tua / Wali</h2>
                </div>

                <div className="flex flex-col">
                  {/* Nama Orang Tua / Wali */}
                  <TextField
                    fullWidth
                    size="small"
                    id="parentName"
                    name="parentName"
                    label="Nama Orang Tua / Wali"
                    placeholder="Nama Lengkap Orang Tua"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    error={!!errors.parentName}
                    helperText={errors.parentName}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  />

                  {/* Nomor Telepon (WhatsApp) */}
                  <TextField
                    fullWidth
                    size="small"
                    id="parentPhone"
                    name="parentPhone"
                    label="Nomor Telepon (WhatsApp)"
                    placeholder="0812xxxx"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    error={!!errors.parentPhone}
                    helperText={errors.parentPhone}
                    InputProps={{
                      startAdornment: <Icon icon="mdi:phone" className="text-gray-400 mr-2" />,
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  />

                  {/* Email Orang Tua / Wali */}
                  <TextField
                    fullWidth
                    size="small"
                    id="parentEmail"
                    name="parentEmail"
                    label="Email Orang Tua / Wali"
                    type="email"
                    placeholder="email@contoh.com"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    error={!!errors.parentEmail}
                    helperText={errors.parentEmail}
                    InputProps={{
                      startAdornment: <Icon icon="mdi:email-outline" className="text-gray-400 mr-2" />,
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3b82f6',
                      },
                    }}
                  />

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Icon icon="mdi:information" className="text-blue-500 text-lg mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Pastikan nomor telepon yang didaftarkan aktif dan terhubung dengan WhatsApp untuk menerima informasi jadwal dan tagihan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-8" />

            {/* Pilih Paket Bimbel Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Icon icon="mdi:package-variant" className="text-xl text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Pilih Paket Bimbel</h2>
              </div>
              
              {errors.selectedPackage && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <Icon icon="mdi:alert-circle" className="inline mr-1" />
                  {errors.selectedPackage}
                </p>
              )}

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packageOptions.map((pkg) => {
                  const colors = colorClasses[pkg.color];
                  const isSelected = formData.selectedPackage === pkg.id;
                  
                  return (
                    <label
                      key={pkg.id}
                      className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-md ${
                        isSelected 
                          ? `${colors.borderSelected} ${colors.bg} shadow-md` 
                          : `border-gray-200 bg-white hover:border-gray-300`
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedPackage"
                        value={pkg.id}
                        checked={isSelected}
                        onChange={() => handlePackageSelect(pkg.id)}
                        className="sr-only"
                      />
                      
                      {/* Check Icon */}
                      <div className={`absolute top-4 right-4 transition-opacity duration-200 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <Icon icon="mdi:check-circle" className={`text-xl ${colors.check}`} />
                      </div>
                      
                      {/* Package Icon */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colors.icon}`}>
                        <Icon icon={pkg.icon} className="text-2xl" />
                      </div>
                      
                      {/* Package Name */}
                      <h3 className="font-semibold text-gray-900 mb-1 pr-6">{pkg.name}</h3>
                      
                      {/* Package Subtitle */}
                      <p className="text-sm text-gray-500 mb-3">{pkg.subtitle}</p>
                      
                      {/* Features List */}
                      <ul className="space-y-1.5">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <Icon icon="mdi:check" className={`mr-2 mt-0.5 flex-shrink-0 ${colors.check}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-8" />

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition-all duration-200 cursor-pointer"
              >
                Kembali
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin mr-2" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Lanjutkan Pendaftaran
                    <Icon icon="mdi:arrow-right" className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Form Already Submitted - Pending or Approved */}
        {!canSubmitForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:check-circle" className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {studentData?.registrationStatus === 'pending' 
                  ? 'Pendaftaran Sedang Diproses' 
                  : 'Pendaftaran Telah Disetujui'}
              </h3>
              <p className="text-gray-600 mb-4">
                {studentData?.registrationStatus === 'pending' 
                  ? 'Pendaftaran Anda sedang dalam proses verifikasi oleh admin.'
                  : 'Selamat! Pendaftaran Anda telah disetujui. Silakan lanjutkan ke pembayaran.'
                }
              </p>
              
              {studentData?.registrationStatus === 'approved' && (
                <button
                  onClick={handleNavigateToPayment}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    <Icon icon="mdi:credit-card" className="w-4 h-4 mr-2" />
                    Lanjut ke Pembayaran
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;