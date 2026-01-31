import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import ModuleHeader from '../../../../../../components/ModuleHeader';
import CardClass from '../../../../../../components/CardClass';

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

  return (
    <div className="space-y-6">
      {/* Box 1: Page Header */}
      <ModuleHeader
        icon="mdi:book-open-page-variant"
        iconColor="blue"
        title="My Classes"
        description="Manage your assigned classes for this semester"
      >
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Icon icon="mdi:book-multiple" className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {classes.length} Total Classes
          </span>
        </div>
      </ModuleHeader>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <CardClass
            key={classItem.id}
            classItem={classItem}
            onClick={onClassClick}
          />
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
