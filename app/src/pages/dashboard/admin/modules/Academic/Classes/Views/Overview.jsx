import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import api from '../../../../../../../utils/api';
import AddClassModal from './AddClassModal';
import EditClassModal from './EditClassModal';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';

const Overview = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/classes');
      setClasses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      // Ganti alert dengan console/toast di real app, tapi alert oke untuk debug
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Class
  const handleEdit = (classItem) => {
    setSelectedClass(classItem);
    setIsEditModalOpen(true);
  };

  // Handle Delete Class
  const handleDelete = async (classId) => {
    try {
      const result = await Swal.fire({
        title: 'Yakin hapus kelas ini?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await api.delete(`/classes/${classId}`);
        
        await Swal.fire({
          title: 'Berhasil!',
          text: 'Kelas berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#3b82f6'
        });
        
        fetchClasses();
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Gagal menghapus kelas.',
        icon: 'error',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      header: 'Class Name',
      accessor: 'className',
      // Jika ingin bold nama kelasnya
      render: (row) => <span className="text-sm font-medium text-gray-900">{row.className}</span>
    },
    {
      header: 'Package',
      accessor: 'package',
      render: (row) => (
        <span className="text-sm text-gray-600">
           {/* Handle null safety untuk object package */}
           {row.package?.packageName || row.package?.package_name || row.packageName || '-'}
        </span>
      )
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
      align: 'center',
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          <Icon icon="mdi:account-group" className="w-3.5 h-3.5 mr-1" />
          {row.capacity}
        </span>
      )
    },
    {
      header: 'Filled',
      accessor: 'members',
      align: 'center',
      render: (row) => {
        // Hitung total member (fallback ke 0 jika undefined)
        const total = row.totalMembers || row.members?.length || 0;
        const cap = row.capacity || 0;
        
        // Logika warna badge
        let badgeColor = 'bg-green-100 text-green-800'; // Aman
        if (total >= cap) badgeColor = 'bg-red-100 text-red-800'; // Penuh
        else if (total >= cap * 0.8) badgeColor = 'bg-yellow-100 text-yellow-800'; // Hampir penuh

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
            {total} / {cap}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'isActive',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Class"
          >
            <Icon icon="mdi:pencil" className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.classId)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Class"
          >
            <Icon icon="mdi:delete" className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:google-classroom"
        iconColor="blue"
        title="Class Management"
        description="Kelola daftar kelas dan kapasitas siswa"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-sm"
        >
          <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-1.5" />
          Add Class
        </button>
      </ModuleHeader>

      {/* DataTable */}
      <DataTable
        title="Daftar Kelas" // Sesuaikan bahasa
        subtitle={`Menampilkan ${classes.length} kelas aktif`}
        searchPlaceholder="Cari nama kelas atau paket..."
        searchQuery={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        columns={columns}
        data={classes}
        loading={loading}
      />

      {/* Add Class Modal */}
      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchClasses}
      />

      {/* Edit Class Modal */}
      <EditClassModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchClasses}
        classData={selectedClass}
      />
    </div>
  );
};

export default Overview;