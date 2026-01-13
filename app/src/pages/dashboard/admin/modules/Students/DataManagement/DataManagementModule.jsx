import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// Import Views
import StudentList from './views/StudentList';
import StudentDetailModal from './views/StudentDetailModal';

/**
 * DataManagementModule - Parent Controller
 * 
 * Manages state and business logic for:
 * - Student list view with search & filter
 * - Student detail modal with edit functionality
 */
const DataManagementModule = () => {
  const [students, setStudents] = useState([
    { id: "STD001", username: "sarah.johnson", name: "Sarah Johnson", email: "sarah@email.com", program: "Paket Reguler SMA", status: "active", joined: "2024-01-15", dob: "2007-05-20", gender: "Perempuan", address: "Jl. Merdeka No. 123, Jakarta Pusat", parentName: "Robert Johnson", parentPhone: "081234567890" },
    { id: "STD002", username: "michael.brown", name: "Michael Brown", email: "michael@email.com", program: "Paket Intensif SMA", status: "active", joined: "2024-02-20", dob: "2008-08-15", gender: "Laki-laki", address: "Jl. Sudirman No. 456, Bandung", parentName: "Jennifer Brown", parentPhone: "082345678901" },
    { id: "STD003", username: "emily.davis", name: "Emily Davis", email: "emily@email.com", program: "Paket UTBK", status: "inactive", joined: "2024-01-10", dob: "2007-11-30", gender: "Perempuan", address: "Jl. Gatot Subroto No. 789, Surabaya", parentName: "Lisa Davis", parentPhone: "083456789012" },
    { id: "STD004", username: "david.wilson", name: "David Wilson", email: "david@email.com", program: "Paket Reguler SMA", status: "active", joined: "2024-03-05", dob: "2008-03-12", gender: "Laki-laki", address: "Jl. Thamrin No. 321, Jakarta Selatan", parentName: "Mark Wilson", parentPhone: "084567890123" },
    { id: "STD005", username: "lisa.martin", name: "Lisa Martin", email: "lisa@email.com", program: "Paket Private", status: "active", joined: "2024-03-10", dob: "2007-09-25", gender: "Perempuan", address: "Jl. Asia Afrika No. 12, Bandung", parentName: "John Martin", parentPhone: "085678901234" },
    { id: "STD006", username: "kevin.lee", name: "Kevin Lee", email: "kevin@email.com", program: "Paket UTBK", status: "inactive", joined: "2024-02-28", dob: "2008-01-18", gender: "Laki-laki", address: "Jl. Diponegoro No. 45, Surabaya", parentName: "Susan Lee", parentPhone: "086789012345" },
    { id: "STD007", username: "nina.santoso", name: "Nina Santoso", email: "nina@email.com", program: "Paket Intensif SMA", status: "active", joined: "2024-01-22", dob: "2007-07-11", gender: "Perempuan", address: "Jl. Pemuda No. 67, Semarang", parentName: "Budi Santoso", parentPhone: "087890123456" },
    { id: "STD008", username: "andre.putra", name: "Andre Putra", email: "andre@email.com", program: "Paket Reguler SMA", status: "active", joined: "2024-03-12", dob: "2008-04-09", gender: "Laki-laki", address: "Jl. Gajah Mada No. 89, Yogyakarta", parentName: "Rina Putra", parentPhone: "088901234567" },
    { id: "STD009", username: "siti.rahma", name: "Siti Rahma", email: "siti@email.com", program: "Paket Private", status: "inactive", joined: "2024-02-05", dob: "2007-12-02", gender: "Perempuan", address: "Jl. Ahmad Yani No. 101, Medan", parentName: "Rahmat Hidayat", parentPhone: "089012345678" },
    { id: "STD010", username: "bambang.susilo", name: "Bambang Susilo", email: "bambang@email.com", program: "Paket Reguler SMA", status: "active", joined: "2024-01-30", dob: "2008-06-21", gender: "Laki-laki", address: "Jl. Sisingamangaraja No. 23, Solo", parentName: "Dewi Susilo", parentPhone: "081234567891" },
    { id: "STD011", username: "yuni.astuti", name: "Yuni Astuti", email: "yuni@email.com", program: "Paket Intensif SMA", status: "active", joined: "2024-03-15", dob: "2007-10-14", gender: "Perempuan", address: "Jl. Slamet Riyadi No. 56, Malang", parentName: "Agus Astuti", parentPhone: "082345678912" },
    { id: "STD012", username: "agus.pratama", name: "Agus Pratama", email: "agus@email.com", program: "Paket UTBK", status: "inactive", joined: "2024-02-18", dob: "2008-02-27", gender: "Laki-laki", address: "Jl. Pahlawan No. 78, Makassar", parentName: "Siti Pratama", parentPhone: "083456789123" },
    { id: "STD013", username: "dina.kartika", name: "Dina Kartika", email: "dina@email.com", program: "Paket Private", status: "active", joined: "2024-01-18", dob: "2007-08-05", gender: "Perempuan", address: "Jl. Veteran No. 90, Palembang", parentName: "Kartika Sari", parentPhone: "084567891234" },
    { id: "STD014", username: "reza.firmansyah", name: "Reza Firmansyah", email: "reza@email.com", program: "Paket Reguler SMA", status: "active", joined: "2024-03-20", dob: "2008-05-16", gender: "Laki-laki", address: "Jl. Dipatiukur No. 34, Bandung", parentName: "Fitri Firmansyah", parentPhone: "085678912345" },
    { id: "STD015", username: "melisa.wulandari", name: "Melisa Wulandari", email: "melisa@email.com", program: "Paket Intensif SMA", status: "inactive", joined: "2024-02-25", dob: "2007-09-29", gender: "Perempuan", address: "Jl. Braga No. 77, Bandung", parentName: "Wulan Sari", parentPhone: "086789123456" }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('All Programs');
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter students based on search and program filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = filterProgram === 'All Programs' || student.program === filterProgram;
    
    return matchesSearch && matchesProgram;
  });

  // Get paginated students
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open modal with student details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setEditFormData(student);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setIsEditMode(false);
    setEditFormData({});
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save changes - Backend Ready
  const handleSaveChanges = async () => {
    // Check if there are any changes
    const hasChanges = JSON.stringify(editFormData) !== JSON.stringify(selectedStudent);
    
    if (!hasChanges) {
      toast.info('No changes detected.');
      setIsEditMode(false);
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Save Changes?',
      text: "Are you sure you want to update this student's information?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save Changes',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setIsSaving(true);
      
      try {
        // TODO: Replace with actual API call when backend is ready
        // Example API call structure:
        // const response = await fetch(`/api/students/${editFormData.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(editFormData)
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to update student');
        // }
        // 
        // const updatedStudent = await response.json();

        // Simulate API delay (remove this when backend is ready)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update local state (this will remain even with backend)
        setStudents(students.map(student => 
          student.id === editFormData.id ? editFormData : student
        ));
        setSelectedStudent(editFormData);
        setIsEditMode(false);
        
        toast.success(`Student with ID ${editFormData.id} has been successfully updated.`);
      } catch (error) {
        console.error('Error updating student:', error);
        toast.error('Failed to update student. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditFormData(selectedStudent);
    setIsEditMode(false);
  };

  // Delete student
  const handleDeleteStudent = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data siswa "${selectedStudent.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      setStudents(students.filter(student => student.id !== selectedStudent.id));
      alert('Data siswa berhasil dihapus.');
      handleCloseModal();
    }
  };

  // ============================================
  // RENDER LOGIC
  // ============================================

  return (
    <>
      {/* Student List View */}
      <StudentList 
        students={students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterProgram={filterProgram}
        setFilterProgram={setFilterProgram}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        onViewDetails={handleViewDetails}
      />

      {/* Student Detail Modal */}
      <StudentDetailModal 
        isOpen={isModalOpen}
        selectedStudent={selectedStudent}
        isEditMode={isEditMode}
        editFormData={editFormData}
        isSaving={isSaving}
        onClose={handleCloseModal}
        onEditToggle={handleEditToggle}
        onSaveChanges={handleSaveChanges}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDeleteStudent}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default DataManagementModule;
