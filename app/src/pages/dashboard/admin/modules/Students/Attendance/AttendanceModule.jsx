import React, { useState } from 'react';

// Import Views
import Overview from './views/Overview';
import ClassDetail from './views/ClassDetail';
import SessionDetail from './views/SessionDetail';

/**
 * AttendanceModule - Parent Controller/Router
 * 
 * Mengatur perpindahan antar view:
 * - 'overview': Tampilan global semua kelas (AdminAttendanceOverview)
 * - 'class-detail': Detail kelas tertentu (AdminClassDetailView)
 * - 'session-detail': Detail sesi absensi (AdminSessionDetailView)
 */
const AttendanceModule = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'class-detail' | 'session-detail'
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================

  /**
   * Handler: Navigate to Class Detail
   * Called when user clicks "View Details" on a class from Overview
   */
  const handleClassClick = (classData) => {
    setSelectedClass(classData);
    setCurrentView('class-detail');
  };

  /**
   * Handler: Navigate to Session Detail
   * Called when user clicks on an attendance history item from Class Detail
   */
  const handleSessionClick = (sessionData) => {
    setSelectedSession(sessionData);
    setCurrentView('session-detail');
  };

  /**
   * Handler: Navigate back to Overview
   * Called from Class Detail view
   */
  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedClass(null);
    setSelectedSession(null);
  };

  /**
   * Handler: Navigate back to Class Detail
   * Called from Session Detail view
   */
  const handleBackToClass = () => {
    setCurrentView('class-detail');
    setSelectedSession(null);
  };

  // ============================================
  // RENDER LOGIC
  // ============================================

  // Render Overview (View 1)
  if (currentView === 'overview') {
    return (
      <Overview 
        onClassClick={handleClassClick}
      />
    );
  }

  // Render Class Detail (View 2)
  if (currentView === 'class-detail' && selectedClass) {
    return (
      <ClassDetail 
        classData={selectedClass}
        onBack={handleBackToOverview}
        onAttendanceHistoryClick={handleSessionClick}
      />
    );
  }

  // Render Session Detail (View 3)
  if (currentView === 'session-detail' && selectedSession) {
    return (
      <SessionDetail 
        attendanceData={selectedSession}
        onBack={handleBackToClass}
      />
    );
  }

  // Fallback to Overview
  return (
    <Overview 
      onClassClick={handleClassClick}
    />
  );
};

export default AttendanceModule;
