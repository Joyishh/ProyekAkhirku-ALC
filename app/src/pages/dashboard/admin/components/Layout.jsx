import React from 'react';
import SidebarAdmin from './SidebarAdmin.jsx';
import HeaderAdmin from './HeaderAdmin.jsx';

const Layout = ({ children, currentModule, onMenuChange }) => {
  return (
    <div className="flex h-screen bg-[#eaf3f5]">
      <SidebarAdmin onMenuChange={onMenuChange} />
      <div className="flex-1 flex flex-col min-h-screen">
        <HeaderAdmin name="Admin" role="Admin / Owner" currentModule={currentModule} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
