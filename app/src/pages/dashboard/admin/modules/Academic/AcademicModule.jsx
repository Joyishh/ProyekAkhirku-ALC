import React from 'react';
import { Outlet } from 'react-router-dom';

const AcademicModule = () => {
  return (
    <div className="academic-module">
      <Outlet />
    </div>
  );
};

export default AcademicModule;
