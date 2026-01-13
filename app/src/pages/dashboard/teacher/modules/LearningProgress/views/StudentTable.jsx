import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Chip } from '@mui/material';
import { toast } from 'react-toastify';
import GradeInputModal from './GradeInputModal';

const StudentTable = ({ selectedClass, onBackClick }) => {
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sample data siswa dalam kelas dengan nilai lengkap
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      studentId: "STU-2024-001",
      email: "sarah.johnson@email.com",
      photo: "👩‍🎓",
      attendanceRate: 95,
      status: "graded",
      grades: {
        assignmentScore: 85,
        midExamScore: 88,
        finalExamScore: 82
      }
    },
    {
      id: 2,
      name: "Michael Brown",
      studentId: "STU-2024-002",
      email: "michael.brown@email.com", 
      photo: "👨‍🎓",
      attendanceRate: 88,
      status: "graded",
      grades: {
        assignmentScore: 75,
        midExamScore: 70,
        finalExamScore: 68
      }
    },
    {
      id: 3,
      name: "Lisa Wong",
      studentId: "STU-2024-003",
      email: "lisa.wong@email.com",
      photo: "👩‍🎓", 
      attendanceRate: 98,
      status: "graded",
      grades: {
        assignmentScore: 92,
        midExamScore: 91,
        finalExamScore: 90
      }
    },
    {
      id: 4,
      name: "David Martinez",
      studentId: "STU-2024-004",
      email: "david.martinez@email.com",
      photo: "👨‍🎓",
      attendanceRate: 75,
      status: "pending",
      grades: {
        assignmentScore: 0,
        midExamScore: 0,
        finalExamScore: 0
      }
    },
    {
      id: 5,
      name: "Emma Thompson", 
      studentId: "STU-2024-005",
      email: "emma.thompson@email.com",
      photo: "👩‍🎓",
      attendanceRate: 92,
      status: "graded",
      grades: {
        assignmentScore: 88,
        midExamScore: 90,
        finalExamScore: 89
      }
    },
    {
      id: 6,
      name: "James Wilson",
      studentId: "STU-2024-006",
      email: "james.wilson@email.com",
      photo: "👨‍🎓",
      attendanceRate: 80,
      status: "pending",
      grades: {
        assignmentScore: 0,
        midExamScore: 0,
        finalExamScore: 0
      }
    }
  ]);

  const getStatusChip = (status) => {
    if (status === 'graded') {
      return <Chip label="Graded" size="small" color="success" sx={{ fontWeight: 500 }} />;
    }
    return <Chip label="Pending" size="small" color="warning" sx={{ fontWeight: 500 }} />;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateFinalScore = (grades) => {
    if (!grades) return 0;
    const { assignmentScore, midExamScore, finalExamScore } = grades;
    return ((assignmentScore + midExamScore + finalExamScore) / 3).toFixed(1);
  };

  // Modal handlers
  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStudent(null);
  };

  const handleSaveGrades = (studentId, gradeData) => {
    // Update student data in state
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              grades: { 
                assignmentScore: gradeData.assignmentScore,
                midExamScore: gradeData.midExamScore,
                finalExamScore: gradeData.finalExamScore
              },
              attendanceRate: gradeData.attendance,
              status: 'graded'
            }
          : student
      )
    );

    toast.success(`Grades updated successfully`, {
      position: 'top-right',
      autoClose: 3000
    });
  };

  return (
    <div>
      {/* Admin Style Boxed Header - Responsive */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          {/* Back Button - Left on mobile, right on desktop */}
          <button
            onClick={onBackClick}
            className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer flex-shrink-0 order-first md:order-last"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
            <span className="hidden md:inline">Back to Classes</span>
          </button>

          {/* Content Section */}
          <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
            {/* Icon with Background */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:book-open-page-variant" className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            
            {/* Class Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 truncate">{selectedClass.name}</h2>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-1">Manage student grades and academic progress</p>
              
              {/* Meta Info - Wraps on mobile */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:calendar" className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{selectedClass.schedule}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{selectedClass.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:map-marker" className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{selectedClass.room}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:account-group" className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{selectedClass.totalStudents} Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
              <p className="text-sm text-gray-600">Click on a student to view and edit grades</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {students.filter(s => s.status === 'graded').length}/{students.length} Graded
              </span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mid Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr 
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:account" className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${student.grades.assignmentScore > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {student.grades.assignmentScore > 0 ? student.grades.assignmentScore : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${student.grades.midExamScore > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {student.grades.midExamScore > 0 ? student.grades.midExamScore : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${student.grades.finalExamScore > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {student.grades.finalExamScore > 0 ? student.grades.finalExamScore : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${student.attendanceRate > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {student.attendanceRate > 0 ? `${student.attendanceRate}%` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${parseFloat(calculateFinalScore(student.grades)) > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {parseFloat(calculateFinalScore(student.grades)) > 0 ? Math.round(calculateFinalScore(student.grades)) : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleOpenModal(student)}
                      className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                    >
                      <Icon icon="mdi:pencil" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Icon icon="mdi:account-group" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Students in This Class</h3>
          <p className="text-gray-500">There are no students enrolled in this class yet.</p>
        </div>
      )}

      {/* Grade Input Modal */}
      <GradeInputModal
        isOpen={openModal}
        student={selectedStudent}
        selectedClass={selectedClass}
        onClose={handleCloseModal}
        onSave={handleSaveGrades}
      />
    </div>
  );
};

export default StudentTable;