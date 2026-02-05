import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentsModule = () => {
  return (
    <div className="students-module">
      <Outlet />
    </div>
  );
};

export default StudentsModule;