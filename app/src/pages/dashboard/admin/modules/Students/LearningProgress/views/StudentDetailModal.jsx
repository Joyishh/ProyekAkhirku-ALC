import React from 'react';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';

const StudentDetailModal = ({
  showDetailModal,
  selectedStudent,
  selectedClass,
  isEditMode,
  editFormData,
  getGradeColor,
  calculateOverallAverage,
  onClose,
  onEditToggle,
  onInputChange,
  onSaveChanges
}) => {
  if (!showDetailModal || !selectedStudent || !editFormData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Icon icon="mdi:account-circle" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{selectedStudent.name}</h2>
              <p className="text-indigo-100 text-sm">{selectedStudent.studentId} • {selectedClass.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditMode ? (
              <button
                onClick={onEditToggle}
                className="text-white hover:bg-white hover:text-indigo-600 rounded-lg p-2 transition-all cursor-pointer"
                title="Edit Grades"
              >
                <Icon icon="mdi:pencil" className="w-6 h-6" />
              </button>
            ) : (
              <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Edit Mode
              </span>
            )}
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:text-indigo-600 rounded-lg p-2 transition-all cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Grades Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              <Icon icon="mdi:clipboard-text" className="w-5 h-5 mr-2 text-indigo-600" />
              Academic Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assignment Score */}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Assignment Score"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={editFormData.assignment}
                  onChange={(e) => onInputChange('assignment', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#6366f1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5',
                    },
                  }}
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Assignment Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(editFormData.assignment)}`}>
                    {editFormData.assignment}
                  </p>
                </div>
              )}

              {/* Mid Exam Score */}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Mid Exam Score"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={editFormData.midExam}
                  onChange={(e) => onInputChange('midExam', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#6366f1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5',
                    },
                  }}
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Mid Exam Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(editFormData.midExam)}`}>
                    {editFormData.midExam}
                  </p>
                </div>
              )}

              {/* Final Exam Score */}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Final Exam Score"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={editFormData.finalExam}
                  onChange={(e) => onInputChange('finalExam', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#6366f1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5',
                    },
                  }}
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Final Exam Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(editFormData.finalExam)}`}>
                    {editFormData.finalExam}
                  </p>
                </div>
              )}

              {/* Attendance Score */}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Attendance (%)"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={editFormData.attendance}
                  onChange={(e) => onInputChange('attendance', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#6366f1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4F46E5',
                        borderWidth: '2px',
                      },
                    },
                    '& label.Mui-focused': {
                      color: '#4F46E5',
                    },
                  }}
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Attendance (%)
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(editFormData.attendance)}`}>
                    {editFormData.attendance}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Average Display */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon icon="mdi:chart-box" className="w-6 h-6 text-indigo-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Overall Average</span>
              </div>
              <span className={`text-2xl font-bold ${getGradeColor(calculateOverallAverage(editFormData))}`}>
                {calculateOverallAverage(editFormData)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          {isEditMode ? (
            <>
              <button
                onClick={() => {
                  onEditToggle();
                }}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onSaveChanges}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center cursor-pointer"
              >
                <Icon icon="mdi:content-save" className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
