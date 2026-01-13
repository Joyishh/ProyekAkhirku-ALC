import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import AdminDashboardModule from './modules/Dashboard/AdminDashboardModule.jsx';
import StudentsModule from './modules/Students/StudentsModule.jsx';
import ClassesModule from './modules/Classes/ClassesModule.jsx';
import FinanceModule from './modules/Finance/FinanceModule.jsx';
import AnnouncementsModule from './modules/Announcements/AnnouncementsModule.jsx';

const AdminDashboard = () => {
  const [currentModule, setCurrentModule] = useState('Dashboard');

  const getModuleName = (menuId) => {
    const moduleNames = {
      'dashboard': 'Dashboard',
      'student-registration': 'Student Registration',
      'student-data': 'Students Data Management',
      'attendance': 'Attendance Management',
      'learning-progress': 'Learning Progress',
      'schedule': 'Schedule Management',
      'finance': 'Finance Management',
      'announcements': 'Announcements'
    };
    return moduleNames[menuId] || 'Dashboard';
  };

  const handleMenuChange = (menuId) => {
    setCurrentModule(getModuleName(menuId));
  };

  const renderModule = () => {
    switch(currentModule) {
      case 'Dashboard':
        return <AdminDashboardModule />;
      
      // Students group modules
      case 'Student Registration':
      case 'Students Data Management':
      case 'Attendance Management':
      case 'Learning Progress':
        return <StudentsModule activeSubModule={getSubModuleId(currentModule)} />;
      
      // Classes group modules
      case 'Schedule Management':
        return <ClassesModule activeSubModule={getSubModuleId(currentModule)} />;
      
      // Single modules
      case 'Finance Management':
        return <FinanceModule />;
      case 'Announcements':
        return <AnnouncementsModule />;
      
      default:
        return <AdminDashboardModule />;
    }
  };

  const getSubModuleId = (moduleName) => {
    const subModuleMap = {
      'Student Registration': 'student-registration',
      'Students Data Management': 'student-data',
      'Attendance Management': 'attendance',
      'Learning Progress': 'learning-progress',
      'Schedule Management': 'schedule'
    };
    return subModuleMap[moduleName] || '';
  };

  return (
    <Layout currentModule={currentModule} onMenuChange={handleMenuChange}>
      {renderModule()}
    </Layout>
  );
};

export default AdminDashboard;