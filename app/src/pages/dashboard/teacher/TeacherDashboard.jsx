import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';

const TeacherDashboard = () => {
  const location = useLocation();

  const getModuleName = () => {
    const path = location.pathname;
    
    if (path === '/dashboard/teacher' || path === '/dashboard/teacher/') {
      return 'Dashboard';
    }
    
    const moduleNames = {
      '/dashboard/teacher/classes': 'My Classes',
      '/dashboard/teacher/learning-progress': 'Learning Progress',
      '/dashboard/teacher/schedule': 'Schedule'
    };
    
    return moduleNames[path] || 'Dashboard';
  };

  return (
    <Layout currentModule={getModuleName()}>
      <Outlet />
    </Layout>
  );
};

export default TeacherDashboard;