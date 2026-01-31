import React from "react";
import { Icon } from "@iconify/react";
import ModuleHeader from "../../../../../../components/ModuleHeader";
import CardClass from "../../../../../../components/CardClass";

const ClassesView = ({ onClassClick }) => {
  // Sample data untuk kelas yang diampu guru dengan progress info
  const classes = [
    {
      id: 1,
      name: "Advanced English",
      subject: "English Language",
      level: "Advanced",
      schedule: "Mon, Wed",
      time: "10:00 - 12:00",
      room: "Room 101",
      totalStudents: 12,
      completionRate: 85,
      averageScore: 82.5,
      gradedStudents: 10,
      lastUpdated: "2 days ago",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Beginner Spanish",
      subject: "Spanish Language",
      level: "Beginner",
      schedule: "Tue, Thu",
      time: "14:00 - 15:30",
      room: "Room 203",
      totalStudents: 8,
      completionRate: 62,
      averageScore: 75.3,
      gradedStudents: 5,
      lastUpdated: "1 week ago",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Intermediate French",
      subject: "French Language",
      level: "Intermediate",
      schedule: "Fri",
      time: "16:00 - 18:00",
      room: "Room 105",
      totalStudents: 15,
      completionRate: 93,
      averageScore: 88.7,
      gradedStudents: 14,
      lastUpdated: "3 days ago",
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Basic Mathematics",
      subject: "Mathematics",
      level: "Basic",
      schedule: "Mon, Wed, Fri",
      time: "09:00 - 10:30",
      room: "Room 102",
      totalStudents: 20,
      completionRate: 45,
      averageScore: 68.2,
      gradedStudents: 9,
      lastUpdated: "5 days ago",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Style Boxed Header */}
      <ModuleHeader
        icon="mdi:clipboard-text-clock"
        iconColor="blue"
        title="My Classes Progress"
        description="Manage and track student grades for your classes"
      >
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Icon icon="mdi:book-multiple" className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {classes.length} Total Classes
          </span>
        </div>
      </ModuleHeader>

      {/* Classes Grid with MUI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <CardClass
            key={classItem.id}
            classItem={classItem}
            onClick={onClassClick}
            variant="grading"
          />
        ))}
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Icon
            icon="mdi:clipboard-text-outline"
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No Classes Assigned
          </h3>
          <p className="text-gray-500">
            You haven't been assigned to any classes yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassesView;
