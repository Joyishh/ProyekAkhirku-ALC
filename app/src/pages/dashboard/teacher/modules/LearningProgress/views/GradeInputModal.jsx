import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const GradeInputModal = ({ 
  isOpen, 
  student, 
  selectedClass,
  onClose, 
  onSave 
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [gradeData, setGradeData] = useState({
    assignmentScore: 0,
    midExamScore: 0,
    finalExamScore: 0,
    attendance: 0
  });
  const [originalGradeData, setOriginalGradeData] = useState({});

  useEffect(() => {
    if (student) {
      const initialGrades = {
        assignmentScore: student.grades?.assignmentScore || 0,
        midExamScore: student.grades?.midExamScore || 0,
        finalExamScore: student.grades?.finalExamScore || 0,
        attendance: student.attendanceRate || 0
      };
      setGradeData(initialGrades);
      setOriginalGradeData(initialGrades);
      setIsEditMode(false);
    }
  }, [student]);

  const handleGradeChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    // Validate range 0-100
    if (numValue < 0 || numValue > 100) return;
    
    setGradeData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const getModalFinalScore = () => {
    const { assignmentScore, midExamScore, finalExamScore } = gradeData;
    return Math.round((assignmentScore + midExamScore + finalExamScore) / 3);
  };

  const getGradeColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSaveGrades = async () => {
    // Dirty check
    const hasChanges = 
      gradeData.assignmentScore !== originalGradeData.assignmentScore ||
      gradeData.midExamScore !== originalGradeData.midExamScore ||
      gradeData.finalExamScore !== originalGradeData.finalExamScore ||
      gradeData.attendance !== originalGradeData.attendance;

    if (!hasChanges) {
      toast.info('No changes detected', {
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }

    // Confirmation dialog
    const result = await Swal.fire({
      title: 'Update Student Grades?',
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p style="margin-bottom: 12px;">You are about to update grades for <strong>${student.name}</strong></p>
          <div style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
            <p><strong>Assignment:</strong> ${gradeData.assignmentScore}</p>
            <p><strong>Mid Exam:</strong> ${gradeData.midExamScore}</p>
            <p><strong>Final Exam:</strong> ${gradeData.finalExamScore}</p>
            <p><strong>Attendance:</strong> ${gradeData.attendance}%</p>
            <p style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;"><strong>Overall Average:</strong> ${getModalFinalScore()}</p>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Save Changes',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const container = document.querySelector('.swal2-container');
        if (container) {
          container.style.zIndex = '9999';
        }
      }
    });

    if (result.isConfirmed) {
      onSave(student.id, gradeData);
      setIsEditMode(false);
      onClose();
    }
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
    onClose();
  };

  if (!isOpen || !student) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleCloseModal}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blue Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon icon="mdi:account" className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {student?.name}
                </h3>
                <p className="text-sm text-blue-100">
                  {student?.studentId} • {selectedClass?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditMode ? (
                <span className="px-3 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium">
                  Edit Mode
                </span>
              ) : (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Icon icon="mdi:pencil" className="w-5 h-5 text-white" />
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Icon icon="mdi:close" className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Grades Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              <Icon icon="mdi:clipboard-text" className="w-5 h-5 mr-2 text-blue-600" />
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
                  value={gradeData.assignmentScore}
                  onChange={(e) => handleGradeChange('assignmentScore', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Assignment Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(gradeData.assignmentScore)}`}>
                    {gradeData.assignmentScore}
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
                  value={gradeData.midExamScore}
                  onChange={(e) => handleGradeChange('midExamScore', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Mid Exam Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(gradeData.midExamScore)}`}>
                    {gradeData.midExamScore}
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
                  value={gradeData.finalExamScore}
                  onChange={(e) => handleGradeChange('finalExamScore', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Final Exam Score
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(gradeData.finalExamScore)}`}>
                    {gradeData.finalExamScore}
                  </p>
                </div>
              )}

              {/* Attendance */}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Attendance (%)"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={gradeData.attendance}
                  onChange={(e) => handleGradeChange('attendance', e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                />
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Attendance (%)
                  </label>
                  <p className={`text-2xl font-bold ${getGradeColor(gradeData.attendance)}`}>
                    {gradeData.attendance}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Average Display */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon icon="mdi:chart-box" className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Overall Average</span>
              </div>
              <span className={`text-2xl font-bold ${getGradeColor(getModalFinalScore())}`}>
                {getModalFinalScore()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3">
          {isEditMode ? (
            <>
              <button 
                onClick={() => setIsEditMode(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveGrades}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2 cursor-pointer"
              >
                <Icon icon="mdi:content-save" className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button 
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeInputModal;
