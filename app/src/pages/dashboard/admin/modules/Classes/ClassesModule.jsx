import React from 'react';
import ScheduleModule from './Schedule/ScheduleModule.jsx';

const ClassesModule = ({ activeSubModule }) => {
  const renderSubModule = () => {
    switch(activeSubModule) {
      case 'schedule':
        return <ScheduleModule />;
      default:
        return <ScheduleModule />; // Default to schedule
    }
  };

  return (
    <div className="classes-module">
      {renderSubModule()}
    </div>
  );
};

export default ClassesModule;
