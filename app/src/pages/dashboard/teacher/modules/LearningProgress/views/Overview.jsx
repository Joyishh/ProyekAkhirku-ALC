import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, LinearProgress } from "@mui/material";

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

  const getScoreColor = (score) => {
    if (score >= 85) return "bg-green-100 text-green-700";
    if (score >= 70) return "bg-blue-100 text-blue-700";
    if (score >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getProgressColor = (rate) => {
    if (rate >= 80) return "success";
    if (rate >= 50) return "primary";
    return "warning";
  };

  return (
    <div>
      {/* Admin Style Boxed Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <Icon
                icon="mdi:clipboard-text-clock"
                className="w-7 h-7 text-white"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Classes Progress
              </h1>
              <p className="text-sm text-gray-600">
                Manage and track student grades for your classes
              </p>
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

      {/* Classes Grid with MUI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${classItem.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon
                      icon="mdi:book-open-page-variant"
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {classItem.name}
                    </h3>
                    <p className="text-sm text-gray-500">{classItem.subject}</p>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Grading Progress
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {classItem.gradedStudents}/{classItem.totalStudents}{" "}
                    Students
                  </span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={classItem.completionRate}
                  color={getProgressColor(classItem.completionRate)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#e5e7eb",
                  }}
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {classItem.completionRate}% Complete
                  </span>
                </div>
              </div>

              {/* Average Score Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Average Score</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                    classItem.averageScore
                  )}`}
                >
                  {classItem.averageScore.toFixed(1)}
                </span>
              </div>

              {/* Class Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:calendar" className="w-4 h-4 text-blue-500" />
                  <span>
                    {classItem.schedule} • {classItem.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon
                    icon="mdi:map-marker"
                    className="w-4 h-4 text-orange-500"
                  />
                  <span>{classItem.room}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onClassClick(classItem)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all cursor-pointer"
              >
                <Icon icon="mdi:pencil-box-multiple" className="w-5 h-5 mr-2" />
                Manage Grades
              </button>
            </CardContent>
          </Card>
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
