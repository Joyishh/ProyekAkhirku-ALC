import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, TablePagination } from '@mui/material';
import DataTable from '../../../../../../../components/DataTable';

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
      <DataTable
        title="Student List"
        subtitle="Click on a edit button and edit grades"
        searchPlaceholder="Search students by name or ID..."
        searchQuery={studentSearchQuery}
        onSearchChange={(e) => setStudentSearchQuery(e.target.value)}
        columns={[
          {
            header: "Student",
            align: "left",
            render: (student) => (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:account" className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.studentId}</div>
                </div>
              </div>
            ),
          },
          {
            header: "Assignment",
            align: "left",
            render: (student) => (
              <span className={`text-sm font-semibold ${getGradeColor(student.assignment)}`}>
                {student.assignment}
              </span>
            ),
          },
          {
            header: "Mid Exam",
            align: "left",
            render: (student) => (
              <span className={`text-sm font-semibold ${getGradeColor(student.midExam)}`}>
                {student.midExam}
              </span>
            ),
          },
          {
            header: "Final Exam",
            align: "left",
            render: (student) => (
              <span className={`text-sm font-semibold ${getGradeColor(student.finalExam)}`}>
                {student.finalExam}
              </span>
            ),
          },
          {
            header: "Attendance",
            align: "left",
            render: (student) => (
              <span className={`text-sm font-semibold ${getGradeColor(student.attendance)}`}>
                {student.attendance}%
              </span>
            ),
          },
          {
            header: "Average",
            align: "left",
            render: (student) => {
              const average = calculateOverallAverage(student);
              return (
                <span className={`text-base font-bold ${getGradeColor(average)}`}>
                  {average}
                </span>
              );
            },
          },
          {
            header: "Action",
            align: "left",
            render: (student) => (
              <button
                onClick={() => onStudentClick(student)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                title="Edit Grades"
              >
                <Icon icon="mdi:pencil" className="w-5 h-5" />
              </button>
            ),
          },
        ]}
        data={currentStudents}
        pagination={{
          count: filteredStudents.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage,
        }}
      />
    </div>
  );
};

export default StudentsTable;
