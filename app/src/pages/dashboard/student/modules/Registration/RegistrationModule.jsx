import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import RegistrationForm from './views/RegistrationForm';
import PaymentForm from './views/PaymentForm';
import RegistrationStatus from './views/RegistrationStatus';

const RegistrationModule = ({ studentData }) => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form' | 'payment' | 'status'
  const [formData, setFormData] = useState({
    studentName: '',
    birthDate: '',
    gender: '',
    gradeLevel: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    selectedPackage: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment states
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  // Package options with new design
  const packageOptions = [
    {
      id: 'private-komputer',
      name: 'Private Siap Kerja: Komputer Perkantoran',
      subtitle: 'Ms. Word, Ms. Excel & PowerPoint',
      color: 'blue',
      icon: 'mdi:monitor',
      features: ['Administrasi Kantor', 'Pengolahan Data', '50x Pertemuan']
    },
    {
      id: 'private-desain',
      name: 'Private Siap Kerja: Desain Grafis',
      subtitle: 'Photoshop & Corel Draw',
      color: 'blue',
      icon: 'mdi:pencil-ruler',
      features: ['Digital Imaging', 'Vector Art', '50x Pertemuan']
    },
    {
      id: 'private-juara',
      name: 'Private Juara',
      subtitle: 'Bimbingan intensif mata pelajaran utama.',
      color: 'amber',
      icon: 'mdi:trophy',
      features: ['Komputer, B. Inggris', 'Matematika, Fisika', '16x & 24x Pertemuan']
    },
    {
      id: 'paket-inggris',
      name: 'Paket Khusus B. Inggris',
      subtitle: 'Program bahasa untuk semua jenjang.',
      color: 'rose',
      icon: 'mdi:translate',
      features: ['SD, SMP, SMA, & Umum', 'Indoor & Outdoor Class', '4x Meet + 1x Outdoor']
    },
    {
      id: 'paket-reguler',
      name: 'Paket Reguler: SMA/Umum',
      subtitle: 'Kelompok belajar hemat & terjangkau.',
      color: 'emerald',
      icon: 'mdi:account-group',
      features: ['SMA/Umum Komputer : 4x/meet', 'SMA/Umum Bhs Inggris : 2x/meet', 'SMA/Umum Komputer : 2x/meet']
    },
    {
      id: 'paket-sma',
      name: 'Paket Belajar SMA',
      subtitle: 'Dukungan pelajaran sekolah tingkat SMA.',
      color: 'emerald',
      icon: 'mdi:school',
      features: ['Komputer, Matematika, Fisika : 1x/meet', 'Bhs. Inggris : 2x/meet']
    },
    {
      id: 'paket-sd-smp',
      name: 'Paket Belajar SD - SMP',
      subtitle: 'Bimbingan belajar dasar hingga menengah.',
      color: 'emerald',
      icon: 'mdi:book-open-variant',
      features: ['Bhs. Inggris : 2x/meet', 'Matematika, Komputer, IPA, Tema : 1x/meet']
    },
    {
      id: 'paket-calistung',
      name: 'Paket Belajar Calistung',
      subtitle: 'Pendidikan dasar untuk anak usia dini.',
      color: 'purple',
      icon: 'mdi:baby-face-outline',
      features: ['Baca, Tulis, Hitung', 'Anak usia dini / TK', '16x & 24x Pertemuan']
    }
  ];

  const classLevels = [
    'TK',
    'SD Kelas 1-3',
    'SD Kelas 4-6',
    'SMP',
    'SMA',
    'Umum'
  ];

  // Color mappings for package cards
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      borderSelected: 'border-blue-500',
      icon: 'bg-blue-100 text-blue-600',
      check: 'text-blue-500'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      borderSelected: 'border-amber-500',
      icon: 'bg-amber-100 text-amber-600',
      check: 'text-amber-500'
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      borderSelected: 'border-rose-500',
      icon: 'bg-rose-100 text-rose-600',
      check: 'text-rose-500'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      borderSelected: 'border-emerald-500',
      icon: 'bg-emerald-100 text-emerald-600',
      check: 'text-emerald-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      borderSelected: 'border-purple-500',
      icon: 'bg-purple-100 text-purple-600',
      check: 'text-purple-500'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePackageSelect = (packageId) => {
    setFormData(prev => ({
      ...prev,
      selectedPackage: packageId
    }));
    if (errors.selectedPackage) {
      setErrors(prev => ({
        ...prev,
        selectedPackage: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Nama lengkap siswa harus diisi';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir harus diisi';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih';
    }
    
    if (!formData.gradeLevel) {
      newErrors.gradeLevel = 'Tingkat kelas harus dipilih';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat harus diisi';
    }
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nama orang tua/wali harus diisi';
    }
    
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Nomor telepon harus diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.parentPhone)) {
      newErrors.parentPhone = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Format email tidak valid';
    }
    
    if (!formData.selectedPackage) {
      newErrors.selectedPackage = 'Paket bimbel harus dipilih';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // Show confirmation dialog before proceeding to payment
    const result = await Swal.fire({
      title: 'Konfirmasi Data',
      text: 'Apakah Anda yakin data yang Anda masukkan sudah benar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Periksa Kembali',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Move to payment step
      setCurrentStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get selected package details
  const getSelectedPackage = () => {
    return packageOptions.find(pkg => pkg.id === formData.selectedPackage);
  };

  // Handle back from payment
  const handleBackFromPayment = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle payment confirmation
  const handlePaymentConfirm = async (paymentData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration submitted:', { ...formData, payment: paymentData });
      
      // Move to status step after successful payment
      setCurrentStep('status');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.', {
        position: 'top-right',
        autoClose: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmitForm = () => {
    return !studentData?.registrationStatus || studentData.registrationStatus === 'none' || studentData.registrationStatus === 'rejected';
  };

  // Handle navigation to payment with confirmation
  const handleNavigateToPayment = async () => {
    const result = await Swal.fire({
      title: 'Konfirmasi Data',
      text: 'Apakah Anda yakin data yang Anda masukkan sudah benar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Periksa Kembali',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      window.location.href = '#payment';
    }
  };

  // Show Registration Status if payment completed
  if (currentStep === 'status') {
    const selectedPkg = getSelectedPackage();
    const currentDate = new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    return (
      <RegistrationStatus
        submissionDate={currentDate}
        paymentMethod="Transfer Bank" // or QRIS based on selection
        uploadedFileName={uploadedFile?.name || 'bukti_pembayaran.jpg'}
        uploadedFileUrl={uploadedFile ? URL.createObjectURL(uploadedFile) : '#'}
        packageName={selectedPkg?.name || 'Paket Pendaftaran'}
        onViewFile={(url) => window.open(url, '_blank')}
      />
    );
  }

  // Show Payment Form if on payment step
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <PaymentForm
            uploadedFile={uploadedFile}
            isDragging={isDragging}
            isConfirmed={isConfirmed}
            copiedAccount={copiedAccount}
            selectedPackage={getSelectedPackage()}
            setUploadedFile={setUploadedFile}
            setIsDragging={setIsDragging}
            setIsConfirmed={setIsConfirmed}
            setCopiedAccount={setCopiedAccount}
            onBack={handleBackFromPayment}
            onConfirm={handlePaymentConfirm}
          />
        </div>
      </div>
    );
  }

  // Show Registration Form
  return (
    <RegistrationForm
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      packageOptions={packageOptions}
      classLevels={classLevels}
      colorClasses={colorClasses}
      studentData={studentData}
      canSubmitForm={canSubmitForm()}
      handleInputChange={handleInputChange}
      handlePackageSelect={handlePackageSelect}
      handleSubmit={handleSubmit}
      handleNavigateToPayment={handleNavigateToPayment}
    />
  );
};

export default RegistrationModule;