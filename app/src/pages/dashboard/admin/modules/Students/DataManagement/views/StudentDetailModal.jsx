import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem } from '@mui/material';

const StudentDetailModal = ({
  isOpen,
  selectedStudent,
  isEditMode,
  editFormData,
  isSaving,
  onClose,
  onEditToggle,
  onSaveChanges,
  onCancelEdit,
  onDelete,
  onInputChange
}) => {
  if (!isOpen || !selectedStudent) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Icon icon="mdi:account-circle" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Student Details</h2>
              <p className="text-emerald-100 text-sm">{selectedStudent.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditMode ? (
              <button
                onClick={onEditToggle}
                className="flex items-center px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-900 rounded-lg font-medium transition-all shadow-sm cursor-pointer"
              >
                <Icon icon="mdi:pencil" className="w-5 h-5 mr-2" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={onSaveChanges}
                  disabled={isSaving}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    isSaving 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isSaving ? (
                    <>
                      <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:content-save" className="w-5 h-5 mr-2 cursor-pointer" />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={onCancelEdit}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-900 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Icon icon="mdi:close" className="w-5 h-5 mr-2" />
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="text-white hover:text-emerald-900 hover:bg-white rounded-lg p-2 transition-all cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Account Information Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b-2 border-emerald-500">
              <Icon icon="mdi:account-key" className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Account Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Username */}
              <TextField
                fullWidth
                size="small"
                label="Username"
                name="username"
                value={isEditMode ? editFormData.username : selectedStudent.username}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                size="small"
                label="Email"
                name="email"
                type="email"
                value={isEditMode ? editFormData.email : selectedStudent.email}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Status */}
              {isEditMode ? (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Status"
                  name="status"
                  value={editFormData.status}
                  onChange={onInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#10b981',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10b981',
                        borderWidth: '2px',
                      },
                    },
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label="Status"
                  value={selectedStudent.status === 'active' ? 'Active' : 'Inactive'}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: selectedStudent.status === 'active' ? '#d1fae5' : '#fee2e2',
                      '& input': {
                        color: selectedStudent.status === 'active' ? '#065f46' : '#991b1b',
                        fontWeight: 600,
                      },
                    },
                  }}
                />
              )}

              {/* Joined Date - Always Read-only */}
              <TextField
                fullWidth
                size="small"
                label="Joined Date"
                value={selectedStudent.joined}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                  },
                }}
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b-2 border-blue-500">
              <Icon icon="mdi:account-details" className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                name="name"
                value={isEditMode ? editFormData.name : selectedStudent.name}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Date of Birth */}
              <TextField
                fullWidth
                size="small"
                label="Date of Birth"
                name="dob"
                type="date"
                value={isEditMode ? editFormData.dob : selectedStudent.dob}
                onChange={onInputChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Gender */}
              {isEditMode ? (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Gender"
                  name="gender"
                  value={editFormData.gender}
                  onChange={onInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#10b981',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10b981',
                        borderWidth: '2px',
                      },
                    },
                  }}
                >
                  <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label="Gender"
                  value={selectedStudent.gender}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                />
              )}

              {/* Address - Full Width */}
              <div className="md:col-span-2">
                <TextField
                  fullWidth
                  size="small"
                  label="Address"
                  name="address"
                  value={isEditMode ? editFormData.address : selectedStudent.address}
                  onChange={onInputChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  InputProps={{ readOnly: !isEditMode }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                      '&:hover fieldset': {
                        borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10b981',
                        borderWidth: '2px',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Parent Information Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b-2 border-orange-500">
              <Icon icon="mdi:account-supervisor" className="w-6 h-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Parent Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Parent Name */}
              <TextField
                fullWidth
                size="small"
                label="Parent Name"
                name="parentName"
                value={isEditMode ? editFormData.parentName : selectedStudent.parentName}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Parent Phone */}
              <TextField
                fullWidth
                size="small"
                label="Parent Phone"
                name="parentPhone"
                type="tel"
                value={isEditMode ? editFormData.parentPhone : selectedStudent.parentPhone}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{ readOnly: !isEditMode }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: !isEditMode ? '#f9fafb' : 'transparent',
                    '&:hover fieldset': {
                      borderColor: isEditMode ? '#10b981' : '#e5e7eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      borderWidth: '2px',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Academic Information Section */}
          <div>
            <div className="flex items-center mb-4 pb-2 border-b-2 border-purple-500">
              <Icon icon="mdi:school" className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Academic Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Program */}
              {isEditMode ? (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Program"
                  name="program"
                  value={editFormData.program}
                  onChange={onInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#10b981',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10b981',
                        borderWidth: '2px',
                      },
                    },
                  }}
                >
                  <MenuItem value="Paket Reguler SMA">Paket Reguler SMA</MenuItem>
                  <MenuItem value="Paket Intensif SMA">Paket Intensif SMA</MenuItem>
                  <MenuItem value="Paket UTBK">Paket UTBK</MenuItem>
                  <MenuItem value="Paket Private">Paket Private</MenuItem>
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label="Program"
                  value={selectedStudent.program}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onDelete}
            className="flex items-center px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all cursor-pointer"
          >
            <Icon icon="mdi:delete" className="w-5 h-5 mr-2" />
            Delete Student
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
