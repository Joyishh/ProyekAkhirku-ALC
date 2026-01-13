import React, { useState } from 'react';
import SidebarTeacher from './SidebarTeacher.jsx';
import HeaderTeacher from './HeaderTeacher.jsx';

const Layout = ({ children, currentModule, onMenuChange }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-[#eaf3f5]">
      <SidebarTeacher 
        onMenuChange={onMenuChange} 
        currentModule={currentModule}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <HeaderTeacher 
          name="Teacher" 
          role="Teacher" 
          currentModule={currentModule}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
