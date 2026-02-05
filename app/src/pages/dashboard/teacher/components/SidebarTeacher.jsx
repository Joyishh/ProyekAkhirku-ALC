import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import authService from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';

const SidebarTeacher = ({ onMenuChange, currentModule, isMobileSidebarOpen, toggleMobileSidebar }) => {
  // Convert currentModule back to menuId
  const getMenuIdFromModule = (module) => {
    const moduleToId = {
      'Dashboard': 'dashboard',
      'My Classes': 'my-classes', 
      'Learning Progress': 'learning-progress',
      'Schedule': 'schedule'
    };
    return moduleToId[module] || 'dashboard';
  };

  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(() => getMenuIdFromModule(currentModule));
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  
  React.useEffect(() => {
    const menuId = getMenuIdFromModule(currentModule);
    setActiveMenu(menuId);
  }, [currentModule]);

  const user = {
    name: userData.username || userData.email || 'Teacher',
    role: 'Teacher',
    avatar: null
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'material-symbols:dashboard-2-outline-rounded',
      onClick: () => console.log('Navigate to Dashboard')
    },
    {
      id: 'my-classes',
      label: 'My Classes',
      icon: 'mdi:book-open-page-variant',
      onClick: () => console.log('Navigate to My Classes')
    },
    {
      id: 'learning-progress',
      label: 'Learning Progress',
      icon: 'mdi:clipboard-check-outline',
      onClick: () => console.log('Navigate to Learning Progress')
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'akar-icons:schedule',
      onClick: () => console.log('Navigate to Schedule')
    },
  ];

  const handleMenuClick = (menuId, onClick) => {
    setActiveMenu(menuId);
    onClick();
    // Notify parent component about menu change
    if (onMenuChange) {
      onMenuChange(menuId);
    }
    // Close mobile sidebar after menu click
    if (isMobileSidebarOpen && toggleMobileSidebar) {
      toggleMobileSidebar();
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Confirmation Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#135bec',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await authService.logout();
        
        toast.success('Logout berhasil', {
          position: 'top-right',
          autoClose: 2000,
        });
      
        navigate('/', { replace: true });
        
      } catch (error) {
        console.error("Logout error:", error);
        localStorage.clear();
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        h-screen w-64 bg-[#162B3A] flex flex-col shadow-lg
        fixed md:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
      {/* Top: Logo Brand + Close Button (Mobile) */}
      <div className="w-full flex justify-between items-center py-6 px-4">
        <p className='text-white font-bold text-lg'>Ababil Learning Course</p>
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <Icon icon="mdi:close" className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Main Menu Text */}
      <div className="w-full px-4 py-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">MAIN MENU</p>
      </div>

      {/* Middle: Menu navigasi teacher (Flex-1 with overflow) */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id, item.onClick)}
                className={`w-full flex items-center py-3 px-4 rounded-lg text-left transition-all duration-200 group ${
                  activeMenu === item.id
                    ? 'bg-[#2196F3] text-white font-semibold shadow-sm'
                    : 'text-gray-300 hover:bg-[#1B98E0] hover:text-white'
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 mr-3">
                  <Icon 
                    icon={item.icon} 
                    className={`text-xl ${activeMenu === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} 
                  />
                </span>
                <span className="text-sm font-medium truncate">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: User Footer (Sticky) */}
      <div className="border-t border-slate-600/50 p-4">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#10b981',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white truncate max-w-[120px]">
                {user.name}
              </span>
              <span className="text-xs text-gray-400">{user.role}</span>
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
    </aside>
    </>
  );
};

export default SidebarTeacher;
