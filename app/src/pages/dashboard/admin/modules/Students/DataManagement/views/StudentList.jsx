import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, TablePagination, InputAdornment } from '@mui/material';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';

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
      <ModuleHeader
        title="Students Data Management"
        description="Manage student information, profiles, and academic records"
        icon="mdi:database-edit"
        iconColor="green"
      />

      {/* Students Table */}
      <DataTable
        title="Student List"
        subtitle="Click on a View Details button to see more details"
        searchPlaceholder="Search students by name, ID, or program..."
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        filterComponents={
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
        }
        actionComponent={
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap">
            <Icon icon="mdi:upload" className="w-4 h-4 inline mr-2" />
            Export Data
          </button>
        }
        columns={[
          {
            header: "Student Name",
            align: "left",
            render: (student) => (
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
            ),
          },
          {
            header: "Program",
            align: "center",
            render: (student) => (
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {student.program}
              </span>
            ),
          },
          {
            header: "Status",
            align: "center",
            render: (student) => (
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {student.status}
              </span>
            ),
          },
          {
            header: "Joined",
            align: "center",
            render: (student) => (
              <span className="text-sm text-gray-500">{student.joined}</span>
            ),
          },
          {
            header: "Actions",
            align: "center",
            render: (student) => (
              <button 
                onClick={() => onViewDetails(student)}
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all cursor-pointer"
              >
                <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                View Details
              </button>
            ),
          },
        ]}
        data={paginatedStudents}
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

export default StudentList;
