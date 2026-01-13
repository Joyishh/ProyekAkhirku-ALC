import React from 'react';
import { Icon } from '@iconify/react';

const TeacherDashboardModule = ({ onNavigate }) => {
  // Sample data untuk teacher dashboard
  const stats = [
    {
      title: "My Classes",
      value: "6",
      change: "3 classes today",
      changeType: "info",
      icon: "mdi:book-open-page-variant",
      color: "blue"
    },
    {
      title: "Total Students",
      value: "87",
      change: "+5 new this month",
      changeType: "positive",
      icon: "mdi:account-group",
      color: "orange"
    },
    {
      title: "Attendance Rate",
      value: "92%",
      change: "+3% from last week",
      changeType: "positive",
      icon: "mdi:clipboard-check",
      color: "emerald"
    },
  ];

  const quickActions = [
    {
      title: "Write Learning Progress",
      icon: "mdi:clipboard-check-outline",
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => onNavigate ? onNavigate('learning-progress') : console.log("Navigate to Learning Progress")
    },
    {
      title: "Mark Attendance",
      icon: "mdi:account-check-outline",
      color: "bg-emerald-500 hover:bg-emerald-600",
      action: () => onNavigate ? onNavigate('my-classes') : console.log("Navigate to My Classes")
    },
  ];

  const recentActivities = [
    {
      icon: "mdi:clipboard-check",
      text: "Attendance marked for Advanced English class",
      time: "15 minutes ago",
      color: "text-blue-500"
    },
    {
      icon: "mdi:account-plus",
      text: "New student joined Intermediate French class",
      time: "1 hour ago",
      color: "text-green-500"
    },
    {
      icon: "mdi:clipboard-text",
      text: "Assignment submitted by Sarah Johnson",
      time: "2 hours ago",
      color: "text-purple-500"
    },
    {
      icon: "mdi:message-text",
      text: "Message sent to Beginner Spanish class",
      time: "3 hours ago",
      color: "text-orange-500"
    }
  ];

  const todayClasses = [
    {
      name: "Advanced English",
      room: "Room 101",
      level: "Advanced",
      students: 12,
      startTime: "10:00",
      endTime: "12:00",
      status: "ongoing"
    },
    {
      name: "Beginner Spanish",
      room: "Room 203",
      level: "Beginner",
      students: 8,
      startTime: "14:30",
      endTime: "16:00",
      status: "upcoming"
    },
    {
      name: "Intermediate French",
      room: "Room 105",
      level: "Intermediate",
      students: 15,
      startTime: "16:00",
      endTime: "18:00",
      status: "upcoming"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          label: 'Ongoing',
          dot: 'bg-green-500'
        };
      case 'upcoming':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          label: 'Upcoming',
          dot: 'bg-blue-500'
        };
      case 'finished':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          label: 'Finished',
          dot: 'bg-gray-400'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          label: 'Unknown',
          dot: 'bg-gray-400'
        };
    }
  };

  const performanceMetrics = [
    { label: "Classes This Month", value: "24", color: "text-gray-800" },
    { label: "Average Attendance", value: "92%", color: "text-emerald-500" },
    { label: "Learning Progress Reports", value: "50", color: "text-blue-500" },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'emerald' ? 'bg-emerald-100' :
                        stat.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                  <Icon
                    icon={stat.icon}
                    className={`w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                          stat.color === 'emerald' ? 'text-emerald-600' :
                            stat.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                      }`}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.changeType === 'positive' ? 'text-emerald-600' :
                stat.changeType === 'warning' ? 'text-orange-500' :
                  'text-gray-500'
              }`}>
              {stat.changeType === 'positive' && '↑ '}
              {stat.changeType === 'warning' && '⚠ '}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3 cursor-pointer`}
                >
                  <Icon icon={action.icon} className="w-5 h-5" />
                  <span className="font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Today's Classes - Agenda View */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Classes</h2>
              <span className="text-sm text-gray-500">{todayClasses.length} classes</span>
            </div>
            <div className="space-y-3">
              {todayClasses.map((classItem, index) => {
                const statusStyle = getStatusBadge(classItem.status);
                const isOngoing = classItem.status === 'ongoing';

                return (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center p-4 rounded-xl transition-all gap-4 sm:gap-0 ${isOngoing
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    {/* Top/Left: Time & Info Wrapper */}
                    <div className="flex items-center flex-1 w-full">
                      {/* Time with Accent */}
                      <div className="flex items-center space-x-3 min-w-[90px] sm:min-w-[100px] shrink-0">
                        <div className={`w-1 h-12 rounded-full ${statusStyle.dot}`}></div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{classItem.startTime}</p>
                          <p className="text-xs text-gray-500">{classItem.endTime}</p>
                        </div>
                      </div>

                      {/* Class Info */}
                      <div className="flex-1 px-3 sm:px-4 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{classItem.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {classItem.room} • {classItem.level}
                        </p>
                        {/* Pindahkan info 'students' ke bawah di mobile agar tidak sempit */}
                        <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                          {classItem.students} students
                        </p>
                      </div>
                    </div>

                    {/* Bottom/Right: Status & Action */}
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-200/50 sm:border-transparent">

                      {/* Status Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>

                      {/* Students Count (Desktop Only) */}
                      <span className="hidden sm:inline text-sm text-gray-500 mr-2">
                        {classItem.students} std
                      </span>

                      {/* Action Button */}
                      {isOngoing ? (
                        <button
                          onClick={() => onNavigate ? onNavigate('my-classes') : null}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ml-3"
                        >
                          <Icon icon="mdi:account-check" className="w-4 h-4" />
                          <span>Attendance</span>
                        </button>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer ml-1">
                          <Icon icon="mdi:chevron-right" className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full bg-gray-100`}>
                    <Icon icon={activity.icon} className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className={`font-semibold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboardModule;
