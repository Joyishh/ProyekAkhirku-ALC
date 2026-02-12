import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../../../../../../utils/api';
import AddClassModal from './AddClassModal';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';

const Overview = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      alert('Gagal memuat data kelas');
    } finally {
      setLoading(false);
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      header: 'Class Name',
      accessor: 'className',
    },
    {
      header: 'Package',
      accessor: 'package',
      cell: (row) => row.package?.packageName || '-',
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
    },
    {
      header: 'Filled',
      accessor: 'totalMembers',
      cell: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          row.totalMembers >= row.capacity 
            ? 'bg-red-100 text-red-800' 
            : row.totalMembers >= row.capacity * 0.8
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.totalMembers || 0} / {row.capacity}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status || 'inactive'}
        </span>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      cell: (row) => (
        <button
          onClick={() => navigate(`/dashboard/admin/academic/classes/${row.classId}`)}
          className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
          Detail
        </button>
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
        description="Kelola daftar kelas dan paket belajar"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all cursor-pointer"
        >
          <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
          Add Class
        </button>
      </ModuleHeader>

      {/* DataTable */}
      <DataTable
        title="Classes List"
        subtitle={`Showing ${classes.length} classes`}
        searchPlaceholder="Search by class name or package..."
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
    </div>
  );
};

export default Overview;
