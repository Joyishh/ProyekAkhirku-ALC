import React, { useState } from 'react';

// Import child components
import ClassesView from './views/Overview';
import StudentTable from './views/StudentTable';

const LearningProgressModule = () => {
  // State: hanya 2 view (classes | students)
  const [currentView, setCurrentView] = useState('classes');
  const [selectedClass, setSelectedClass] = useState(null);

  // Navigation handlers
  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    setCurrentView('students');
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setCurrentView('classes');
  };

  // Render appropriate view based on current state
  const renderCurrentView = () => {
    switch(currentView) {
      case 'classes':
        return <ClassesView onClassClick={handleClassClick} />;
      
      case 'students':
        return (
          <StudentTable 
            selectedClass={selectedClass}
            onBackClick={handleBackToClasses}
          />
        );
      
      default:
        return <ClassesView onClassClick={handleClassClick} />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
};

export default LearningProgressModule;
