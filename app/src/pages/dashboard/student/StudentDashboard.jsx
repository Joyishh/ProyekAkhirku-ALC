import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import StudentDashboardModule from './modules/Dashboard/StudentDashboardModule.jsx';
import RegistrationModule from './modules/Registration/RegistrationModule.jsx';
import PaymentModule from './modules/Payment/PaymentModule.jsx';

const StudentDashboard = () => {
  const [currentModule, setCurrentModule] = useState('Dashboard');
  
  // Mock student data - in real app this would come from API/context
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

  const getModuleName = (menuId) => {
    const moduleNames = {
      'dashboard': 'Dashboard',
      'registration': 'Pendaftaran',
      'payment': 'Pembayaran'
    };
    return moduleNames[menuId] || 'Dashboard';
  };

  const handleMenuChange = (menuId) => {
    setCurrentModule(getModuleName(menuId));
  };

  const handleNavigate = (moduleKey) => {
    const moduleName = getModuleName(moduleKey);
    if (moduleName) {
      setCurrentModule(moduleName);
    }
  };

  const renderModule = () => {
    switch(currentModule) {
      case 'Dashboard':
        return <StudentDashboardModule studentData={studentData} onNavigate={handleNavigate} />;
      case 'Pendaftaran':
        return <RegistrationModule studentData={studentData} />;
      case 'Pembayaran':
        return <PaymentModule studentData={studentData} />;
      default:
        return <StudentDashboardModule studentData={studentData} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout 
      currentModule={currentModule} 
      onMenuChange={handleMenuChange}
      studentData={studentData}
    >
      {renderModule()}
    </Layout>
  );
};

export default StudentDashboard;