import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PaymentForm from './views/PaymentForm';
import Overview from './views/Overview';

const PaymentModule = ({ studentData }) => {
  // --- STATE UTAMA ---
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'payment'
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data tagihan yang akan dibayar (bisa di-set saat klik "Bayar Sekarang")
  const [selectedBill, setSelectedBill] = useState(null);

  // --- STATIC DATA ---
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());

  // FOR TESTING: Temporarily disabled registration check
  const isRegistrationApproved = true;
  
  // --- LOGIC (Existing) ---
  const getSelectedPackage = () => {
    const packages = [
      { id: '1', name: 'Paket Reguler SMA', price: 450000, description: 'Bimbel untuk semua mata pelajaran SMA' },
      { id: '2', name: 'Paket Intensif SMA', price: 650000, description: 'Bimbel intensif + try out berkala' },
      { id: '3', name: 'Paket UTBK', price: 850000, description: 'Khusus persiapan UTBK dan SBMPTN' },
      { id: '4', name: 'Paket Private', price: 1200000, description: 'Les privat 1-on-1 dengan pengajar' }
    ];
    return packages.find(pkg => pkg.id === studentData?.selectedPackage?.id) || packages[0];
  };

  const moduleFee = 50000;
  const selectedPackage = getSelectedPackage();
  const totalPayment = selectedPackage.price + moduleFee;

  // --- HELPER FUNCTIONS ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const getMonthName = (month) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[month - 1];
  };

  const getDueDate = () => {
    return `10 ${getMonthName(currentMonth).substring(0, 3)} ${currentYear}`;
  };

  // --- HANDLERS ---
  
  /**
   * Handle payment submission from PaymentForm
   * @param {Object} data - { paymentMethod: string, paymentProof: File }
   */
  const handlePaymentSubmit = async (data) => {
    const { paymentMethod, paymentProof } = data;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Monthly payment submitted:', {
        bill: selectedBill,
        paymentMethod,
        paymentProof: paymentProof.name
      });
      
      // Reset & go back to overview
      setSelectedBill(null);
      setViewMode('overview');
      
    } catch (error) {
      console.error('Monthly payment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler Navigasi Antar View
  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setViewMode('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelPayment = () => {
    setSelectedBill(null);
    setViewMode('overview');
  };
  
  // Show access denied if not approved
  if (!isRegistrationApproved) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111318]">Pembayaran Bulanan</h1>
          <p className="text-gray-500 mt-1">
            Selesaikan pembayaran SPP bulan ini sebelum tanggal jatuh tempo untuk menghindari denda.
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center">
            <Icon icon="mdi:lock" className="text-2xl text-yellow-600 mr-3" />
            <div>
              <h3 className="font-semibold text-yellow-800">Akses Terbatas</h3>
              <p className="text-yellow-700 mt-1">
                Menu pembayaran bulanan akan tersedia setelah pendaftaran Anda disetujui oleh admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RETURN CONDITIONAL VIEW ---
  return (
    <>
      {viewMode === 'overview' ? (
        <Overview 
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedPackage={selectedPackage}
          totalPayment={totalPayment}
          formatCurrency={formatCurrency}
          getMonthName={getMonthName}
          getDueDate={getDueDate}
          onPayClick={handlePayNow}
        />
      ) : (
        <PaymentForm
          bill={selectedBill || {
            month: `${getMonthName(currentMonth)} ${currentYear}`,
            dueDate: getDueDate(),
            amount: totalPayment
          }}
          isLoading={isSubmitting}
          onCancel={handleCancelPayment}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </>
  );
};

export default PaymentModule;