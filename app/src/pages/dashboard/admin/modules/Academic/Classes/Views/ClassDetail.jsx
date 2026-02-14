import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../../../../../utils/api';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';
import EditClassModal from './EditClassModal';
import AddStudentModal from './AddStudentModal';

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch class detail on mount
  useEffect(() => {
    fetchClassDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchClassDetail = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/classes/${id}`);
      setClassData(response.data.data);
      // Set students from classData.members directly
      setStudents(response.data.data.members || []);
    } catch (error) {
      console.error('Error fetching class detail:', error);
      toast.error('Gagal memuat detail kelas');
      // Navigate back if class not found
      if (error.response?.status === 404) {
        navigate('/dashboard/admin/academic/classes');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    fetchClassDetail(); // Re-fetch to show updated data
    toast.success('Kelas berhasil diperbarui');
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Hapus Kelas?',
      text: `Apakah Anda yakin ingin menghapus kelas "${classData?.className}"? Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/classes/${id}`);
        toast.success('Kelas berhasil dihapus');
        navigate('/dashboard/admin/academic/classes');
      } catch (error) {
        console.error('Error deleting class:', error);
        toast.error(error.response?.data?.message || 'Gagal menghapus kelas');
      }
    }
  };

  const handleAddStudent = () => {
    setIsAddStudentModalOpen(true);
  };

  const handleRemoveStudent = async (studentId) => {
    const result = await Swal.fire({
      title: 'Hapus Siswa dari Kelas?',
      text: 'Siswa akan dihapus dari kelas ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/classes/${id}/members/${studentId}`);
        toast.success('Siswa berhasil dihapus dari kelas');
        fetchClassDetail(); // Refresh to update member count and list
      } catch (error) {
        console.error('Error removing student:', error);
        toast.error(error.response?.data?.message || 'Gagal menghapus siswa dari kelas');
      }
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter students based on search
  const filteredStudents = students.filter((student) => {
    const studentName = student.student?.fullname || student.studentName || student.fullname || '';
    const studentId = student.student?.studentId || student.studentId || '';
    
    return (
      studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get paginated students
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Define columns for Student DataTable
  const studentColumns = [
    {
      header: 'ID',
      accessor: 'studentId',
      align: 'left',
      render: (row) => (
        <span className="text-sm text-gray-600">
          {row.student?.studentId || row.studentId || '-'}
        </span>
      ),
    },
    {
      header: 'Student Name',
      accessor: 'studentName',
      align: 'left',
      render: (row) => (
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {row.student?.fullname || row.studentName || row.fullname || '-'}
          </div>
          {row.student?.email && (
            <div className="text-xs text-gray-500">{row.student.email}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Package',
      accessor: 'Package',
      align: 'center',
      render: (row) => (
        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.student?.program || row.program || classData?.package?.packageName || 'No Program'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'action',
      align: 'center',
      render: (row) => (
        <button
          onClick={() => handleRemoveStudent(row.memberId || row.studentId)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Remove Student"
        >
          <Icon icon="mdi:trash-can" className="w-5 h-5" />
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-lg text-gray-600">Memuat detail kelas...</span>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Icon icon="mdi:alert-circle" className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Kelas Tidak Ditemukan</h3>
        <p className="text-gray-500 mb-4">Data kelas yang Anda cari tidak tersedia</p>
        <button
          onClick={() => navigate('/dashboard/admin/academic/classes')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Kembali ke Daftar Kelas
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:google-classroom"
        iconColor="blue"
        title={classData.className}
        description={`Paket: ${classData.package?.packageName || 'N/A'}`}
      >
        {/* Action Buttons in Header */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Icon icon="mdi:pencil" className="w-5 h-5 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <Icon icon="mdi:delete" className="w-5 h-5 mr-2" />
            Hapus
          </button>
        </div>
      </ModuleHeader>

      {/* Student List Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          title="Student List"
          subtitle={`Showing ${paginatedStudents.length} of ${filteredStudents.length} students in this class`}
          searchPlaceholder="Search students by name"
          columns={studentColumns}
          data={paginatedStudents}
          searchQuery={searchTerm}
          onSearchChange={setSearchTerm}
          actionComponent={
            <button
              onClick={handleAddStudent}
              className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <Icon icon="mdi:plus" className="w-5 h-5 mr-1.5" />
              Add Student
            </button>
          }
          pagination={{
            count: filteredStudents.length,
            page,
            rowsPerPage,
            handleChangePage,
            handleChangeRowsPerPage,
          }}
          loading={loading}
          emptyMessage="Belum ada siswa terdaftar di kelas ini"
          accentColor="blue"
        />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditClassModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
          classData={classData}
        />
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <AddStudentModal
          isOpen={isAddStudentModalOpen}
          onClose={() => setIsAddStudentModalOpen(false)}
          onSuccess={() => {
            fetchClassDetail(); // Refresh class data including members
          }}
          classId={id}
          packageId={classData?.package?.packageId}
        />
      )}
    </div>
  );
};

export default ClassDetail;
