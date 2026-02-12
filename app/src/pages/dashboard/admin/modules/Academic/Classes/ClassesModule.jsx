import React from 'react';
import { useParams } from 'react-router-dom';
import ClassesOverview from './Views/Overview';

const ClassesModule = () => {
  const { id } = useParams();

  // ROUTING LOGIC:
  // Jika URL memiliki parameter :id (misal /classes/10), render Detail
  // Jika tidak, render Overview (Tabel)
  return (
    <>
      <ClassesOverview />
    </>
  );
};

export default ClassesModule;