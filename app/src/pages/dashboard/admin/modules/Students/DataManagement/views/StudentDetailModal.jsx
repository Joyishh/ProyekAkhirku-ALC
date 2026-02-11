import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import studentService from '../../../../../../../services/studentService';
import { toast } from 'react-toastify';

const StudentDetailModal = ({
  isOpen,
  studentId,
  onClose,
  onSaveSuccess
}) => {
  // State management
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    username: '',
    dob: '',
    gender: '',
    address: '',
    classLevel: '',
    parentName: '',
    parentPhone: '',
    status: '',
    program: ''
  });

  // Fetch student detail when modal opens or studentId changes
  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        setLoading(true);
        const response = await studentService.getStudentDetail(studentId);
        
        if (response.success && response.data) {
          const student = response.data;
          setSelectedStudent(student);
          
          // Initialize edit form data
          setEditFormData({
            name: student.fullname || '',
            email: student.user?.email || '',
            username: student.user?.username || '',
            dob: student.dateOfBirth || '',
            gender: student.genderDisplay || '',
            address: student.address || '',
            classLevel: student.classLevel || '',
            parentName: student.parent?.parentName || '',
            parentPhone: student.parent?.parentPhone || '',
            status: student.enrollments?.[0]?.status || 'inactive',
            program: student.activeProgram || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch student detail:', error);
        toast.error('Gagal memuat detail siswa');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && studentId) {
      fetchStudentDetail();
    }
  }, [isOpen, studentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Reset form data when entering edit mode
      setEditFormData({
        name: selectedStudent.fullname || '',
        email: selectedStudent.user?.email || '',
        username: selectedStudent.user?.username || '',
        dob: selectedStudent.dateOfBirth || '',
        gender: selectedStudent.genderDisplay || '',
        address: selectedStudent.address || '',
        classLevel: selectedStudent.classLevel || '',
        parentName: selectedStudent.parent?.parentName || '',
        parentPhone: selectedStudent.parent?.parentPhone || '',
        status: selectedStudent.enrollments?.[0]?.status || 'inactive',
        program: selectedStudent.activeProgram || ''
      });
    }
  };

  const onCancelEdit = () => {
    setIsEditMode(false);
    // Reset form data to original values
    if (selectedStudent) {
      setEditFormData({
        name: selectedStudent.fullname || '',
        email: selectedStudent.user?.email || '',
        username: selectedStudent.user?.username || '',
        dob: selectedStudent.dateOfBirth || '',
        gender: selectedStudent.genderDisplay || '',
        address: selectedStudent.address || '',
        classLevel: selectedStudent.classLevel || '',
        parentName: selectedStudent.parent?.parentName || '',
        parentPhone: selectedStudent.parent?.parentPhone || '',
        status: selectedStudent.enrollments?.[0]?.status || 'inactive',
        program: selectedStudent.activeProgram || ''
      });
    }
  };

  const onSaveChanges = async () => {
    try {
      setIsSaving(true);

      // Prepare update payload
      const updatePayload = {
        fullname: editFormData.name,
        dateOfBirth: editFormData.dob,
        gender: editFormData.gender,
        address: editFormData.address,
        classLevel: editFormData.classLevel,
        parentName: editFormData.parentName,
        parentPhone: editFormData.parentPhone
      };

      const response = await studentService.updateStudent(studentId, updatePayload);

      if (response.success) {
        toast.success('Data siswa berhasil diperbarui');
        setIsEditMode(false);
        
        // Refresh student detail
        const refreshResponse = await studentService.getStudentDetail(studentId);
        if (refreshResponse.success && refreshResponse.data) {
          const student = refreshResponse.data;
          setSelectedStudent(student);
          
          setEditFormData({
            name: student.fullname || '',
            email: student.user?.email || '',
            username: student.user?.username || '',
            dob: student.dateOfBirth || '',
            gender: student.genderDisplay || '',
            address: student.address || '',
            classLevel: student.classLevel || '',
            parentName: student.parent?.parentName || '',
            parentPhone: student.parent?.parentPhone || '',
            status: student.enrollments?.[0]?.status || 'inactive',
            program: student.activeProgram || ''
          });
        }
        
        // Notify parent component
        if (onSaveSuccess) {
          onSaveSuccess();
        }
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      toast.error(error.message || 'Gagal memperbarui data siswa');
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = () => {
    // TODO: Implement delete functionality
    toast.info('Delete functionality will be implemented');
  };

  if (!isOpen) return null;

  // Loading state
  if (loading) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
        onClick={onClose}
      >
        <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center">
          <CircularProgress size={50} sx={{ color: '#10b981' }} />
          <p className="mt-4 text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!selectedStudent) return null;

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
                value={isEditMode ? editFormData.username : selectedStudent.user?.username || 'N/A'}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ readOnly: true }} // Username cannot be changed
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
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
                value={isEditMode ? editFormData.email : selectedStudent.user?.email || 'N/A'}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{ readOnly: true }} // Email cannot be changed here
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                  },
                }}
              />

              {/* Status */}
              <TextField
                fullWidth
                size="small"
                label="Status"
                value={selectedStudent.enrollments?.[0]?.status === 'aktif' ? 'Active' : 'Inactive'}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: selectedStudent.enrollments?.[0]?.status === 'aktif' ? '#d1fae5' : '#fee2e2',
                    '& input': {
                      color: selectedStudent.enrollments?.[0]?.status === 'aktif' ? '#065f46' : '#991b1b',
                      fontWeight: 600,
                    },
                  },
                }}
              />

              {/* Joined Date - Always Read-only */}
              <TextField
                fullWidth
                size="small"
                label="Joined Date"
                value={selectedStudent.joined || 'N/A'}
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
                value={isEditMode ? editFormData.name : selectedStudent.fullname || 'N/A'}
                onChange={handleInputChange}
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
                value={isEditMode ? editFormData.dob : selectedStudent.dateOfBirth || ''}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  value={selectedStudent.genderDisplay || 'N/A'}
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

              {/* Class Level */}
              <TextField
                fullWidth
                size="small"
                label="Class Level"
                name="classLevel"
                value={isEditMode ? editFormData.classLevel : selectedStudent.classLevel || '-'}
                onChange={handleInputChange}
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

              {/* Address - Full Width */}
              <div className="md:col-span-2">
                <TextField
                  fullWidth
                  size="small"
                  label="Address"
                  name="address"
                  value={isEditMode ? editFormData.address : selectedStudent.address || 'N/A'}
                  onChange={handleInputChange}
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
                value={isEditMode ? editFormData.parentName : selectedStudent.parent?.parentName || 'N/A'}
                onChange={handleInputChange}
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
                value={isEditMode ? editFormData.parentPhone : selectedStudent.parent?.parentPhone || 'N/A'}
                onChange={handleInputChange}
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
              <TextField
                fullWidth
                size="small"
                label="Active Program"
                value={selectedStudent.activeProgram || 'No Active Program'}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                  },
                }}
              />

              {/* Enrollment History Count */}
              <TextField
                fullWidth
                size="small"
                label="Total Enrollments"
                value={selectedStudent.enrollments?.length || 0}
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