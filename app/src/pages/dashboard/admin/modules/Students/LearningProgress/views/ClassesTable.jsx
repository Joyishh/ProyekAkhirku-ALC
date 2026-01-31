import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, MenuItem, TablePagination } from '@mui/material';
import DataTable from '../../../../../../../components/DataTable';

const ClassesTable = ({
  searchQuery,
  setSearchQuery,
  filterTeacher,
  setFilterTeacher,
  filterSubject,
  setFilterSubject,
  teacherOptions,
  subjectOptions,
  currentClasses,
  filteredClasses,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  getBadgeColor,
  getProgressBadgeColor,
  onClassClick
}) => {
  return (
    <DataTable
      title="Class List"
      subtitle="Click on a View Details button to see more details"
      searchPlaceholder="Search class name or teacher..."
      searchQuery={searchQuery}
      onSearchChange={(e) => setSearchQuery(e.target.value)}
      filterComponents={
        <>
          <TextField
            select
            size="small"
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value)}
            sx={{
              minWidth: '160px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#6366f1' },
                '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
              },
            }}
          >
            {teacherOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option === 'All' ? 'All Teachers' : option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            sx={{
              minWidth: '160px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#6366f1' },
                '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
              },
            }}
          >
            {subjectOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option === 'All' ? 'All Subjects' : option}
              </MenuItem>
            ))}
          </TextField>
        </>
      }
      columns={[
        {
          header: "Class Name",
          align: "left",
          render: (classData) => (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Icon icon="mdi:school" className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{classData.name}</div>
                <div className="text-xs text-gray-500">{classData.subject}</div>
              </div>
            </div>
          ),
        },
        {
          header: "Teacher",
          align: "left",
          render: (classData) => (
            <div className="flex items-center">
              <Icon icon="mdi:account-tie" className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700">{classData.teacher}</span>
            </div>
          ),
        },
        {
          header: "Total Students",
          align: "center",
          render: (classData) => (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              <Icon icon="mdi:account-group" className="w-3.5 h-3.5 mr-1" />
              {classData.totalStudents}
            </span>
          ),
        },
        {
          header: "Average Score",
          align: "center",
          render: (classData) => (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(classData.averageScore)}`}>
              {classData.averageScore}
            </span>
          ),
        },
        {
          header: "Progress",
          align: "center",
          render: (classData) => (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getProgressBadgeColor(classData.progress)}`}>
              {classData.progress}%
            </span>
          ),
        },
        {
          header: "Action",
          align: "center",
          render: (classData) => (
            <button
              onClick={() => onClassClick(classData)}
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
              View Details
            </button>
          ),
        },
      ]}
      data={currentClasses}
      pagination={{
        count: filteredClasses.length,
        page: page,
        rowsPerPage: rowsPerPage,
        handleChangePage: handleChangePage,
        handleChangeRowsPerPage: handleChangeRowsPerPage,
      }}
    />
  );
};

export default ClassesTable;
