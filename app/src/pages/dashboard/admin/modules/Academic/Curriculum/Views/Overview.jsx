import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../../../../../utils/api';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';
import AddPackageModal from './AddPackageModal';
import AddSubjectModal from './AddSubjectModal';
import EditSubjectModal from './EditSubjectModal';
import EditPackageModal from './EditPackageModal';

const Overview = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('packages');
  const [packages, setPackages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [expandedPackageId, setExpandedPackageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'packages') {
      fetchPackages();
    } else {
      fetchSubjects();
    }
  }, [activeTab]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/package');
      setPackages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Gagal memuat data paket');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/subjects');
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Gagal memuat data mata pelajaran');
    } finally {
      setLoading(false);
    }
  };

  const togglePackageExpansion = (packageId) => {
    setExpandedPackageId(expandedPackageId === packageId ? null : packageId);
  };

  // Helper function to format price to IDR (only formatting, no data guessing)
  const formatPrice = (price) => {
    if (!price || price === 0) return '-';
    return `Rp ${parseInt(price).toLocaleString('id-ID')}`;
  };

  // Handle Edit Subject
  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsEditSubjectOpen(true);
  };

  // Handle Delete Subject
  const handleDelete = async (subjectId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9333ea',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await api.delete(`/subjects/admin/${subjectId}`);
        
        await Swal.fire({
          title: 'Deleted!',
          text: 'Subject has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#9333ea'
        });
        
        fetchSubjects();
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete subject.',
        icon: 'error',
        confirmButtonColor: '#9333ea'
      });
    }
  };

  // Handle Edit Package
  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsEditPackageOpen(true);
  };

  // Handle Delete Package
  const handleDeletePackage = async (packageId) => {
    try {
      const result = await Swal.fire({
        title: 'Yakin hapus paket ini?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9333ea',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await api.delete(`/package/admin/${packageId}`);
        
        await Swal.fire({
          title: 'Berhasil!',
          text: 'Paket berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#9333ea'
        });
        
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      await Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Gagal menghapus paket.',
        icon: 'error',
        confirmButtonColor: '#9333ea'
      });
    }
  };

  // Define columns for Subjects DataTable (using standardized field names)
  const subjectColumns = [
    {
      header: 'ID',
      accessor: 'subjectId',
      align: 'center',
      render: (subject) => (
        <span className="text-sm text-gray-600">#{subject.subjectId || subject.subject_id}</span>
      ),
    },
    {
      header: 'Subject Name',
      accessor: 'subjectName',
      align: 'left',
      render: (subject) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <Icon icon="mdi:book-open-variant" className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {subject.subjectName || subject.subject_name}
          </span>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      align: 'left',
      render: (subject) => (
        <span className="text-sm text-gray-600">{subject.description || '-'}</span>
      ),
    },
    {
      header: 'Created At',
      accessor: 'createdAt',
      align: 'center',
      render: (subject) => {
        const date = subject.createdAt || subject.created_at;
        return (
          <span className="text-sm text-gray-600">
            {date ? new Date(date).toLocaleDateString('id-ID') : '-'}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      accessor: 'action',
      align: 'center',
      render: (subject) => (
        <div className="flex items-center justify-center space-x-2">
          <button 
            onClick={() => handleEdit(subject)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Subject"
          >
            <Icon icon="mdi:pencil" className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(subject.subjectId || subject.subject_id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Subject"
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
        icon="mdi:book-education"
        iconColor="purple"
        title="Curriculum Management"
        description="Manage learning packages and subjects"
      >
        {activeTab === 'packages' ? (
          <button
            onClick={() => setIsAddPackageOpen(true)}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all cursor-pointer"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
            Add Package
          </button>
        ) : (
          <button
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all cursor-pointer"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
            Add Subject
          </button>
        )}
      </ModuleHeader>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'packages'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 rounded-tl-xl'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-tl-xl'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <Icon icon="mdi:package-variant" className="w-5 h-5" />
                <span>Paket Belajar</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'subjects'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 rounded-tr-xl'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-tr-xl'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <Icon icon="mdi:book-open-page-variant" className="w-5 h-5" />
                <span>Master Mata Pelajaran</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Memuat data...</span>
            </div>
          ) : activeTab === 'packages' ? (
            /* Packages Accordion Table */
            <div className="space-y-4">
              {/* Table Header - Similar to DataTable */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Paket Belajar</h2>
                  <p className="text-sm text-gray-600">Total {packages.length} paket</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <Icon icon="mdi:package-variant" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada paket belajar. Klik "Tambah Paket" untuk membuat paket baru.</p>
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <React.Fragment key={pkg.packageId}>
                        <tr 
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => togglePackageExpansion(pkg.packageId)}
                        >
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pkg.packageName}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {pkg.description || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-sm font-semibold text-gray-900">
                              {formatPrice(pkg.price)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              pkg.isActive
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {pkg.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center space-x-2">
                              <button 
                                onClick={() => handleEditPackage(pkg)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Package"
                              >
                                <Icon icon="mdi:pencil" className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeletePackage(pkg.packageId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Package"
                              >
                                <Icon icon="mdi:delete" className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => togglePackageExpansion(pkg.packageId)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                title="Toggle Details"
                              >
                                {expandedPackageId === pkg.packageId ? (
                                  <Icon icon="mdi:chevron-up" className="w-5 h-5" />
                                ) : (
                                  <Icon icon="mdi:chevron-down" className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Expanded Content */}
                        {expandedPackageId === pkg.packageId && (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                              <div className="ml-8">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                  <Icon icon="mdi:format-list-bulleted" className="w-4 h-4 mr-2" />
                                  Mata Pelajaran dalam Paket:
                                </h4>
                                {!pkg.subjects || pkg.subjects.length === 0 ? (
                                  <p className="text-sm text-gray-500 italic">
                                    Belum ada mata pelajaran dalam paket ini.
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {pkg.subjects.map((subject, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                          <Icon icon="mdi:book-open-page-variant" className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                          {subject.subjectName}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            </div>
          ) : (
            /* Subjects DataTable */
            <DataTable
              title="Master Mata Pelajaran"
              subtitle={`Total ${subjects.length} mata pelajaran`}
              searchPlaceholder="Cari mata pelajaran..."
              columns={subjectColumns}
              data={subjects}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddPackageModal
        isOpen={isAddPackageOpen}
        onClose={() => setIsAddPackageOpen(false)}
        onSuccess={fetchPackages}
      />
      <EditPackageModal
        isOpen={isEditPackageOpen}
        onClose={() => setIsEditPackageOpen(false)}
        onSuccess={fetchPackages}
        packageData={selectedPackage}
      />
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSuccess={fetchSubjects}
      />
      <EditSubjectModal
        isOpen={isEditSubjectOpen}
        onClose={() => setIsEditSubjectOpen(false)}
        onSuccess={fetchSubjects}
        subjectData={selectedSubject}
      />
    </div>
  );
};

export default Overview;
