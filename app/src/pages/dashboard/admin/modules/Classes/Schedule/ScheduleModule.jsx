import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Overview from './views/Overview';
import RoomModal from './views/RoomModal';
import ScheduleModal from './views/ScheduleModal';

const ScheduleModule = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    className: '',
    teacher: '',
    room: '',
    day: '',
    startTime: '',
    endTime: '',
    assignedStudents: []
  });

  // Mock Data: Available Classes
  const availableClasses = [
    { id: 1, name: 'Advanced English A', package: 'Intensive' },
    { id: 2, name: 'Advanced English B', package: 'Intensive' },
    { id: 3, name: 'Math Basics', package: 'Regular' },
    { id: 4, name: 'Science Laboratory', package: 'Regular' },
    { id: 5, name: 'Programming 101', package: 'Intensive' }
  ];

  // Mock Data: Available Teachers
  const availableTeachers = [
    { id: 1, name: 'Ibu Siti Rahayu' },
    { id: 2, name: 'Pak Joko Widodo' },
    { id: 3, name: 'Ibu Dewi Lestari' },
    { id: 4, name: 'Pak Bambang Susilo' },
    { id: 5, name: 'Ibu Ratna Sari' }
  ];

  // Mock Data: Available Rooms (now as state for management)
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room A-101', capacity: 20 },
    { id: 2, name: 'Room A-102', capacity: 25 },
    { id: 3, name: 'Room B-201', capacity: 30 },
    { id: 4, name: 'Lab 1', capacity: 15 },
    { id: 5, name: 'Lab 2', capacity: 15 }
  ]);

  // Mock Data: Available Students
  const [allStudents] = useState([
    { id: 1, studentId: 'STD001', name: 'Ahmad Pratama', package: 'Intensive' },
    { id: 2, studentId: 'STD002', name: 'Siti Nurhaliza', package: 'Intensive' },
    { id: 3, studentId: 'STD003', name: 'Budi Santoso', package: 'Regular' },
    { id: 4, studentId: 'STD004', name: 'Rina Wijaya', package: 'Intensive' },
    { id: 5, studentId: 'STD005', name: 'Arief Rahman', package: 'Regular' },
    { id: 6, studentId: 'STD006', name: 'Hendra Wijaya', package: 'Intensive' },
    { id: 7, studentId: 'STD007', name: 'Fitri Handayani', package: 'Regular' },
    { id: 8, studentId: 'STD008', name: 'Dimas Aditya', package: 'Intensive' },
    { id: 9, studentId: 'STD009', name: 'Lina Kusuma', package: 'Regular' },
    { id: 10, studentId: 'STD010', name: 'Eko Prasetyo', package: 'Intensive' },
    { id: 11, studentId: 'STD011', name: 'Sari Wulandari', package: 'Regular' },
    { id: 12, studentId: 'STD012', name: 'Rudi Hartono', package: 'Intensive' }
  ]);

  // Mock Data: Schedules
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      className: 'Advanced English A',
      teacher: 'Ibu Siti Rahayu',
      room: 'Room A-101',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      assignedStudents: [
        { id: 1, studentId: 'STD001', name: 'Ahmad Pratama' },
        { id: 2, studentId: 'STD002', name: 'Siti Nurhaliza' },
        { id: 4, studentId: 'STD004', name: 'Rina Wijaya' }
      ]
    },
    {
      id: 2,
      className: 'Math Basics',
      teacher: 'Pak Bambang Susilo',
      room: 'Room A-102',
      day: 'Monday',
      startTime: '13:00',
      endTime: '15:00',
      assignedStudents: [
        { id: 3, studentId: 'STD003', name: 'Budi Santoso' },
        { id: 5, studentId: 'STD005', name: 'Arief Rahman' }
      ]
    },
    {
      id: 3,
      className: 'Programming 101',
      teacher: 'Pak Joko Widodo',
      room: 'Lab 1',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '12:00',
      assignedStudents: [
        { id: 6, studentId: 'STD006', name: 'Hendra Wijaya' },
        { id: 8, studentId: 'STD008', name: 'Dimas Aditya' },
        { id: 10, studentId: 'STD010', name: 'Eko Prasetyo' },
        { id: 12, studentId: 'STD012', name: 'Rudi Hartono' }
      ]
    },
    {
      id: 4,
      className: 'Science Laboratory',
      teacher: 'Ibu Dewi Lestari',
      room: 'Lab 2',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      assignedStudents: [
        { id: 7, studentId: 'STD007', name: 'Fitri Handayani' },
        { id: 9, studentId: 'STD009', name: 'Lina Kusuma' }
      ]
    },
    {
      id: 5,
      className: 'Advanced English B',
      teacher: 'Ibu Ratna Sari',
      room: 'Room B-201',
      day: 'Thursday',
      startTime: '09:00',
      endTime: '11:00',
      assignedStudents: [
        { id: 11, studentId: 'STD011', name: 'Sari Wulandari' }
      ]
    }
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  // Filter students based on search query
  const filteredAvailableStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  // Handle open modal for add schedule
  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setFormData({
      className: '',
      teacher: '',
      room: '',
      day: '',
      startTime: '',
      endTime: '',
      assignedStudents: []
    });
    setStudentSearchQuery('');
    setShowScheduleModal(true);
  };

  // Handle open modal for edit schedule
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    const editData = {
      className: schedule.className,
      teacher: schedule.teacher,
      room: schedule.room,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      assignedStudents: schedule.assignedStudents.map(s => s.id)
    };
    setFormData(editData);
    // Store original data for comparison
    setOriginalData(JSON.parse(JSON.stringify(editData)));
    setStudentSearchQuery('');
    setShowScheduleModal(true);
  };

  // Handle form input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle student selection toggle
  const handleToggleStudent = (studentId) => {
    setFormData(prev => {
      const isSelected = prev.assignedStudents.includes(studentId);
      return {
        ...prev,
        assignedStudents: isSelected
          ? prev.assignedStudents.filter(id => id !== studentId)
          : [...prev.assignedStudents, studentId]
      };
    });
  };

  // Handle select all students
  const handleSelectAllStudents = () => {
    const allIds = filteredAvailableStudents.map(s => s.id);
    setFormData(prev => ({ ...prev, assignedStudents: allIds }));
  };

  // Handle deselect all students
  const handleDeselectAllStudents = () => {
    setFormData(prev => ({ ...prev, assignedStudents: [] }));
  };

  // Handle save schedule
  const handleSaveSchedule = async () => {
    if (!formData.className || !formData.teacher || !formData.room || !formData.day || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all class details!');
      return;
    }

    const selectedStudents = allStudents.filter(s => formData.assignedStudents.includes(s.id));

    if (editingSchedule) {
      // Check if any data has changed
      const hasChanges = 
        formData.className !== originalData.className ||
        formData.teacher !== originalData.teacher ||
        formData.room !== originalData.room ||
        formData.day !== originalData.day ||
        formData.startTime !== originalData.startTime ||
        formData.endTime !== originalData.endTime ||
        JSON.stringify(formData.assignedStudents.sort()) !== JSON.stringify(originalData.assignedStudents.sort());

      if (!hasChanges) {
        toast.info('No changes detected.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Confirmation for update
      const result = await Swal.fire({
        title: 'Update Schedule?',
        text: 'Changes will be applied to the class schedule.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#6B7280',
      });

      if (!result.isConfirmed) return;

      // Update existing schedule
      setSchedules(prev => prev.map(s => 
        s.id === editingSchedule.id 
          ? { ...s, ...formData, assignedStudents: selectedStudents }
          : s
      ));
      toast.success('Schedule updated successfully!');
    } else {
      // Add new schedule
      const newSchedule = {
        id: schedules.length + 1,
        ...formData,
        assignedStudents: selectedStudents
      };
      setSchedules(prev => [...prev, newSchedule]);
      toast.success('Schedule created successfully!');
    }

    setShowScheduleModal(false);
    setOriginalData(null);
  };

  // Handle delete schedule
  const handleDeleteSchedule = async (scheduleId) => {
    const result = await Swal.fire({
      title: 'Delete Schedule?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6B7280',
    });

    if (result.isConfirmed) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
      toast.success('Schedule deleted successfully!');
    }
  };

  // Handle add room
  const handleAddRoom = () => {
    if (!newRoomName.trim() || !newRoomCapacity) {
      toast.error('Please fill in room name and capacity!');
      return;
    }
    
    const newRoom = {
      id: rooms.length + 1,
      name: newRoomName.trim(),
      capacity: parseInt(newRoomCapacity)
    };
    
    setRooms(prev => [...prev, newRoom]);
    setNewRoomName('');
    setNewRoomCapacity('');
    toast.success('Room added successfully!');
  };

  // Handle delete room
  const handleDeleteRoom = async (roomId) => {
    const result = await Swal.fire({
      title: 'Delete Room?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6B7280',
    });

    if (result.isConfirmed) {
      setRooms(prev => prev.filter(r => r.id !== roomId));
      toast.success('Room deleted successfully!');
    }
  };

  // Get selected room capacity
  const getSelectedRoomCapacity = () => {
    const selectedRoom = rooms.find(r => r.name === formData.room);
    return selectedRoom ? selectedRoom.capacity : 0;
  };

  // Check if capacity is exceeded
  const isCapacityExceeded = () => {
    const capacity = getSelectedRoomCapacity();
    return formData.assignedStudents.length > capacity;
  };

  // Get schedules for a specific day and time slot
  const getScheduleForSlot = (day, time) => {
    return schedules.filter(schedule => {
      if (schedule.day !== day) return false;
      const scheduleStart = parseInt(schedule.startTime.replace(':', ''));
      const scheduleEnd = parseInt(schedule.endTime.replace(':', ''));
      const slotTime = parseInt(time.replace(':', ''));
      return slotTime >= scheduleStart && slotTime < scheduleEnd;
    });
  };

  // Calculate row span for schedule card
  const getRowSpan = (schedule) => {
    const start = parseInt(schedule.startTime.replace(':', ''));
    const end = parseInt(schedule.endTime.replace(':', ''));
    return (end - start) / 100;
  };

  return (
    <>
      <Overview
        days={days}
        timeSlots={timeSlots}
        schedules={schedules}
        setShowRoomModal={setShowRoomModal}
        handleAddSchedule={handleAddSchedule}
        getScheduleForSlot={getScheduleForSlot}
        getRowSpan={getRowSpan}
        handleEditSchedule={handleEditSchedule}
        handleDeleteSchedule={handleDeleteSchedule}
      />

      <RoomModal
        showRoomModal={showRoomModal}
        setShowRoomModal={setShowRoomModal}
        newRoomName={newRoomName}
        setNewRoomName={setNewRoomName}
        newRoomCapacity={newRoomCapacity}
        setNewRoomCapacity={setNewRoomCapacity}
        rooms={rooms}
        handleAddRoom={handleAddRoom}
        handleDeleteRoom={handleDeleteRoom}
      />

      <ScheduleModal
        showScheduleModal={showScheduleModal}
        setShowScheduleModal={setShowScheduleModal}
        editingSchedule={editingSchedule}
        formData={formData}
        handleInputChange={handleInputChange}
        availableClasses={availableClasses}
        availableTeachers={availableTeachers}
        rooms={rooms}
        days={days}
        timeSlots={timeSlots}
        isCapacityExceeded={isCapacityExceeded}
        getSelectedRoomCapacity={getSelectedRoomCapacity}
        handleSelectAllStudents={handleSelectAllStudents}
        handleDeselectAllStudents={handleDeselectAllStudents}
        studentSearchQuery={studentSearchQuery}
        setStudentSearchQuery={setStudentSearchQuery}
        filteredAvailableStudents={filteredAvailableStudents}
        handleToggleStudent={handleToggleStudent}
        handleSaveSchedule={handleSaveSchedule}
      />
    </>
  );
};

export default ScheduleModule;
