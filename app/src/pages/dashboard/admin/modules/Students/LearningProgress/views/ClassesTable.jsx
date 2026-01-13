import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, MenuItem, TablePagination } from '@mui/material';

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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header Filter Section */}
      <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Class List</h2>
          <p className="text-sm text-gray-600 mb-4">Click on a View Details button to see more details</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 w-full">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search class name or teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#4f46e5', borderWidth: '2px' },
                },
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentClasses.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  <Icon icon="mdi:school-outline" className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>No classes found.</p>
                </td>
              </tr>
            ) : (
              currentClasses.map((classData) => (
                <tr key={classData.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Icon icon="mdi:school" className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{classData.name}</div>
                        <div className="text-xs text-gray-500">{classData.subject}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Icon icon="mdi:account-tie" className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{classData.teacher}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      <Icon icon="mdi:account-group" className="w-3.5 h-3.5 mr-1" />
                      {classData.totalStudents}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(classData.averageScore)}`}>
                      {classData.averageScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getProgressBadgeColor(classData.progress)}`}>
                      {classData.progress}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => onClassClick(classData)}
                      className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination for Classes */}
      <TablePagination
        component="div"
        count={filteredClasses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{
          borderTop: '1px solid #e5e7eb',
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            marginTop: '14px',
            marginBottom: '14px'
          }
        }}
      />
    </div>
  );
};

export default ClassesTable;
