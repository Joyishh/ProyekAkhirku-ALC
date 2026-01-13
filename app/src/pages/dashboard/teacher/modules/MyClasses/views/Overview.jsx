import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardContent, LinearProgress, TextField, InputAdornment } from '@mui/material';

const ClassesMainView = ({ onClassClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data untuk class cards
  const classes = useMemo(() => [
    {
      id: 1,
      name: "Advanced English",
      level: "Advanced",
      schedule: "Mon, Wed",
      time: "10:00 - 12:00",
      room: "Room 101",
      students: 12,
      attendanceRate: 95,
      nextClass: "Today, 10:00 AM",
    },
    {
      id: 2,
      name: "Beginner Spanish",
      level: "Beginner",
      schedule: "Tue, Thu",
      time: "14:00 - 15:30",
      room: "Room 203",
      students: 8,
      attendanceRate: 87,
      nextClass: "Tomorrow, 2:00 PM",
    },
    {
      id: 3,
      name: "Intermediate French",
      level: "Intermediate",
      schedule: "Fri",
      time: "16:00 - 18:00",
      room: "Room 105",
      students: 15,
      attendanceRate: 92,
      nextClass: "Friday, 4:00 PM",
    },
    {
      id: 4,
      name: "Basic Mathematics",
      level: "Basic",
      schedule: "Mon, Wed, Fri",
      time: "15:00 - 16:30",
      room: "Room 102",
      students: 10,
      attendanceRate: 88,
      nextClass: "Today, 3:00 PM",
    },
    {
      id: 5,
      name: "Advanced Science",
      level: "Advanced",
      schedule: "Wed, Fri",
      time: "13:00 - 14:30",
      room: "Lab 201",
      students: 18,
      attendanceRate: 94,
      nextClass: "Wednesday, 1:00 PM",
    }
  ], []);

  // Filter logic based on search term
  const filteredClasses = useMemo(() => {
    if (!searchTerm.trim()) {
      return classes;
    }
    return classes.filter(classItem =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classes, searchTerm]);

  const getAttendanceColor = (rate) => {
    if (rate >= 90) return '#10b981'; // Green
    if (rate >= 75) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="space-y-6">
      {/* Box 1: Page Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <Icon icon="mdi:book-open-page-variant" className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
              <p className="text-sm text-gray-600">Manage your assigned classes for this semester</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2 px-4 py-2 bg-blue-50 rounded-lg w-full md:w-auto mt-2 md:mt-0">
            <Icon icon="mdi:book-multiple" className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              {classes.length} Total Classes
            </span>
          </div>
        </div>
      </div>

      {/* Box 2: Search Control */}

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card
            key={classItem.id}
            onClick={() => onClassClick(classItem)}
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
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <Icon icon="mdi:check-circle" className="w-3 h-3 inline mr-1" />
                  Active
                </span>
                <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
              </div>

              {/* Class Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{classItem.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{classItem.level} Level</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:calendar" className="w-4 h-4 text-blue-500" />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:clock-outline" className="w-4 h-4 text-green-500" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:map-marker" className="w-4 h-4 text-orange-500" />
                    <span>{classItem.room}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Attendance Progress */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon icon="mdi:account-group" className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{classItem.students} Students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600 font-semibold">{classItem.attendanceRate}%</span>
                  </div>
                </div>

                {/* Attendance Rate Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Attendance Rate</span>
                    <span className="font-medium">{classItem.attendanceRate}%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={classItem.attendanceRate}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getAttendanceColor(classItem.attendanceRate),
                        borderRadius: 3,
                      },
                    }}
                  />
                </div>

                <div className="text-xs text-gray-500 pt-2">
                  <Icon icon="mdi:calendar-clock" className="w-3 h-3 inline mr-1" />
                  Next: {classItem.nextClass}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Icon icon="mdi:magnify" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Classes Found</h3>
          <p className="text-gray-500">No classes found matching your search "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default ClassesMainView;
