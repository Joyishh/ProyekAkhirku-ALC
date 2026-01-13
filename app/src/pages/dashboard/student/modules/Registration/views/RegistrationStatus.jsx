import React from 'react';
import { Icon } from '@iconify/react';

const RegistrationStatus = ({
  submissionDate = '5 Januari 2026',
  paymentMethod = 'Transfer Bank BCA',
  uploadedFileName = 'bukti_transfer.jpg',
  uploadedFileUrl = '#',
  packageName = 'Paket Reguler SMA',
  onViewFile
}) => {
  const steps = [
    { id: 1, name: 'Isi Data Diri', status: 'completed' },
    { id: 2, name: 'Pilih Paket', status: 'completed' },
    { id: 3, name: 'Pembayaran & Konfirmasi', status: 'current' },
    { id: 4, name: 'Resmi Terdaftar', status: 'upcoming' }
  ];

  const getStepIcon = (status) => {
    if (status === 'completed') {
      return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600" />;
    }
    if (status === 'current') {
      return <Icon icon="mdi:clock-outline" className="w-5 h-5 text-yellow-600 animate-pulse" />;
    }
    return <Icon icon="mdi:circle-outline" className="w-5 h-5 text-gray-400" />;
  };

  const getStepStyle = (status) => {
    if (status === 'completed') {
      return 'bg-green-100 border-green-300';
    }
    if (status === 'current') {
      return 'bg-yellow-100 border-yellow-300';
    }
    return 'bg-gray-100 border-gray-300';
  };

  const getStepTextStyle = (status) => {
    if (status === 'completed') {
      return 'text-green-700 font-medium';
    }
    if (status === 'current') {
      return 'text-yellow-700 font-semibold';
    }
    return 'text-gray-500';
  };

  const handleViewFile = () => {
    if (onViewFile) {
      onViewFile(uploadedFileUrl);
    } else {
      window.open(uploadedFileUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Status Pendaftaran Siswa
          </h1>
          <p className="mt-2 text-gray-600">
            Silakan cek status pendaftaran Anda dan tunggu konfirmasi dari Admin.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-blue-200 mb-6" />
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:clock-outline" className="w-6 h-6 text-yellow-600 animate-pulse" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-yellow-800 mb-2">
                Pembayaran Sedang Diverifikasi
              </h2>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Terima kasih telah menyelesaikan proses pendaftaran. Tim admin kami sedang memeriksa 
                bukti pembayaran Anda. Harap menunggu hingga proses verifikasi selesai.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Pendaftaran</h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-center gap-4">
                  {/* Step Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepStyle(step.status)}`}>
                    {getStepIcon(step.status)}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <p className={`text-sm ${getStepTextStyle(step.status)}`}>
                      {step.name}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {step.status === 'completed' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Selesai
                    </span>
                  )}
                  {step.status === 'current' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      Sedang Diproses
                    </span>
                  )}
                  {step.status === 'upcoming' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      Menunggu
                    </span>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="ml-5 mt-2 mb-2">
                    <div className={`w-0.5 h-8 ${
                      steps[index + 1].status === 'completed' || steps[index + 1].status === 'current'
                        ? 'bg-green-300'
                        : 'bg-gray-300'
                    }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submission Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pengajuan</h3>
            <p className="text-sm text-gray-600 mt-1">Detail data yang telah Anda kirimkan</p>
          </div>

          <div className="p-6 space-y-4">
            {/* Submission Date */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Icon icon="mdi:calendar" className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Tanggal Pengajuan</p>
                <p className="font-semibold text-gray-900">{submissionDate}</p>
              </div>
            </div>

            {/* Package Selected */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Icon icon="mdi:file-document-outline" className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Paket yang Dipilih</p>
                <p className="font-semibold text-gray-900">{packageName}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Icon icon="mdi:credit-card-outline" className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Metode Pembayaran</p>
                <p className="font-semibold text-gray-900">{paymentMethod}</p>
              </div>
            </div>

            {/* Uploaded File */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Icon icon="mdi:download" className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded flex items-center justify-center">
                      <Icon icon="mdi:file-document-outline" className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className='flex-col min-w-0'>
                      <p className="text-sm font-medium text-gray-900 truncate" title={uploadedFileName}>{uploadedFileName}</p>
                      <p className="text-xs text-gray-500">Terupload</p>
                    </div>
                  </div>
                  <button
                    onClick={handleViewFile}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Lihat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:file-document-outline" className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Langkah Selanjutnya</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Admin kami sedang mengecek data dan bukti pembayaran yang Anda kirimkan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Proses verifikasi memakan waktu maksimal <strong>1x24 jam</strong> (hari kerja).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Anda akan menerima notifikasi via email dan WhatsApp setelah verifikasi selesai.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Jika ada masalah dengan data atau pembayaran, admin akan menghubungi Anda.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-600 text-sm mb-3">
            Butuh bantuan atau ada pertanyaan?
          </p>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Hubungi Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatus;
