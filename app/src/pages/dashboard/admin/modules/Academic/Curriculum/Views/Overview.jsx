import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../../../../../../../utils/api';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';
import AddPackageModal from './AddPackageModal';
import AddSubjectModal from './AddSubjectModal';

const Overview = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('packages');
  const [packages, setPackages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [expandedPackageId, setExpandedPackageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

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
      alert('Gagal memuat data paket');
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
      alert('Gagal memuat data mata pelajaran');
    } finally {
      setLoading(false);
    }
  };

  const togglePackageExpansion = (packageId) => {
    setExpandedPackageId(expandedPackageId === packageId ? null : packageId);
  };

  // Define columns for Subjects DataTable
  const subjectColumns = [
    {
      header: 'Subject ID',
      accessor: 'subject_id',
      align: 'left',
    },
    {
      header: 'Subject Name',
      accessor: 'subject_name',
      align: 'left',
    },
    {
      header: 'Description',
      accessor: 'description',
      align: 'left',
      render: (subject) => subject.description || '-',
    },
    {
      header: 'Created At',
      accessor: 'created_at',
      align: 'center',
      render: (subject) => subject.created_at ? new Date(subject.created_at).toLocaleDateString() : '-',
    },
    {
      header: 'Action',
      accessor: 'action',
      align: 'center',
      render: (subject) => (
        <div className="flex items-center justify-center space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
            <Icon icon="mdi:pencil" className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
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
        title="Manajemen Kurikulum"
        description="Atur Paket Belajar dan Master Mata Pelajaran"
      >
        {activeTab === 'packages' ? (
          <button
            onClick={() => setIsAddPackageOpen(true)}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all cursor-pointer"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
            Tambah Paket
          </button>
        ) : (
          <button
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all cursor-pointer"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
            Tambah Mapel
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <Icon icon="mdi:package-variant" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada paket belajar. Klik "Tambah Paket" untuk membuat paket baru.</p>
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <React.Fragment key={pkg.package_id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <button
                              onClick={() => togglePackageExpansion(pkg.package_id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            >
                              {expandedPackageId === pkg.package_id ? (
                                <Icon icon="mdi:chevron-up" className="w-5 h-5 text-gray-600" />
                              ) : (
                                <Icon icon="mdi:chevron-down" className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pkg.package_name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {pkg.description || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-sm font-semibold text-gray-900">
                              {pkg.price ? `Rp ${pkg.price.toLocaleString()}` : '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              pkg.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {pkg.status || 'inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                                <Icon icon="mdi:pencil" className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                <Icon icon="mdi:delete" className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Expanded Content */}
                        {expandedPackageId === pkg.package_id && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="ml-8">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                  Mata Pelajaran dalam Paket:
                                </h4>
                                {!pkg.package_items || pkg.package_items.length === 0 ? (
                                  <p className="text-sm text-gray-500 italic">
                                    Belum ada mata pelajaran dalam paket ini.
                                  </p>
                                ) : (
                                  <div className="space-y-2">
                                    {pkg.package_items.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Icon icon="mdi:book-open-page-variant" className="w-4 h-4 text-purple-600" />
                                          </div>
                                          <span className="text-sm font-medium text-gray-900">
                                            {item.subject?.subject_name || item.subject_name || 'Unknown Subject'}
                                          </span>
                                        </div>
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
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onSuccess={fetchSubjects}
      />
    </div>
  );
};

export default Overview;
