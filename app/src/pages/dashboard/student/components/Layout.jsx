import React from 'react';
import HeaderStudent from './HeaderStudent.jsx';
import FooterStudent from './FooterStudent.jsx';

const Layout = ({ children, currentModule, onMenuChange, studentData }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f8] font-sans text-[#111318] transition-colors duration-200">
      {/* Header */}
      <HeaderStudent 
        studentData={studentData}
        currentModule={currentModule}
        onMenuChange={onMenuChange}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1080px] mx-auto px-4 md:px-10 py-8 flex flex-col">
        {children}
      </main>
      
      {/* Footer */}
      <FooterStudent />
    </div>
  );
};

export default Layout;