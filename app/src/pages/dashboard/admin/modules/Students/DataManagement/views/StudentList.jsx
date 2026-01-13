import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, TablePagination, InputAdornment } from '@mui/material';

const StudentList = ({ 
  students,
  searchQuery,
  setSearchQuery,
  filterProgram,
  setFilterProgram,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onViewDetails
}) => {
  // Filter students based on search and program filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = filterProgram === 'All Programs' || student.program === filterProgram;
    
    return matchesSearch && matchesProgram;
  });

  // Get paginated students
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Icon icon="mdi:database-edit" className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Students Data Management</h1>
            <p className="text-gray-600">Manage student information, profiles, and academic records</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
          <p className="text-sm text-gray-600 mb-4">Click on a View Details button to see more details</p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <TextField
                fullWidth
                size="small"
                placeholder="Search students by name, ID, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  } 
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <TextField
              select
              size="small"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb',
                  '&:hover fieldset': {
                    borderColor: '#10b981',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10b981',
                    borderWidth: '2px',
                  },
                }, 
                minWidth: '200px' 
              }}
            >
              <MenuItem value="All Programs">All Programs</MenuItem>
              <MenuItem value="Paket Reguler SMA">Paket Reguler SMA</MenuItem>
              <MenuItem value="Paket Intensif SMA">Paket Intensif SMA</MenuItem>
              <MenuItem value="Paket UTBK">Paket UTBK</MenuItem>
              <MenuItem value="Paket Private">Paket Private</MenuItem>
            </TextField>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap">
              <Icon icon="mdi:upload" className="w-4 h-4 inline mr-2" />
              Export Data
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:account" className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                        <div className="text-xs text-gray-400">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {student.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {student.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button 
                      onClick={() => onViewDetails(student)}
                      className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all cursor-pointer"
                    >
                      <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* MUI Pagination */}
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
      </div>
    </div>
  );
};

export default StudentList;
