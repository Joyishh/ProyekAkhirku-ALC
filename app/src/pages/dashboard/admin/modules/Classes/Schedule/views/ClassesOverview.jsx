import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../../../../../../../utils/api';
import AddClassModal from './AddClassModal';
import ModuleHeader from '../../../../../../../components/ModuleHeader';

const ClassesOverview = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = async (classId, className) => {
    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus kelas "${className}"?`);
    
    if (!confirmed) return;

    try {
      await api.delete(`/classes/${classId}`);
      alert('Kelas berhasil dihapus');
      fetchClasses(); // Refresh list
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Gagal menghapus kelas';
      alert(errorMessage);
    }
  };

  const handleModalSuccess = () => {
    fetchClasses();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon icon="mdi:loading" className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-600">Memuat data kelas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:school-outline"
        iconColor="blue"
        title="Manajemen Kelas"
        description="Kelola kelas dan kapasitas siswa"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all cursor-pointer"
        >
          <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
          Tambah Kelas
        </button>
      </ModuleHeader>

      {/* Classes Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paket
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kapasitas
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terisi
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Icon icon="mdi:school-outline" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada kelas. Klik "Tambah Kelas" untuk membuat kelas baru.</p>
                  </td>
                </tr>
              ) : (
                classes.map((classItem) => (
                  <tr key={classItem.classId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Icon icon="mdi:school" className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {classItem.className}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {classItem.package?.packageName || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {classItem.capacity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        classItem.totalMembers >= classItem.capacity 
                          ? 'bg-red-100 text-red-800' 
                          : classItem.totalMembers >= classItem.capacity * 0.8
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {classItem.totalMembers || 0} / {classItem.capacity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(classItem.classId, classItem.className)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                      >
                        <Icon icon="mdi:delete" className="w-4 h-4 mr-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Class Modal */}
      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default ClassesOverview;