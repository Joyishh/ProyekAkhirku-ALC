import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import TeacherDashboardModule from './modules/Dashboard/TeacherDashboardModule.jsx';
import MyClassesModule from './modules/MyClasses/MyClassesModule.jsx';
import LearningProgressModule from './modules/LearningProgress/LearningProgressModule.jsx';
import ScheduleModule from './modules/Schedule/ScheduleModule.jsx';

const TeacherDashboard = () => {
  const [currentModule, setCurrentModule] = useState('Dashboard');

  const getModuleName = (menuId) => {
    const moduleNames = {
      'dashboard': 'Dashboard',
      'my-classes': 'My Classes',
      'learning-progress': 'Learning Progress',
      'schedule': 'Schedule',
    };
    return moduleNames[menuId] || 'Dashboard';
  };

  const handleMenuChange = (menuId) => {
    setCurrentModule(getModuleName(menuId));
  };

  const handleNavigate = (moduleKey) => {
    // Use the same mapping as handleMenuChange untuk konsistensi
    const moduleName = getModuleName(moduleKey);
    if (moduleName) {
      setCurrentModule(moduleName);
      // This will trigger sidebar to update active state
    }
  };

  const renderModule = () => {
    switch(currentModule) {
      case 'Dashboard':
        return <TeacherDashboardModule onNavigate={handleNavigate} />;
      case 'My Classes':
        return <MyClassesModule />;
      case 'Learning Progress':
        return <LearningProgressModule />;
      case 'Schedule':
        return <ScheduleModule />;
      default:
        return <TeacherDashboardModule onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentModule={currentModule} onMenuChange={handleMenuChange}>
      {renderModule()}
    </Layout>
  );
};

export default TeacherDashboard;
