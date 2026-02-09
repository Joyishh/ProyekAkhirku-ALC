import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Menu from './views/Menu';
import RegisterForm from './views/RegisterForm';
import ReviewPending from './views/ReviewPending';
import registrationService from '../../../../../../services/registrationService';

/**
 * RegistrationModule - Controller for student registration workflow
 * Manages state and business logic, delegates rendering to view components
 */
const RegistrationModule = () => {
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'register', 'review'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingStudents, setPendingStudents] = useState([]);

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

  // Fetch registrations data from API
  const fetchRegistrations = async () => {
    try {
      const response = await registrationService.getAllRegistrations();
      if (response.success && response.data) {
        // Transform API data to match component structure
        const transformedData = response.data.map(reg => ({
          id: reg.registrationId,
          userId: reg.userId,
          username: reg.user?.username || 'N/A',
          email: reg.user?.email || 'N/A',
          fullName: reg.studentFullname,
          dateOfBirth: reg.studentDateOfBirth,
          gender: reg.studentGender,
          address: reg.studentAddress,
          parentName: reg.parentName,
          parentPhone: reg.parentPhone,
          selectedPackage: reg.package?.packageName || 'N/A',
          selectedPackageId: reg.selectedPackageId,
          paymentMethod: reg.paymentMethod,
          registrationDate: new Date(reg.createdAt).toLocaleDateString('id-ID'),
          status: reg.status === 'pending_review' ? 'pending' : reg.status,
          adminNotes: reg.adminNotes,
          paymentProof: null // Add payment proof URL if available from backend
        }));
        setPendingStudents(transformedData);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Gagal memuat data pendaftaran');
    }
  };

  // Fetch data on component mount and when switching to review view
  useEffect(() => {
    if (currentView === 'review') {
      fetchRegistrations();
    }
  }, [currentView]);

  // Package options (deprecated - now fetched from API in RegisterForm)
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

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Additional password confirmation check
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok!');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare payload
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        selectedPackage: formData.selectedPackage, // This is the packageId
        paymentMethod: formData.paymentMethod
      };
      
      const response = await registrationService.createRegistration(payload);
      
      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil!',
        text: response.message || 'Data siswa berhasil didaftarkan dan masuk ke antrean review.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#10b981',
      });
      
      // Reset form to initial state
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
      
      // Clear any errors
      setErrors({});
      
      // Switch to review view and refresh the data
      setCurrentView('review');
      
      // Fetch updated registrations list
      await fetchRegistrations();
      
    } catch (error) {
      // Show error message from backend
      const errorMessage = error.message || 'Terjadi kesalahan saat mendaftarkan siswa. Silakan coba lagi.';
      console.error('Displaying error message to user:', errorMessage);
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      try {
        await registrationService.updateRegistrationStatus(studentId, { status: 'approved' });
        toast.success(
          <div>
            <div className="font-semibold">Pendaftaran siswa disetujui!</div>
            <div className="text-sm mt-1">Status: Approved - Siswa telah terdaftar</div>
          </div>
        );
        // Refresh data
        await fetchRegistrations();
      } catch (error) {
        toast.error(error.message || 'Gagal menyetujui pendaftaran');
      }
    }
  };

  const handleReject = async (studentId) => {
    const result = await Swal.fire({
      title: 'Tolak Pendaftaran?',
      text: 'Apakah Anda yakin ingin menolak pendaftaran calon siswa ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Tolak',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    });

    if (result.isConfirmed) {
      try {
        await registrationService.updateRegistrationStatus(studentId, { status: 'rejected' });
        toast.error('Pendaftaran siswa ditolak!');
        // Refresh data
        await fetchRegistrations();
      } catch (error) {
        toast.error(error.message || 'Gagal menolak pendaftaran');
      }
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
          isSubmitting={isSubmitting}
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