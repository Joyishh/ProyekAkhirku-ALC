import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Layout from './components/Layout.jsx';

const StudentDashboard = () => {
  // Mock student data
  const [studentData] = useState({
    name: 'Ahmad Pratama',
    email: 'ahmad@email.com',
    registrationStatus: 'none', // none, pending, approved, rejected
    registrationNote: '',
    paymentStatus: 'unpaid', // unpaid, pending, paid
    registrationFeeStatus: 'unpaid', // unpaid, pending, paid
    monthlyFeeStatus: 'unpaid', // unpaid, pending, paid
    selectedPackage: {
      id: '1',
      name: 'Paket Reguler SMA',
      price: 750000,
      displayPrice: 'Rp 750.000',
      description: 'Bimbel untuk semua mata pelajaran SMA'
    }
  });

  return (
    <Layout studentData={studentData}>
      <Outlet context={{ studentData }} />
    </Layout>
  );
};

export default StudentDashboard;