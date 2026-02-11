import React, { useState } from 'react';
import StudentList from './views/StudentList';
import StudentDetailModal from './views/StudentDetailModal';

const DataManagementModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleViewDetails = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
  };

  const handleSaveSuccess = () => {
    // Trigger refresh of student list by incrementing refreshKey
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <StudentList 
        onViewDetails={handleViewDetails} 
        refreshTrigger={refreshKey}
      />
      
      <StudentDetailModal
        isOpen={isModalOpen}
        studentId={selectedStudentId}
        onClose={handleCloseModal}
        onSaveSuccess={handleSaveSuccess}
      />
    </>
  );
};

export default DataManagementModule;