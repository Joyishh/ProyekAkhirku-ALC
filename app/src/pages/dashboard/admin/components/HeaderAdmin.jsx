import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { IconButton, Divider, Badge } from '@mui/material';

const HeaderAdmin = ({ name = "Admin", currentModule = "Dashboard" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Mock notifications data for Admin
  const notifications = [
    {
      id: 1,
      type: 'registration',
      icon: 'mdi:account-plus',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      title: 'New Student Registration',
      description: 'Budi Santoso registered for Private Package.',
      time: '10 mins ago',
      isRead: false
    },
    {
      id: 2,
      type: 'payment',
      icon: 'mdi:receipt-text-check',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: 'Payment Verification Needed',
      description: 'Transfer receipt uploaded by Siti Aminah (Rp 500.000).',
      time: '30 mins ago',
      isRead: false
    },
    {
      id: 3,
      type: 'alert',
      icon: 'mdi:alert-circle',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      title: 'Teacher Attendance Alert',
      description: 'Mr. Sarah hasn\'t clocked in for Class 10-A (Started 15 mins ago).',
      time: '15 mins ago',
      isRead: false
    },
    {
      id: 4,
      type: 'report',
      icon: 'mdi:chart-box',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      title: 'Daily Summary Ready',
      description: 'Yesterday\'s revenue: Rp 2.500.000. Active classes: 12.',
      time: 'Yesterday',
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

  return (
    <header className="w-full flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
      {/* Left side - Module name and greeting */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{currentModule}</h1>
        <p className="text-sm text-gray-500">Welcome back, {name}</p>
      </div>

      {/* Right side - Notifications only */}
      <div className="flex items-center gap-3">
        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem sx={{ height: 32, alignSelf: 'center' }} />
        
        {/* Notification bell with badge */}
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
                color: showNotifications ? '#2563eb' : '#6b7280',
                backgroundColor: showNotifications ? '#eff6ff' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                  color: '#2563eb'
                }
              }}
            >
              <Icon icon="mdi:bell-outline" className="text-xl" />
            </IconButton>
          </Badge>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Icon icon="mdi:bell-off-outline" className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No notifications yet</p>
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
                                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2 mt-1"></span>
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
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
