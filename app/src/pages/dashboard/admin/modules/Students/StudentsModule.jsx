import React from 'react';
import RegistrationModule from './Registration/RegistrationModule.jsx';
import DataManagementModule from './DataManagement/DataManagementModule.jsx';
import AttendanceModule from './Attendance/AttendanceModule.jsx';
import LearningProgressModule from './LearningProgress/LearningProgressModule.jsx';

const StudentsModule = ({ activeSubModule }) => {
  const renderSubModule = () => {
    switch(activeSubModule) {
      case 'student-registration':
        return <RegistrationModule />;
      case 'student-data':
        return <DataManagementModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'learning-progress':
        return <LearningProgressModule />;
      default:
        return <RegistrationModule />; // Default to registration
    }
  };

  return (
    <div className="students-module">
      {renderSubModule()}
    </div>
  );
};

export default StudentsModule;
