import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Overview = ({
  currentMonth,
  currentYear,
  selectedPackage,
  totalPayment,
  formatCurrency,
  getMonthName,
  getDueDate,
  onPayClick
}) => {
  const [activeTab, setActiveTab] = useState('active'); // State UI lokal untuk tab

  // Mock Data History (Bisa dipindah ke Parent kalau mau dinamis nanti)
  const history = [
    { id: 101, month: 'Desember 2025', datePaid: '8 Des 2025', amount: 500000, status: 'pending', receipt: '#' },
    { id: 102, month: 'November 2025', datePaid: '5 Nov 2025', amount: 500000, status: 'paid', receipt: '#' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"><Icon icon="mdi:check-circle" /> Lunas</span>;
      case 'pending': return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full"><Icon icon="mdi:clock-outline" /> Verifikasi</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111318]">Pembayaran Bulanan</h1>
          <p className="mt-1 text-gray-500">Kelola tagihan SPP dan riwayat pembayaran.</p>
        </div>
      </div>

      <hr className="border-blue-200 mb-6" />

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="grid grid-cols-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-4 px-1 font-medium text-sm relative transition-colors ${activeTab === 'active' ? 'text-[#135bec]' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="mdi:wallet" className="w-5 h-5" /> Tagihan Aktif
            </div>
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#135bec]"></div>}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-1 font-medium text-sm relative transition-colors ${activeTab === 'history' ? 'text-[#135bec]' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon icon="mdi:history" className="w-5 h-5" /> Riwayat Pembayaran
            </div>
            {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#135bec]"></div>}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'active' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kartu Tagihan Bulan Ini (Dinamis dari Props) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{getMonthName(currentMonth)} {currentYear}</h3>
                  <p className="text-sm text-gray-500">SPP Bulanan</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Icon icon="mdi:alert-circle" className="text-red-600" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon="mdi:calendar" /> <span>Jatuh Tempo: {getDueDate()}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-1">Total Tagihan</p>
                  <p className="text-2xl font-bold text-[#135bec]">Rp {formatCurrency(totalPayment)}</p>
                </div>
              </div>

              <button
                onClick={() => onPayClick({
                  month: `${getMonthName(currentMonth)} ${currentYear}`,
                  dueDate: getDueDate(),
                  amount: totalPayment
                })}
                className="w-full py-2.5 px-4 bg-[#135bec] text-white rounded-lg font-medium hover:bg-[#0f4ed8] transition-colors flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:credit-card" /> Bayar Sekarang
              </button>
            </div>
          </div>
        ) : (
          // Tampilan History (Table Sederhana)
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="px-6 py-4">Bulan</th>
                    <th className="px-6 py-4">Tanggal Bayar</th>
                    <th className="px-6 py-4">Nominal</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.month}</td>
                      <td className="px-6 py-4 text-gray-500">{item.datePaid}</td>
                      <td className="px-6 py-4 font-medium">Rp {formatCurrency(item.amount)}</td>
                      <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#135bec] hover:text-[#0f4ed8] font-medium text-xs flex items-center gap-1">
                          <Icon icon="mdi:file-document-outline" /> Bukti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;