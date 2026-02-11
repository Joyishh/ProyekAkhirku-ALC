import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';

const AdminDashboard = () => {
  const location = useLocation();

  const getModuleName = () => {
    const path = location.pathname;
    
    if (path === '/dashboard/admin' || path === '/dashboard/admin/') {
      return 'Dashboard';
    }
    
    const moduleNames = {
      '/dashboard/admin/teachers': 'Teachers Management',
      '/dashboard/admin/students': 'Students Management',
      '/dashboard/admin/classes': 'Classes Management',
      '/dashboard/admin/finance': 'Finance Management',
      '/dashboard/admin/announcements': 'Announcements'
    };
    
    return moduleNames[path] || 'Dashboard';
  };

  return (
    <Layout currentModule={getModuleName()}>
      <Outlet />
    </Layout>
  );
};

export default AdminDashboard;