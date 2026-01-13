import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Overview from './views/Overview';

const AnnouncementsModule = () => {
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All Users',
    priority: 'normal',
    deliveryType: 'immediate', // 'immediate' or 'scheduled'
    scheduleDate: '',
    scheduleTime: '',
    attachment: null
  });

  // History Tab State
  const [activeHistoryTab, setActiveHistoryTab] = useState('sent'); // 'sent' or 'scheduled'

  // Mock Data - Announcements
  const [announcements] = useState([
    {
      id: 1,
      title: 'Holiday Schedule - End of Year Break',
      content: 'Classes will be suspended from December 24th to January 2nd. All students and parents are advised to plan accordingly.',
      targetAudience: 'All Users',
      priority: 'important',
      date: '2025-12-20',
      time: '09:00',
      status: 'sent',
      reads: 245
    },
    {
      id: 2,
      title: 'Emergency Class Cancellation',
      content: 'Due to severe weather conditions, all classes scheduled for today have been cancelled. Stay safe!',
      targetAudience: 'All Students',
      priority: 'urgent',
      date: '2025-12-15',
      time: '07:30',
      status: 'sent',
      reads: 312
    },
    {
      id: 3,
      title: 'New Teaching Materials Available',
      content: 'Updated curriculum materials for Advanced Math and Science are now available in the resource center.',
      targetAudience: 'Teachers',
      priority: 'normal',
      date: '2025-12-12',
      time: '14:00',
      status: 'sent',
      reads: 28
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting Reminder',
      content: 'Monthly parent-teacher conference scheduled for next Friday. Please confirm your attendance.',
      targetAudience: 'All Users',
      priority: 'important',
      date: '2025-12-10',
      time: '16:00',
      status: 'sent',
      reads: 189
    },
    {
      id: 5,
      title: 'Upcoming Final Exam Schedule',
      content: 'Final examinations will commence from January 15th. Detailed schedule will be shared next week.',
      targetAudience: 'All Students',
      priority: 'important',
      date: '2025-12-25',
      time: '10:00',
      status: 'scheduled',
      reads: 0
    },
    {
      id: 6,
      title: 'System Maintenance Notice',
      content: 'The student portal will undergo maintenance on December 28th from 2 AM to 6 AM. Services will be temporarily unavailable.',
      targetAudience: 'All Users',
      priority: 'normal',
      date: '2025-12-26',
      time: '08:00',
      status: 'scheduled',
      reads: 0
    },
    {
      id: 7,
      title: 'New Year Celebration Event',
      content: 'Join us for the New Year celebration event on January 3rd. All students and staff are invited!',
      targetAudience: 'All Users',
      priority: 'normal',
      date: '2025-12-30',
      time: '15:00',
      status: 'scheduled',
      reads: 0
    }
  ]);

  // Handle Form Input Change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  // Handle Form Submit
  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in title and content!');
      return;
    }

    if (formData.deliveryType === 'scheduled' && (!formData.scheduleDate || !formData.scheduleTime)) {
      toast.error('Please select date and time for scheduled delivery!');
      return;
    }

    const result = await Swal.fire({
      title: formData.deliveryType === 'immediate' ? 'Send Announcement?' : 'Schedule Announcement?',
      html: `
        <div class="text-left">
          <p class="text-sm text-gray-600 mb-2"><strong>Title:</strong> ${formData.title}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Target:</strong> ${formData.targetAudience}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Priority:</strong> ${formData.priority}</p>
          ${formData.deliveryType === 'scheduled' ? `<p class="text-sm text-gray-600"><strong>Schedule:</strong> ${formData.scheduleDate} at ${formData.scheduleTime}</p>` : ''}
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: formData.deliveryType === 'immediate' ? 'Yes, Send Now' : 'Yes, Schedule It',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      console.log('Announcement Data:', formData);
      toast.success(`Announcement "${formData.title}" ${formData.deliveryType === 'immediate' ? 'sent' : 'scheduled'} successfully!`);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        targetAudience: 'All Users',
        priority: 'normal',
        deliveryType: 'immediate',
        scheduleDate: '',
        scheduleTime: '',
        attachment: null
      });
    }
  };

  // Handle Delete Announcement
  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: 'Delete Announcement?',
      text: `"${title}" will be permanently removed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete It',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      console.log('Deleting announcement:', id);
      toast.success('Announcement deleted successfully!');
    }
  };

  // Filter announcements by status
  const filteredAnnouncements = announcements.filter(
    announcement => announcement.status === activeHistoryTab
  );

  // Priority color mapping
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'urgent':
        return {
          border: 'border-l-4 border-red-500',
          badge: 'bg-red-100 text-red-700',
          icon: 'text-red-500'
        };
      case 'important':
        return {
          border: 'border-l-4 border-yellow-500',
          badge: 'bg-yellow-100 text-yellow-700',
          icon: 'text-yellow-500'
        };
      default:
        return {
          border: 'border-l-4 border-gray-300',
          badge: 'bg-gray-100 text-gray-700',
          icon: 'text-gray-500'
        };
    }
  };

  return (
    <Overview
      // Form State
      formData={formData}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      
      // History State
      activeHistoryTab={activeHistoryTab}
      setActiveHistoryTab={setActiveHistoryTab}
      filteredAnnouncements={filteredAnnouncements}
      
      // Functions
      handleDelete={handleDelete}
      getPriorityStyles={getPriorityStyles}
    />
  );
};

export default AnnouncementsModule;
