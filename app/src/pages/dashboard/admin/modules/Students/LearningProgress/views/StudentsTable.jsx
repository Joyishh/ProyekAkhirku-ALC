import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, TablePagination } from '@mui/material';

const StudentsTable = ({
  selectedClass,
  studentSearchQuery,
  setStudentSearchQuery,
  currentStudents,
  filteredStudents,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  getGradeColor,
  getProgressColor,
  calculateOverallAverage,
  onStudentClick
}) => {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{selectedClass.totalStudents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon icon="mdi:account-group" className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Class Average</p>
              <p className={`text-2xl font-bold ${getGradeColor(selectedClass.averageScore)}`}>
                {selectedClass.averageScore}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Icon icon="mdi:chart-line" className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Progress</p>
              <p className={`text-2xl font-bold ${getProgressColor(selectedClass.progress)}`}>
                {selectedClass.progress}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Icon icon="mdi:progress-check" className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Teacher</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{selectedClass.teacher}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Icon icon="mdi:account-tie" className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
          <p className="text-sm text-gray-600 mb-4">Click on a edit button and edit grades</p>
          
          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search students by name or ID..."
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
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#6366f1',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                  borderWidth: '2px',
                },
              },
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mid Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStudents.map((student) => {
                const average = calculateOverallAverage(student);
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Icon icon="mdi:account" className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getGradeColor(student.assignment)}`}>
                        {student.assignment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getGradeColor(student.midExam)}`}>
                        {student.midExam}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getGradeColor(student.finalExam)}`}>
                        {student.finalExam}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getGradeColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-base font-bold ${getGradeColor(average)}`}>
                        {average}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onStudentClick(student)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                        title="Edit Grades"
                      >
                        <Icon icon="mdi:pencil" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {currentStudents.length === 0 && (
          <div className="text-center py-12">
            <Icon icon="mdi:account-search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No students found matching your search.</p>
          </div>
        )}

        {/* Pagination for Students */}
        {currentStudents.length > 0 && (
          <TablePagination
            component="div"
            count={filteredStudents.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Rows per page:"
            sx={{
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              '.MuiTablePagination-toolbar': {
                paddingLeft: '16px',
                paddingRight: '16px',
              },
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                fontSize: '0.875rem',
                color: '#4b5563',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
