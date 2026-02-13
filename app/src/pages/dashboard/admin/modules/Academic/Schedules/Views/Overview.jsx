import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../../../../../../../utils/api';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import AddScheduleModal from './AddScheduleModal';

const Overview = () => {
  // State Management
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClassId, setSelectedClassId] = useState('all');

  // Days of week configuration
  const daysOfWeek = [
    { value: 'Monday', label: 'Senin' },
    { value: 'Tuesday', label: 'Selasa' },
    { value: 'Wednesday', label: 'Rabu' },
    { value: 'Thursday', label: 'Kamis' },
    { value: 'Friday', label: 'Jumat' },
    { value: 'Saturday', label: 'Sabtu' },
    { value: 'Sunday', label: 'Minggu' }
  ];

  // Fetch data on mount
  useEffect(() => {
    fetchSchedules();
    fetchClasses();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await api.get('/class-schedules');
      setSchedules(response.data.data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      alert('Gagal memuat jadwal pelajaran');
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes');
      setClasses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  // Get schedules for a specific day (filtered by class if needed)
  const getSchedulesForDay = (dayValue) => {
    let filteredSchedules = schedules.filter(schedule => schedule.day_of_week === dayValue);
    
    if (selectedClassId !== 'all') {
      filteredSchedules = filteredSchedules.filter(
        schedule => schedule.class_id === parseInt(selectedClassId)
      );
    }
    
    return filteredSchedules;
  };

  // Week navigation
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Get start and end of current week
  const getWeekRange = () => {
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay() + 1;
    const last = first + 6;
    
    const monday = new Date(curr.setDate(first));
    const sunday = new Date(curr.setDate(last));
    
    const options = { day: 'numeric', month: 'short' };
    return `${monday.toLocaleDateString('id-ID', options)} - ${sunday.toLocaleDateString('id-ID', options)}`;
  };

  // Check if a day is today
  const isToday = (dayValue) => {
    const today = new Date();
    const dayIndex = daysOfWeek.findIndex(d => d.value === dayValue);
    const todayDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Convert Sunday=0 to Sunday=6
    return todayDayIndex === dayIndex;
  };

  // Get color for schedule card
  const getCardColor = (index) => {
    const colors = [
      'bg-blue-50 border-blue-300 hover:border-blue-400',
      'bg-green-50 border-green-300 hover:border-green-400',
      'bg-purple-50 border-purple-300 hover:border-purple-400',
      'bg-orange-50 border-orange-300 hover:border-orange-400',
      'bg-pink-50 border-pink-300 hover:border-pink-400',
      'bg-cyan-50 border-cyan-300 hover:border-cyan-400'
    ];
    return colors[index % colors.length];
  };

  const handleAddSchedule = () => {
    if (selectedClassId === 'all') {
      alert('Silakan pilih kelas terlebih dahulu untuk menambah jadwal');
      return;
    }
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Memuat jadwal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:calendar-month"
        iconColor="indigo"
        title="Jadwal Pelajaran"
        description="Atur jadwal kegiatan belajar mengajar mingguan"
      >
        <div className="flex items-center space-x-3">
          {/* Class Filter */}
          <div className="relative">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white cursor-pointer"
            >
              <option value="all">Semua Kelas</option>
              {classes.map(cls => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </select>
            <Icon 
              icon="mdi:chevron-down" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Add Schedule Button */}
          <button
            onClick={handleAddSchedule}
            className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2" />
            Buat Jadwal
          </button>
        </div>
      </ModuleHeader>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={goToPreviousWeek}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <Icon icon="mdi:chevron-left" className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Minggu Sebelumnya</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:calendar-range" className="w-5 h-5 text-indigo-600" />
            <span className="text-base sm:text-lg font-semibold text-gray-800">{getWeekRange()}</span>
          </div>

          <button
            onClick={goToNextWeek}
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Minggu Berikutnya</span>
            <Icon icon="mdi:chevron-right" className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header Row - Days */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {daysOfWeek.map((day) => (
                <div
                  key={day.value}
                  className={`px-4 py-3 text-center font-semibold text-sm ${
                    isToday(day.value)
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {day.label}
                  {isToday(day.value) && (
                    <div className="text-xs font-normal opacity-90 mt-1">Hari Ini</div>
                  )}
                </div>
              ))}
            </div>

            {/* Schedule Grid Body */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 min-h-[500px]">
              {daysOfWeek.map((day) => {
                const daySchedules = getSchedulesForDay(day.value);
                return (
                  <div
                    key={day.value}
                    className="bg-white p-3 space-y-2 overflow-y-auto max-h-[600px]"
                  >
                    {daySchedules.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                        <Icon icon="mdi:calendar-blank" className="w-12 h-12 mb-2 opacity-30" />
                        <p className="text-xs text-center">Tidak ada jadwal</p>
                      </div>
                    ) : (
                      daySchedules.map((schedule, index) => (
                        <div
                          key={schedule.schedule_id || index}
                          className={`p-3 rounded-lg border-l-4 ${getCardColor(index)} transition-all cursor-pointer`}
                        >
                          {/* Subject Name */}
                          <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">
                            {schedule.subject?.subject_name || 'Unknown Subject'}
                          </h4>

                          {/* Time */}
                          <div className="flex items-center text-xs text-gray-600 mb-1.5">
                            <Icon icon="mdi:clock-outline" className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                            <span>
                              {schedule.start_time} - {schedule.end_time}
                            </span>
                          </div>

                          {/* Class Name */}
                          {selectedClassId === 'all' && (
                            <div className="flex items-center text-xs text-gray-600 mb-1.5">
                              <Icon icon="mdi:google-classroom" className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                              <span className="truncate">
                                {schedule.class?.className || 'Unknown Class'}
                              </span>
                            </div>
                          )}

                          {/* Teacher */}
                          <div className="flex items-center text-xs text-gray-600 mb-1.5">
                            <Icon icon="mdi:account-tie" className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                            <span className="truncate">
                              {schedule.teacher?.fullname || 'No Teacher'}
                            </span>
                          </div>

                          {/* Location */}
                          {schedule.location_or_room && (
                            <div className="flex items-center text-xs text-gray-600">
                              <Icon icon="mdi:map-marker" className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                              <span className="truncate">{schedule.location_or_room}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={selectedClassId !== 'all' ? parseInt(selectedClassId) : null}
        onSuccess={fetchSchedules}
      />
    </div>
  );
};

export default Overview;