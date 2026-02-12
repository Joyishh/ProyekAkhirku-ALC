import React from 'react';
import { useParams } from 'react-router-dom';
import ScheduleOverview from './Views/Overview';


const SchedulesModule = () => {
  const { id } = useParams();

  // ROUTING LOGIC:
  // Jika URL memiliki parameter :id (misal /classes/10), render Detail
  // Jika tidak, render Overview (Tabel)
  return (
    <>
      <ScheduleOverview />
    </>
  );
};

export default SchedulesModule;