import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem, InputAdornment, TablePagination } from '@mui/material';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// Import Views
import ClassesTable from './views/ClassesTable';
import StudentsTable from './views/StudentsTable';
import StudentDetailModal from './views/StudentDetailModal';

/**
 * LearningProgressModule - Parent Controller
 * 
 * Manages state and business logic for:
 * - Classes list view with search & filter
 * - Students list view for selected class
 * - Student detail modal with grade editing
 */
const LearningProgressModule = () => {
  const [currentView, setCurrentView] = useState('classes'); // 'classes' | 'students'
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // State untuk Filter & Search Global (Kelas)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');

  // State untuk Search Siswa (di dalam detail kelas)
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  const [editFormData, setEditFormData] = useState(null);

  // Pagination State (Shared)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Badge color util for average score badge
  const getBadgeColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // Badge color util for progress badge
  const getProgressBadgeColor = (progress) => {
    if (progress >= 90) return 'bg-green-100 text-green-700';
    if (progress >= 75) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // Mock Data: Classes (Ditambah field 'subject' untuk filter)
  const [classes] = useState([
    {
      id: 1,
      name: "Matematika Kelas 12 IPA A",
      subject: "Matematika",
      teacher: "Ibu Siti Rahayu",
      totalStudents: 25,
      averageScore: 85.5,
      progress: 88
    },
    {
      id: 2,
      name: "Bahasa Inggris Kelas 11 B",
      subject: "Bahasa Inggris",
      teacher: "Pak Joko Widodo",
      totalStudents: 28,
      averageScore: 78.3,
      progress: 100
    },
    {
      id: 3,
      name: "Fisika Kelas 12 IPA B",
      subject: "Fisika",
      teacher: "Pak Bambang Susilo",
      totalStudents: 24,
      averageScore: 72.8,
      progress: 62
    },
    {
      id: 4,
      name: "Kimia Kelas 11 A",
      subject: "Kimia",
      teacher: "Ibu Dewi Lestari",
      totalStudents: 30,
      averageScore: 91.2,
      progress: 100
    },
    {
      id: 5,
      name: "Biologi Kelas 10 A",
      subject: "Biologi",
      teacher: "Pak Andi Saputra",
      totalStudents: 27,
      averageScore: 80.1,
      progress: 85
    },
    {
      id: 6,
      name: "Sejarah Kelas 11 C",
      subject: "Sejarah",
      teacher: "Ibu Rina Marlina",
      totalStudents: 29,
      averageScore: 76.4,
      progress: 78
    },
    {
      id: 7,
      name: "Geografi Kelas 12 IPS B",
      subject: "Geografi",
      teacher: "Pak Dedi Gunawan",
      totalStudents: 26,
      averageScore: 83.7,
      progress: 92
    },
    {
      id: 8,
      name: "Ekonomi Kelas 10 B",
      subject: "Ekonomi",
      teacher: "Ibu Sari Dewi",
      totalStudents: 31,
      averageScore: 68.9,
      progress: 70
    },
    {
      id: 9,
      name: "Sosiologi Kelas 11 IPS A",
      subject: "Sosiologi",
      teacher: "Pak Agus Salim",
      totalStudents: 23,
      averageScore: 74.2,
      progress: 80
    },
    {
      id: 10,
      name: "Matematika Kelas 10 IPA B",
      subject: "Matematika",
      teacher: "Ibu Siti Rahayu",
      totalStudents: 28,
      averageScore: 88.6,
      progress: 95
    },
    {
      id: 11,
      name: "Bahasa Indonesia Kelas 12 A",
      subject: "Bahasa Indonesia",
      teacher: "Pak Joko Widodo",
      totalStudents: 32,
      averageScore: 90.3,
      progress: 100
    },
    {
      id: 12,
      name: "Kimia Kelas 10 IPA A",
      subject: "Kimia",
      teacher: "Ibu Dewi Lestari",
      totalStudents: 22,
      averageScore: 79.5,
      progress: 88
    },
    {
      id: 13,
      name: "Fisika Kelas 11 IPA C",
      subject: "Fisika",
      teacher: "Pak Bambang Susilo",
      totalStudents: 25,
      averageScore: 82.0,
      progress: 90
    },
    {
      id: 14,
      name: "Matematika Kelas 11 IPA D",
      subject: "Matematika",
      teacher: "Ibu Siti Rahayu",
      totalStudents: 27,
      averageScore: 77.8,
      progress: 75
    },
    {
      id: 15,
      name: "Bahasa Inggris Kelas 10 C",
      subject: "Bahasa Inggris",
      teacher: "Pak Joko Widodo",
      totalStudents: 30,
      averageScore: 81.6,
      progress: 89
    }
  ]);

  // Mock Data: Students (Sama seperti data asli)
  const [students, setStudents] = useState([
    { id: 1, classId: 1, studentId: "STD001", name: "Ahmad Pratama", assignment: 88, midExam: 85, finalExam: 90, attendance: 95 },
    { id: 2, classId: 1, studentId: "STD002", name: "Siti Nurhaliza", assignment: 92, midExam: 90, finalExam: 94, attendance: 100 },
    { id: 3, classId: 1, studentId: "STD003", name: "Budi Santoso", assignment: 75, midExam: 78, finalExam: 80, attendance: 85 },
    { id: 4, classId: 1, studentId: "STD004", name: "Dewi Lestari", assignment: 85, midExam: 88, finalExam: 87, attendance: 90 },
    { id: 5, classId: 1, studentId: "STD005", name: "Eko Prasetyo", assignment: 90, midExam: 87, finalExam: 92, attendance: 95 },
    // Data dummy lain...
    { id: 6, classId: 2, studentId: "STD010", name: "Rina Wijaya", assignment: 85, midExam: 82, finalExam: 88, attendance: 92 },
    { id: 13, classId: 4, studentId: "STD030", name: "Maya Sari", assignment: 95, midExam: 92, finalExam: 96, attendance: 100 },
  ]);

  // --- Logic Helpers ---

  const calculateOverallAverage = (student) => {
    const scores = [student.assignment, student.midExam, student.finalExam];
    const validScores = scores.filter(s => s !== null && s !== undefined && s !== '');
    if (validScores.length === 0) return 0;
    return Math.round(validScores.reduce((acc, s) => acc + s, 0) / validScores.length);
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'text-green-600';
    if (progress >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // --- Filter Logic untuk Kelas ---
  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTeacher = filterTeacher === 'All' || cls.teacher === filterTeacher;
      const matchSubject = filterSubject === 'All' || cls.subject === filterSubject;
      return matchSearch && matchTeacher && matchSubject;
    });
  }, [classes, searchQuery, filterTeacher, filterSubject]);

  // Options untuk dropdown
  const teacherOptions = ['All', ...new Set(classes.map(c => c.teacher))];
  const subjectOptions = ['All', ...new Set(classes.map(c => c.subject))];

  // Logic Slicing Halaman untuk Kelas
  const currentClasses = filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // --- Filter Logic untuk Siswa ---
  const filteredStudents = students
    .filter(student => student.classId === selectedClass?.id)
    .filter(student =>
      student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(studentSearchQuery.toLowerCase())
    );

  // Logic Slicing Halaman untuk Siswa
  const currentStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // --- Handlers ---

  const handleClassClick = (classData) => {
    setSelectedClass(classData);
    setCurrentView('students');
    setStudentSearchQuery('');
    setPage(0); // Reset pagination saat ganti view
  };

  const handleBackToClasses = () => {
    setCurrentView('classes');
    setSelectedClass(null);
    setSelectedStudent(null);
    setSearchQuery('');
    setPage(0); // Reset pagination saat ganti view
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setEditFormData({ ...student });
    setIsEditMode(false);
    setShowDetailModal(true);
  };

  const handleEditToggle = () => setIsEditMode(!isEditMode);

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value === '' ? '' : Number(value)
    }));
  };

  const handleCancelEdit = () => {
    setEditFormData({ ...selectedStudent });
    setIsEditMode(false);
  };

  const handleSaveChanges = async () => {
    const hasChanges = JSON.stringify(editFormData) !== JSON.stringify(selectedStudent);
    if (!hasChanges) {
      toast.info('No changes detected.');
      setIsEditMode(false);
      return;
    }

    const result = await Swal.fire({
      title: 'Update Grades?',
      text: 'Changes will be reflected in the student\'s academic report.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#6B7280',
    });

    if (result.isConfirmed) {
      try {
        const updatedStudents = students.map(student =>
          student.id === editFormData.id ? editFormData : student
        );
        setStudents(updatedStudents);
        setSelectedStudent(editFormData);
        toast.success('Student progress updated successfully!');
        setIsEditMode(false);
      } catch {
        toast.error('Failed to update student progress.');
      }
    }
  };

  const handleCloseModal = () => {
    if (isEditMode) {
      setEditFormData({ ...selectedStudent });
      setIsEditMode(false);
    }
    setShowDetailModal(false);
    setSelectedStudent(null);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ============================================
  // RENDER LOGIC
  // ============================================

  return (
    <>
      {/* Module Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Icon icon="mdi:chart-line" className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentView === 'classes' ? 'Learning Progress Overview' : selectedClass?.name}
              </h1>
              <p className="text-gray-600">
                {currentView === 'classes'
                  ? 'Monitor student performance across all classes'
                  : `Teacher: ${selectedClass?.teacher}`
                }
              </p>
            </div>
          </div>
          {currentView === 'students' && (
            <button
              onClick={handleBackToClasses}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
              Back to Classes
            </button>
          )}
        </div>
      </div>

      {/* Classes Table View */}
      {currentView === 'classes' && (
        <ClassesTable
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterTeacher={filterTeacher}
          setFilterTeacher={setFilterTeacher}
          filterSubject={filterSubject}
          setFilterSubject={setFilterSubject}
          teacherOptions={teacherOptions}
          subjectOptions={subjectOptions}
          currentClasses={currentClasses}
          filteredClasses={filteredClasses}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          getBadgeColor={getBadgeColor}
          getProgressBadgeColor={getProgressBadgeColor}
          onClassClick={handleClassClick}
        />
      )}

      {/* Students Table View */}
      {currentView === 'students' && selectedClass && (
        <StudentsTable
          selectedClass={selectedClass}
          studentSearchQuery={studentSearchQuery}
          setStudentSearchQuery={setStudentSearchQuery}
          currentStudents={currentStudents}
          filteredStudents={filteredStudents}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          getGradeColor={getGradeColor}
          getProgressColor={getProgressColor}
          calculateOverallAverage={calculateOverallAverage}
          onStudentClick={handleStudentClick}
        />
      )}

      {/* Student Detail Modal */}
      <StudentDetailModal
        showDetailModal={showDetailModal}
        selectedStudent={selectedStudent}
        selectedClass={selectedClass}
        isEditMode={isEditMode}
        editFormData={editFormData}
        getGradeColor={getGradeColor}
        calculateOverallAverage={calculateOverallAverage}
        onClose={handleCloseModal}
        onEditToggle={handleEditToggle}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}
        onCancelEdit={handleCancelEdit}
      />
    </>
  );
};

export default LearningProgressModule;