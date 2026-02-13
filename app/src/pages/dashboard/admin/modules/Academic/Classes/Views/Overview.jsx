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
      // Ganti alert dengan console/toast di real app, tapi alert oke untuk debug
    } finally {
      setLoading(false);
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
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          <Icon icon="mdi:account-group" className="w-3.5 h-3.5 mr-1" />
          {row.capacity}
        </span>
      )
    },
    {
      header: 'Filled',
      accessor: 'members', // Ganti accessor biar lebih jelas (opsional)
      // PERBAIKAN 1: Ganti 'cell' jadi 'render'
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
      // PERBAIKAN 2: Ganti 'cell' jadi 'render'
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          // Cek boolean secara langsung, jangan pakai string 'true'
          row.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {/* PERBAIKAN 3: Konversi boolean ke teks */}
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      // PERBAIKAN 4: Ganti 'cell' jadi 'render'
      render: (row) => (
        <button
          onClick={() => navigate(`/dashboard/admin/academic/classes/${row.classId}`)}
          className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
        >
          <Icon icon="mdi:eye" className="w-3.5 h-3.5 mr-1" />
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
    </div>
  );
};

export default Overview;