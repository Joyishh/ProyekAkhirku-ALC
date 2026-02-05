  import React, { useState, useRef, useEffect } from 'react';
  import { Icon } from '@iconify/react';
  import { Avatar, IconButton, Badge, Tooltip } from '@mui/material';
  import Swal from 'sweetalert2';
  import { toast } from 'react-toastify';

  const HeaderStudent = ({ studentData, currentModule, onMenuChange, onLogout }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const notificationRef = useRef(null);

    // Mock notifications data for Student
    const notifications = [
      {
        id: 1,
        type: 'invoice',
        icon: 'mdi:invoice-text-clock',
        iconColor: 'text-rose-600',
        iconBg: 'bg-rose-100',
        title: 'Tagihan SPP November 2025',
        description: 'Tagihan sebesar Rp 500.000 telah terbit. Jatuh tempo 10 Nov.',
        time: '1 jam lalu',
        isRead: false
      },
      {
        id: 2,
        type: 'reminder',
        icon: 'mdi:clock-alert-outline',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100',
        title: 'Kelas Dimulai 1 Jam Lagi',
        description: 'Matematika Wajib - Ruang 102. Siapkan modul Bab 4.',
        time: '30 menit lalu',
        isRead: false
      },
      {
        id: 3,
        type: 'progress',
        icon: 'mdi:file-document-check',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        title: 'Laporan Belajar Baru',
        description: 'Nilai kuis Fisika Anda sudah keluar. Cek sekarang.',
        time: '2 jam lalu',
        isRead: true
      },
      {
        id: 4,
        type: 'receipt',
        icon: 'mdi:check-decagram',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        title: 'Pembayaran Dikonfirmasi',
        description: 'Pembayaran SPP Oktober berhasil diverifikasi admin.',
        time: '1 hari lalu',
        isRead: true
      },
      {
        id: 5,
        type: 'alert',
        icon: 'mdi:account-alert',
        iconColor: 'text-red-600',
        iconBg: 'bg-red-100',
        title: 'Peringatan Absensi',
        description: 'Anda tercatat tidak hadir pada kelas Bahasa Inggris kemarin.',
        time: '2 hari lalu',
        isRead: true
      }
    ];

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setShowNotifications(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
      { id: 'dashboard', label: 'Beranda' },
      { id: 'registration', label: 'Pendaftaran' },
      { id: 'payment', label: 'Pembayaran' },
    ];

    const handleNavClick = (menuId) => {
      if (onMenuChange) {
        onMenuChange(menuId);
      }
    };

    const handleLogout = async () => {
      const result = await Swal.fire({
        title: 'Konfirmasi Logout',
        text: 'Apakah Anda yakin ingin keluar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#135bec',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        if (onLogout) {
          onLogout();
        }
        
        // Show success toast
        toast.success('Anda telah berhasil logout', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        
        // Redirect to login or home page after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    };

    const userName = studentData?.name || 'Student';
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
      <>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Mobile Sidebar Drawer */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-[#111318]">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-2 flex-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentModule === link.label || 
                    (link.id === 'dashboard' && currentModule === 'Dashboard')
                      ? 'bg-blue-50 text-[#135bec]'
                      : 'text-[#111318] hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Bottom Section: Profile & Logout */}
            <div className="-mx-6 px-4 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-between mt-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: '#135bec',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    {userInitials}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                      {userName}
                    </span>
                    <span className="text-xs text-gray-500">Student</span>
                  </div>
                </div>

                {/* Logout Button */}
                <Tooltip title="Logout" placement="top">
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    sx={{
                      color: '#9ca3af',
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444'
                      }
                    }}
                  >
                    <Icon icon="mdi:logout" className="w-5 h-5" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#f0f2f4] bg-white px-4 py-4 md:px-10 shadow-sm">
          {/* Left: Hamburger (Mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6 text-[#111318]" />
            </button>
            <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight text-[#111318]">
              Ababil Learning Center
            </h1>
          </div>

        {/* Right: Nav & Profile */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Navigation Links - Desktop Only */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentModule === link.label || 
                  (link.id === 'dashboard' && currentModule === 'Dashboard')
                    ? 'text-[#135bec]'
                    : 'text-[#111318] hover:text-[#135bec]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200" />

          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <Badge
              badgeContent={unreadCount}
              color="error"
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <IconButton
                size="medium"
                onClick={() => setShowNotifications(!showNotifications)}
                sx={{
                  color: showNotifications ? '#135bec' : '#6b7280',
                  backgroundColor: showNotifications ? 'rgba(19, 91, 236, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                    color: '#135bec'
                  }
                }}
              >
                <Icon icon="mdi:bell-outline" className="text-xl" />
              </IconButton>
            </Badge>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="fixed left-4 right-4 top-20 md:absolute md:left-auto md:right-0 md:top-auto md:mt-2 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Notifikasi</h3>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Icon icon="mdi:bell-off-outline" className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Belum ada notifikasi</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 ${notification.iconBg} rounded-lg flex-shrink-0`}>
                              <Icon icon={notification.icon} className={`w-5 h-5 ${notification.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="text-sm font-semibold text-gray-800 truncate">
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-[#135bec] rounded-full flex-shrink-0 ml-2 mt-1"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-400 flex items-center">
                                <Icon icon="mdi:clock-outline" className="w-3 h-3 mr-1" />
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button className="w-full px-4 py-2 text-sm font-medium text-[#135bec] hover:text-[#0f4ed8] hover:bg-blue-50 rounded-lg transition-colors">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs text-gray-500">Masuk sebagai</span>
              <span className="text-sm font-semibold text-[#111318]">{userName}</span>
            </div>
            
            <Avatar
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                bgcolor: '#135bec',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '2px solid rgba(19, 91, 236, 0.2)'
              }}
            >
              {userInitials}
            </Avatar>

            <button
              onClick={handleLogout}
              className="bg-[#135bec] text-white rounded-lg px-4 py-2 text-sm font-bold shadow-md shadow-[#135bec]/20 hover:bg-[#0f4ed8] transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>
      </>
    );
  };

  export default HeaderStudent;
