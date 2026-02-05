import React from 'react';
import { Outlet } from 'react-router-dom';

const ClassesModule = () => {
  return (
    <div className="classes-module">
      <Outlet />
    </div>
  );
};

export default ClassesModule;