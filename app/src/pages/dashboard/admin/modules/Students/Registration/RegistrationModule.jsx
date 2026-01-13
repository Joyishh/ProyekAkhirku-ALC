import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Menu from './views/Menu';
import RegisterForm from './views/RegisterForm';
import ReviewPending from './views/ReviewPending';

/**
 * RegistrationModule - Controller for student registration workflow
 * Manages state and business logic, delegates rendering to view components
 */
const RegistrationModule = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'register', 'review'
  const [pendingStudents, setPendingStudents] = useState([
    {
      id: 1,
      username: 'ahmad.pratama',
      email: 'ahmad@email.com',
      fullName: 'Ahmad Pratama',
      dateOfBirth: '2008-05-15',
      gender: 'Laki-laki',
      address: 'Jl. Merdeka No. 123, Jakarta',
      parentName: 'Budi Pratama',
      parentPhone: '081234567890',
      selectedPackage: 'Paket Reguler SMA',
      registrationDate: '2024-12-15',
      status: 'pending',
      paymentProof: 'https://via.placeholder.com/600x800/4299e1/ffffff?text=Bukti+Transfer+Ahmad',
      amount: 500000
    },
    {
      id: 2,
      username: 'siti.nurhaliza',
      email: 'siti@email.com',
      fullName: 'Siti Nurhaliza',
      dateOfBirth: '2007-08-22',
      gender: 'Perempuan',
      address: 'Jl. Sudirman No. 456, Bandung',
      parentName: 'Ibu Siti',
      parentPhone: '082345678901',
      selectedPackage: 'Paket Intensif SMA',
      registrationDate: '2024-12-18',
      status: 'pending',
      paymentProof: null,
      amount: 500000
    }
  ]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    parentName: '',
    parentPhone: '',
    selectedPackage: '',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProofImage, setSelectedProofImage] = useState(null);

  // Package options
  const packageOptions = [
    { id: '1', name: 'Paket Reguler SMA', price: 'Rp 750.000' },
    { id: '2', name: 'Paket Intensif SMA', price: 'Rp 950.000' },
    { id: '3', name: 'Paket UTBK', price: 'Rp 1.200.000' },
    { id: '4', name: 'Paket Private', price: 'Rp 2.000.000' }
  ];

  // Form Handlers
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

  const validateForm = () => {
    const newErrors = {};
    
    // Account validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    // Personal data validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Tanggal lahir harus diisi';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat harus diisi';
    }
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nama orang tua harus diisi';
    }
    
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Nomor HP orang tua harus diisi';
    }
    
    if (!formData.selectedPackage) {
      newErrors.selectedPackage = 'Paket belajar harus dipilih';
    }
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Metode pembayaran harus dipilih';
    }
    
    return newErrors;
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Add to pending students
    const newStudent = {
      id: pendingStudents.length + 1,
      ...formData,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentProof: null,
      amount: 500000
    };
    
    setPendingStudents(prev => [...prev, newStudent]);
    
    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      parentName: '',
      parentPhone: '',
      selectedPackage: '',
      paymentMethod: ''
    });
    
    toast.success(
      <div>
        <div className="font-semibold">Pendaftaran Siswa berhasil disimpan!</div>
        <div className="text-sm mt-1">Status: Pending - Menunggu Pembayaran</div>
      </div>
    );
    setCurrentView('menu');
  };

  const handleApprove = async (studentId) => {
    const result = await Swal.fire({
      title: 'Setujui Pendaftaran?',
      text: 'Apakah anda yakin ingin menyetujui pendaftaran calon siswa ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Setujui',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    });

    if (result.isConfirmed) {
      setPendingStudents(prev =>
        prev.map(student =>
          student.id === studentId ? { ...student, status: 'active' } : student
        )
      );
      toast.success(
        <div>
          <div className="font-semibold">Pendaftaran siswa disetujui!</div>
          <div className="text-sm mt-1">Status: Active - Siswa telah terdaftar</div>
        </div>
      );
    }
  };

  const handleReject = async (studentId) => {
    const result = await Swal.fire({
      title: 'Tolak Pendaftaran?',
      text: 'Apakah Anda yakin ingin menolak pendaftaran calon siswa ini? Data akan dihapus dari daftar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Tolak',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    });

    if (result.isConfirmed) {
      setPendingStudents(prev => prev.filter(student => student.id !== studentId));
      toast.error('Pendaftaran siswa ditolak dan dihapus!');
    }
  };

  const toggleDetail = (studentId) => {
    setExpandedRow(expandedRow === studentId ? null : studentId);
  };

  const handleViewProof = (imageUrl) => {
    setSelectedProofImage(imageUrl);
    setShowProofModal(true);
  };

  const handleCloseProofModal = () => {
    setShowProofModal(false);
    setSelectedProofImage(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get pending count
  const pendingCount = pendingStudents.filter(s => s.status === 'pending').length;
  const activeCount = pendingStudents.filter(s => s.status === 'active').length;
  const pendingList = pendingStudents.filter(s => s.status === 'pending');

  // Render based on current view
  return (
    <div className="space-y-6">
      {currentView === 'menu' && (
        <Menu
          pendingCount={pendingCount}
          activeCount={activeCount}
          totalCount={pendingStudents.length}
          onNavigateRegister={() => setCurrentView('register')}
          onNavigateReview={() => setCurrentView('review')}
        />
      )}

      {currentView === 'register' && (
        <RegisterForm
          formData={formData}
          errors={errors}
          packageOptions={packageOptions}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitRegistration}
          onCancel={() => setCurrentView('menu')}
        />
      )}

      {currentView === 'review' && (
        <ReviewPending
          pendingList={pendingList}
          expandedRow={expandedRow}
          showProofModal={showProofModal}
          selectedProofImage={selectedProofImage}
          onToggleDetail={toggleDetail}
          onViewProof={handleViewProof}
          onCloseProofModal={handleCloseProofModal}
          onApprove={handleApprove}
          onReject={handleReject}
          onBack={() => setCurrentView('menu')}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default RegistrationModule;
