import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TablePagination } from '@mui/material';
import ModuleHeader from '../../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../../components/DataTable';

const ClassDetail = ({ classData, onBack, onAttendanceHistoryClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get students from classData
  const students = classData?.students || [];
  const attendanceHistory = classData?.attendanceHistory || [];

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-600 border-green-200';
      case 'absent': return 'bg-red-100 text-red-600 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'excused': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!classData) {
    return (
      <div className="text-center py-12">
        <Icon icon="mdi:school-outline" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Class Data</h3>
        <p className="text-gray-500">Class information not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Boxed Header with Back Button */}
      <ModuleHeader
        icon="mdi:school"
        iconColor="purple"
        title={classData.name}
        description={`Teacher: ${classData.teacher}`}
      >
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
          Back to Overview
        </button>
      </ModuleHeader>

      {/* Top Row: Class Details & Attendance History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Details (Top Left) */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Icon icon="mdi:information-outline" className="w-5 h-5 mr-2 text-purple-500" />
            Class Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Schedule</p>
                <p className="font-medium text-gray-800">{classData.schedule}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:clock-outline" className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium text-gray-800">{classData.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon icon="mdi:map-marker" className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium text-gray-800">{classData.room}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="font-medium text-gray-800">{classData.totalStudents} students</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon icon="mdi:chart-line" className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Average Attendance Rate</p>
                <p className={`font-bold ${
                  classData.attendanceRate >= 90 ? 'text-green-600' :
                  classData.attendanceRate >= 80 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {classData.attendanceRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History (Top Right) */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Icon icon="mdi:clipboard-text-clock" className="w-5 h-5 mr-2 text-green-500" />
            Attendance History
            <span className="text-xs text-gray-500 ml-2 font-normal">(Click to view details)</span>
          </h2>
          
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {attendanceHistory.length === 0 ? (
              <div className="text-center py-8">
                <Icon icon="mdi:calendar-blank" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No attendance history</p>
              </div>
            ) : (
              attendanceHistory.map((record, index) => (
                <div 
                  key={index} 
                  onClick={() => onAttendanceHistoryClick(record)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-600">{record.total} students</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-green-600">
                      <Icon icon="mdi:check-circle" className="w-4 h-4 mr-1" />
                      {record.present}
                    </span>
                    {record.late > 0 && (
                      <span className="flex items-center text-yellow-600">
                        <Icon icon="mdi:clock-alert" className="w-4 h-4 mr-1" />
                        {record.late}
                      </span>
                    )}
                    {record.absent > 0 && (
                      <span className="flex items-center text-red-600">
                        <Icon icon="mdi:close-circle" className="w-4 h-4 mr-1" />
                        {record.absent}
                      </span>
                    )}
                    {record.excused > 0 && (
                      <span className="flex items-center text-blue-600">
                        <Icon icon="mdi:hospital-box" className="w-4 h-4 mr-1" />
                        {record.excused}
                      </span>
                    )}
                    <Icon icon="mdi:chevron-right" className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Students List */}
      <DataTable
        title="Students in This Class"
        columns={[
          {
            header: "Student",
            align: "left",
            render: (student) => (
              <div className="flex items-center space-x-3">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-sm font-medium text-gray-900">{student.name}</div>
              </div>
            ),
          },
          {
            header: "Student ID",
            align: "left",
            render: (student) => <span className="text-sm text-gray-600">{student.studentId}</span>,
          },
          {
            header: "Attendance Rate",
            align: "left",
            render: (student) => (
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900">{student.attendanceRate}%</div>
                <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      student.attendanceRate >= 90 ? 'bg-green-500' :
                      student.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${student.attendanceRate}%` }}
                  ></div>
                </div>
              </div>
            ),
          },
          {
            header: "Last Attended",
            align: "left",
            render: (student) => (
              <span className="text-sm text-gray-900">
                {new Date(student.lastAttended).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            ),
          },
          {
            header: "Status",
            align: "left",
            render: (student) => (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </span>
            ),
          },
        ]}
        data={students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        pagination={{
          count: students.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage,
        }}
      />
    </div>
  );
};

export default ClassDetail;
