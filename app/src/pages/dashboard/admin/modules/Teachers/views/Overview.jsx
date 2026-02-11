import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import ModuleHeader from '../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../components/DataTable';
import AddTeacherModal from './AddTeacherModal.jsx';
import teacherService from '../../../../../../services/teacherService.js';
import { toast } from 'react-toastify';

const Overview = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getAllTeachers();
      
      if (response.success && response.data) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
      toast.error('Gagal memuat data guru');
    } finally {
      setLoading(false);
    }
  };

  // Filter teachers based on search and specialization
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = 
      filterSpecialization === 'All' || 
      teacher.specialization === filterSpecialization ||
      (!teacher.specialization && filterSpecialization === 'Tidak ada');
    
    return matchesSearch && matchesSpecialization;
  });

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get paginated teachers
  const paginatedTeachers = filteredTeachers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleModalSuccess = () => {
    fetchTeachers();
  };

  // Get unique specializations for filter
  const specializations = ['All', ...new Set(teachers.map(t => t.specialization || 'Tidak ada'))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress size={40} sx={{ color: '#2563eb' }} />
        <span className="ml-3 text-gray-600">Loading teachers data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        title="Teacher Data Management"
        description="Manage and overview all teachers in the system."
        icon="mdi:account-school"
        iconColor="blue"
      />

      {/* Teachers Table */}
      <DataTable
        title="Teacher List"
        subtitle={`Showing ${paginatedTeachers.length} of ${filteredTeachers.length} teachers`}
        searchPlaceholder="Search by teacher name, username, or email..."
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        filterComponents={
          <TextField
            select
            size="small"
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
                '&:hover fieldset': {
                  borderColor: '#2563eb',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2563eb',
                  borderWidth: '2px',
                },
              }, 
              minWidth: '200px' 
            }}
          >
            {specializations.map(spec => (
              <MenuItem key={spec} value={spec}>
                {spec === 'All' ? 'All Specializations' : spec}
              </MenuItem>
            ))}
          </TextField>
        }
        actionComponent={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap flex items-center"
          >
            <Icon icon="mdi:account-plus" className="w-4 h-4 mr-2" />
            Add Teacher
          </button>
        }
        columns={[
          {
            header: "Full Name",
            align: "left",
            render: (teacher) => (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:account" className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{teacher.fullname || 'N/A'}</div>
                  <div className="text-xs text-gray-400">{teacher.id || 'N/A'}</div>
                </div>
              </div>
            ),
          },
          {
            header: "Specialization",
            align: "center",
            render: (teacher) => (
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {teacher.specialization || 'None'}
              </span>
            ),
          },
          {
            header: "Phone Number",
            align: "center",
            render: (teacher) => (
              <span className="text-sm text-gray-600">
                {teacher.phone || '-'}
              </span>
            ),
          },
          {
            header: "Username",
            align: "center",
            render: (teacher) => (
              <span className="text-sm text-gray-600">
                {teacher.username || 'N/A'}
              </span>
            ),
          },
          {
            header: "Email",
            align: "center",
            render: (teacher) => (
              <span className="text-sm text-gray-600">
                {teacher.email || 'N/A'}
              </span>
            ),
          },
          {
            header: "Actions",
            align: "center",
            render: (teacher) => (
              <div className="flex items-center justify-center space-x-2">
                <button 
                  onClick={() => toast.info('View detail akan diimplementasikan')}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all cursor-pointer"
                >
                  <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                  Detail
                </button>
              </div>
            ),
          },
        ]}
        data={paginatedTeachers}
        pagination={{
          count: filteredTeachers.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage,
        }}
      />

      {/* Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default Overview;