import React from 'react';
import { Icon } from '@iconify/react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const StudentDashboardModule = () => {
  const { studentData } = useOutletContext();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (type, status) => {
    if (type === 'registration') {
      switch (status) {
        case 'approved': return 'Aktif';
        case 'pending': return 'Menunggu';
        case 'rejected': return 'Ditolak';
        default: return 'Belum Daftar';
      }
    }
    if (type === 'payment') {
      switch (status) {
        case 'paid': return 'Lunas';
        case 'pending': return 'Menunggu';
        default: return 'Belum Bayar';
      }
    }
  };

  const today = new Date();
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', dateOptions);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.033em] text-[#111318]">
            Selamat Datang!
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.033em] text-[#111318]">
            {studentData?.name || 'Siswa'}
          </h1>
          <p className="text-sm md:text-base text-[#616f89] mt-2">
            Kelola pendaftaran dan pembayaran bimbelmu di satu tempat
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2">
          <Icon icon="mdi:calendar-today" className="w-5 h-5 text-[#135bec]" />
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Card 1: Status Pendaftaran */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-[#dbdfe6] shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-500" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Status Pendaftaran
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(studentData?.registrationStatus)}`}>
                  {getStatusText('registration', studentData?.registrationStatus)}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-[#111318]">
                {studentData?.registrationStatus === 'approved' ? 'Siswa Terdaftar' : 'Belum Terdaftar'}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {studentData?.registrationStatus === 'approved' 
                  ? 'Anda sudah terdaftar sebagai siswa aktif'
                  : 'Lengkapi pendaftaran untuk mulai belajar'
                }
              </p>
            </div>
            <div className="bg-gray-100 text-green-600 rounded-full p-3">
              <Icon icon="mdi:check-decagram" className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Card 2: Paket Saat Ini */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-[#dbdfe6] shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#135bec]" />
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Paket Saat Ini
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(studentData?.paymentStatus)}`}>
                  {getStatusText('payment', studentData?.paymentStatus)}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-[#111318]">
                {studentData?.paymentStatus === 'paid' ? 'Paket Intensif UN' : 'Belum Ada Paket'}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {studentData?.paymentStatus === 'paid'
                  ? 'Berlaku hingga 31 Desember 2025'
                  : 'Pilih paket belajar sesuai kebutuhan'
                }
              </p>
            </div>
            <div className="bg-gray-100 text-[#135bec] rounded-full p-3">
              <Icon icon="mdi:book-open-variant" className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu - Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Card Pendaftaran - Use Navigate */}
        <div 
          onClick={() => navigate('registration')}
          className="group relative bg-gradient-to-br from-[#135bec] to-[#0f4ed8] rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#135bec]/20 active:scale-95 md:hover:-translate-y-1"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -right-5 -bottom-10 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <Icon icon="mdi:account-plus" className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Pendaftaran Siswa Baru
            </h3>
            <p className="text-sm md:text-base text-blue-100 mb-4 md:mb-6">
              Daftarkan diri Anda atau kerabat untuk mulai perjalanan belajar di Ababil Learning Center
            </p>
            <div className="flex items-center text-white font-bold group-hover:gap-3 transition-all">
              <span>Mulai Pendaftaran</span>
              <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card Pembayaran - Use Navigate */}
        <div 
          onClick={() => navigate('payment')}
          className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95 md:hover:-translate-y-1"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -right-5 -bottom-10 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <Icon icon="mdi:credit-card-outline" className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Pembayaran Bulanan
            </h3>
            <p className="text-sm md:text-base text-emerald-100 mb-4 md:mb-6">
              Lakukan pembayaran SPP bulanan dengan mudah dan cepat melalui berbagai metode pembayaran
            </p>
            <div className="flex items-center text-white font-bold group-hover:gap-3 transition-all">
              <span>Bayar Sekarang</span>
              <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-white rounded-xl p-4 md:p-6 border border-[#dbdfe6] shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-[#111318] mb-3 md:mb-4 flex items-center gap-2">
          <Icon icon="mdi:information-outline" className="w-5 h-5 text-[#135bec]" />
          Informasi Penting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Icon icon="mdi:clock-outline" className="w-6 h-6 text-[#135bec] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#111318]">Jam Operasional</p>
              <p className="text-sm text-gray-600">Senin - Sabtu, 10:00 - 19:00</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <Icon icon="mdi:phone-outline" className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#111318]">Hubungi Kami</p>
              <p className="text-sm text-gray-600">0812-3456-789</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
            <Icon icon="mdi:map-marker-outline" className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#111318]">Lokasi</p>
              <p className="text-sm text-gray-600">Jl. Ahmad Yani, Kec. Muara Dua, Kab. Ogan Komering Ulu Selatan, Sumatera Selatan 32211</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardModule;