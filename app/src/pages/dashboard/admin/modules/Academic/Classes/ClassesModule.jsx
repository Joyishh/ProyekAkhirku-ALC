import React from 'react';
import { useParams } from 'react-router-dom';
import ClassesOverview from './Views/Overview';
import ClassDetail from './Views/ClassDetail';

const ClassesModule = () => {
  const { id } = useParams();

  // ROUTING LOGIC:
  // Jika URL memiliki parameter :id (misal /classes/10), render Detail
  // Jika tidak, render Overview (Tabel)
  return (
    <>
      {id ? <ClassDetail /> : <ClassesOverview />}
    </>
  );
};

export default ClassesModule;