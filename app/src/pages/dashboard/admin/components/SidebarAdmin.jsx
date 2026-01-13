import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const SidebarAdmin = ({ onMenuChange, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedGroups, setExpandedGroups] = useState({});

  // User data
  const user = {
    name: 'John Smith',
    role: 'Admin / Owner',
    avatar: null
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'material-symbols:dashboard-2-outline-rounded',
      type: 'single'
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'mdi:account-group',
      type: 'dropdown',
      children: [
        { id: 'student-registration', label: 'Registration', icon: 'mdi:account-plus' },
        { id: 'student-data', label: 'Students Data', icon: 'mdi:database-edit' },
        { id: 'attendance', label: 'Attendance', icon: 'mdi:clipboard-check' },
        { id: 'learning-progress', label: 'Learning Progress', icon: 'mdi:chart-line' }
      ]
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: 'mdi:school',
      type: 'dropdown',
      children: [
        { id: 'schedule', label: 'Schedule', icon: 'mdi:calendar-clock' }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: 'mdi:currency-usd',
      type: 'single'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: 'mdi:bullhorn',
      type: 'single'
    }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    // Notify parent component about menu change
    if (onMenuChange) {
      onMenuChange(menuId);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
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
      if (onLogout) {
        onLogout();
      }
      
      // Show success toast
      toast.success('You have successfully logged out', {
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

  return (
    <aside className="h-screen w-64 bg-[#162B3A] flex flex-col shadow-lg">
      {/* Logo di bagian atas dengan background terang dan padding */}
      <div className="w-full flex justify-center items-center py-6 px-4">
        <p className='text-white font-bold text-lg'>Ababil Learning Course</p>
      </div>
      
      {/* Main Menu Text */}
      <div className="w-full px-4 py-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">MAIN MENU</p>
      </div>

      {/* Menu navigasi admin */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.type === 'single' ? (
                <button
                  onClick={() => handleMenuClick(item.id)}
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
              ) : (
                <div>
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className="w-full flex items-center py-3 px-4 rounded-lg text-left transition-all duration-200 group text-gray-300 hover:bg-[#1B98E0] hover:text-white"
                  >
                    <span className="flex items-center justify-center w-6 h-6 mr-3">
                      <Icon 
                        icon={item.icon} 
                        className="text-xl text-gray-300 group-hover:text-white" 
                      />
                    </span>
                    <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                    <Icon 
                      icon={expandedGroups[item.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
                      className="text-lg text-gray-300 group-hover:text-white" 
                    />
                  </button>
                  
                  {expandedGroups[item.id] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={() => handleMenuClick(child.id)}
                            className={`w-full flex items-center py-2 px-3 rounded-md text-left transition-all duration-200 group ${
                              activeMenu === child.id
                                ? 'bg-[#2196F3] text-white font-semibold shadow-sm'
                                : 'text-gray-400 hover:bg-[#1B98E0] hover:text-white'
                            }`}
                          >
                            <span className="flex items-center justify-center w-5 h-5 mr-3">
                              <Icon 
                                icon={child.icon} 
                                className={`text-lg ${activeMenu === child.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} 
                              />
                            </span>
                            <span className="text-sm font-medium truncate">{child.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
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
                bgcolor: '#3b82f6',
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
  );
};

export default SidebarAdmin;
