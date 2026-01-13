import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardContent, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';

const ScheduleModule = () => {
  const [viewMode, setViewMode] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- Sample Schedule Data ---
  const scheduleData = useMemo(() => [
    {
      id: 1,
      className: "Advanced English",
      day: "Monday",
      dayIndex: 1,
      startTime: "10:00",
      endTime: "12:00",
      room: "Room 101",
      students: 12,
      date: new Date(2025, 11, 30), // Monday
    },
    {
      id: 2,
      className: "Beginner Spanish",
      day: "Monday",
      dayIndex: 1,
      startTime: "14:00",
      endTime: "15:30",
      room: "Room 203",
      students: 8,
      date: new Date(2025, 11, 30), // Monday
    },
    {
      id: 3,
      className: "Intermediate French",
      day: "Tuesday",
      dayIndex: 2,
      startTime: "16:00",
      endTime: "18:00",
      room: "Room 105",
      students: 15,
      date: new Date(2025, 11, 31), // Tuesday
    },
    {
      id: 4,
      className: "Advanced English",
      day: "Wednesday",
      dayIndex: 3,
      startTime: "10:00",
      endTime: "12:00",
      room: "Room 101",
      students: 12,
      date: new Date(2026, 0, 1), // Wednesday
    },
    {
      id: 5,
      className: "Basic Conversation",
      day: "Thursday",
      dayIndex: 4,
      startTime: "09:00",
      endTime: "10:30",
      room: "Room 202",
      students: 10,
      date: new Date(2026, 0, 2), // Thursday
    },
    {
      id: 6,
      className: "Business English",
      day: "Friday",
      dayIndex: 5,
      startTime: "13:00",
      endTime: "15:00",
      room: "Room 301",
      students: 6,
      date: new Date(2026, 0, 3), // Friday
    },
    {
      id: 7,
      className: "Grammar Focus",
      day: "Saturday",
      dayIndex: 6,
      startTime: "11:00",
      endTime: "12:30",
      room: "Room 104",
      students: 14,
      date: new Date(2025, 11, 28), // Today (Saturday)
    }
  ], []);

  // --- Helper Functions ---
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getWeekRange = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const getMonthRange = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { start, end };
  };

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const isInRange = (date, start, end) => {
    return date >= start && date <= end;
  };

  // --- Handlers ---
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // --- Filter Logic ---
  const filteredClasses = useMemo(() => {
    if (viewMode === 'day') {
      return scheduleData.filter(classItem => isSameDay(classItem.date, currentDate));
    } else if (viewMode === 'week') {
      const { start, end } = getWeekRange(currentDate);
      return scheduleData.filter(classItem => isInRange(classItem.date, start, end));
    } else {
      const { start, end } = getMonthRange(currentDate);
      return scheduleData.filter(classItem => isInRange(classItem.date, start, end));
    }
  }, [viewMode, currentDate, scheduleData]);

  // --- UI Text Helper ---
  const getSubtitle = () => {
    if (viewMode === 'day') {
      return formatDate(currentDate);
    } else if (viewMode === 'week') {
      const { start, end } = getWeekRange(currentDate);
      return `${start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  return (
    <div>
      {/* Boxed Header - Responsive Refactor */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col gap-4">
          
          {/* Row 1: Identity & Stats */}
          <div className="flex items-center justify-between">
            {/* Left: Identity */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Icon icon="mdi:calendar-clock" className="w-5 h-5 md:w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-800">My Schedule</h1>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-1">{getSubtitle()}</p>
              </div>
            </div>

            {/* Right: Stats (Hidden di mobile agar bersih, muncul di sm ke atas) */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Icon icon="mdi:book-multiple" className="w-4 h-4 text-blue-600" />
              <span className="text-xs md:text-sm font-medium text-blue-700">
                {filteredClasses.length} Classes
              </span>
            </div>
          </div>

          {/* Row 2: Controls Area (Border Top) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-2">
            
            {/* Date Navigation (Full Width di Mobile) */}
            <div className="flex items-center justify-between w-full sm:w-auto bg-gray-50 rounded-lg p-1">
              <IconButton 
                size="small" 
                onClick={handlePrev}
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { backgroundColor: '#e5e7eb' }
                }}
              >
                <Icon icon="mdi:chevron-left" className="w-6 h-6" />
              </IconButton>
              
              <button
                onClick={handleToday}
                className="flex-1 text-center px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                Today
              </button>
              
              <IconButton 
                size="small" 
                onClick={handleNext}
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { backgroundColor: '#e5e7eb' }
                }}
              >
                <Icon icon="mdi:chevron-right" className="w-6 h-6" />
              </IconButton>
            </div>

            {/* View Toggle (Scrollable di layar sangat kecil) */}
            <div className="w-full sm:w-auto overflow-x-auto">
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
                fullWidth={true} // Agar memenuhi lebar container di mobile
                sx={{
                  '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    px: 2,
                    py: 0.75,
                    border: '1px solid #e5e7eb',
                    whiteSpace: 'nowrap', // Mencegah teks turun baris
                    '&.Mui-selected': {
                      backgroundColor: '#2563eb',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1d4ed8',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="day">
                  <Icon icon="mdi:calendar-today" className="w-4 h-4 mr-1" />
                  Day
                </ToggleButton>
                <ToggleButton value="week">
                  <Icon icon="mdi:calendar-week" className="w-4 h-4 mr-1" />
                  Week
                </ToggleButton>
                <ToggleButton value="month">
                  <Icon icon="mdi:calendar-month" className="w-4 h-4 mr-1" />
                  Month
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

          </div>
        </div>
      </div>

      {/* Schedule Cards Grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <Card
              key={classItem.id}
              sx={{ 
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Class Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {classItem.className}
                </h3>

                {/* Class Details */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Icon icon="mdi:calendar" className="w-4 h-4 text-blue-500" />
                    <span>{classItem.day}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Icon icon="mdi:clock-outline" className="w-4 h-4 text-green-500" />
                    <span>{classItem.startTime} - {classItem.endTime}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Icon icon="mdi:map-marker" className="w-4 h-4 text-orange-500" />
                    <span>{classItem.room}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Icon icon="mdi:account-group" className="w-4 h-4 text-purple-500" />
                    <span>{classItem.students} Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Icon icon="mdi:calendar-remove" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Classes Scheduled</h3>
          <p className="text-gray-500">
            {viewMode === 'day' && 'No classes scheduled for this day.'}
            {viewMode === 'week' && 'No classes scheduled for this week.'}
            {viewMode === 'month' && 'No classes scheduled for this month.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleModule;