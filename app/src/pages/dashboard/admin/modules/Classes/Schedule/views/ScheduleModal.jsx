import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';

const ScheduleModal = ({
  showScheduleModal,
  setShowScheduleModal,
  editingSchedule,
  formData,
  handleInputChange,
  availableClasses,
  availableTeachers,
  rooms,
  days,
  timeSlots,
  isCapacityExceeded,
  getSelectedRoomCapacity,
  handleSelectAllStudents,
  handleDeselectAllStudents,
  studentSearchQuery,
  setStudentSearchQuery,
  filteredAvailableStudents,
  handleToggleStudent,
  handleSaveSchedule
}) => {
  if (!showScheduleModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
            </h2>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Section A: Class Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Icon icon="mdi:information" className="w-5 h-5 text-blue-600" />
                <span>Class Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Class Name */}
                <TextField
                  select
                  fullWidth
                  label="Class Name"
                  variant="outlined"
                  value={formData.className}
                  onChange={(e) => handleInputChange('className', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {availableClasses.map(cls => (
                    <MenuItem key={cls.id} value={cls.name}>
                      {cls.name} ({cls.package})
                    </MenuItem>
                  ))}
                </TextField>

                {/* Teacher */}
                <TextField
                  select
                  fullWidth
                  label="Teacher"
                  variant="outlined"
                  value={formData.teacher}
                  onChange={(e) => handleInputChange('teacher', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select Teacher</MenuItem>
                  {availableTeachers.map(teacher => (
                    <MenuItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Room */}
                <TextField
                  select
                  fullWidth
                  label="Room"
                  variant="outlined"
                  value={formData.room}
                  onChange={(e) => handleInputChange('room', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select Room</MenuItem>
                  {rooms.map(room => (
                    <MenuItem key={room.id} value={room.name}>
                      {room.name} (Cap: {room.capacity})
                    </MenuItem>
                  ))}
                </TextField>

                {/* Day */}
                <TextField
                  select
                  fullWidth
                  label="Day"
                  variant="outlined"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select Day</MenuItem>
                  {days.map(day => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Start Time */}
                <TextField
                  select
                  fullWidth
                  label="Start Time"
                  variant="outlined"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select Start Time</MenuItem>
                  {timeSlots.map(time => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>

                {/* End Time */}
                <TextField
                  select
                  fullWidth
                  label="End Time"
                  variant="outlined"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#2563eb',
                    },
                  }}
                >
                  <MenuItem value="">Select End Time</MenuItem>
                  {timeSlots.map(time => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Section B: Student Rostering */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-600" />
                  <span>Select Students</span>
                  <span className={`text-sm font-semibold ${
                    isCapacityExceeded() ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    ({formData.assignedStudents.length}/{getSelectedRoomCapacity() || '?'})
                  </span>
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSelectAllStudents}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleDeselectAllStudents}
                    className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {/* Capacity Warning */}
              {isCapacityExceeded() && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">
                    Warning: Selected students ({formData.assignedStudents.length}) exceed room capacity ({getSelectedRoomCapacity()})!
                  </p>
                </div>
              )}

              {/* Student Search */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search student by name or ID..."
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="mdi:magnify" width={20} className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: '16px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {/* Student List with Checkboxes */}
              <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
                {filteredAvailableStudents.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Icon icon="mdi:account-search" className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No students found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredAvailableStudents.map(student => {
                      const isSelected = formData.assignedStudents.includes(student.id);
                      return (
                        <label
                          key={student.id}
                          className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            isSelected ? 'bg-blue-50' : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleStudent(student.id)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-800">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.studentId}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                student.package === 'Intensive' 
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {student.package}
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSchedule}
              disabled={isCapacityExceeded()}
              className={`px-6 py-2 rounded-lg transition-colors font-medium cursor-pointer ${
                isCapacityExceeded()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
