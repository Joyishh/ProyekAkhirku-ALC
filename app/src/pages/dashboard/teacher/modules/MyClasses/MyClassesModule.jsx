import React, { useState } from 'react';
import ClassesMainView from './views/Overview';
import ClassDetailView from './views/ClassDetail';
import AttendanceDetailView from './views/SessionDetail';

const MyClassesModule = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'detail', or 'attendance'
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const handleClassClick = (classData) => {
    setSelectedClass(classData);
    setCurrentView('detail');
  };

  const handleAttendanceHistoryClick = (attendanceData) => {
    setSelectedAttendance(attendanceData);
    setCurrentView('attendance');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedClass(null);
    setSelectedAttendance(null);
  };

  const handleBackToDetail = () => {
    setCurrentView('detail');
    setSelectedAttendance(null);
  };

  return (
    <div className="space-y-6">
      {currentView === 'main' && (
        <ClassesMainView onClassClick={handleClassClick} />
      )}
      {currentView === 'detail' && (
        <ClassDetailView 
          classData={selectedClass}
          onBack={handleBackToMain}
          onAttendanceHistoryClick={handleAttendanceHistoryClick}
        />
      )}
      {currentView === 'attendance' && (
        <AttendanceDetailView 
          attendanceData={selectedAttendance}
          onBack={handleBackToDetail}
        />
      )}
    </div>
  );
};

export default MyClassesModule;
