import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, TablePagination } from "@mui/material";

const ClassDetailView = ({ classData, onBack, onAttendanceHistoryClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dummy teacher name and total students
  const teacherName = classData.teacher || "Maria Garcia";
  const totalStudents = classData.totalStudents || 24;

  // Sample students data with Student ID
  const students = [
    {
      id: 1,
      studentId: "STU001",
      name: "Sarah Johnson",
      photo: "https://i.pravatar.cc/40?img=1",
      attendanceRate: 95,
      status: "present", // present, absent, late
      lastAttended: "2024-01-15",
    },
    {
      id: 2,
      studentId: "STU002",
      name: "Michael Brown",
      photo: "https://i.pravatar.cc/40?img=2",
      attendanceRate: 87,
      status: "absent",
      lastAttended: "2024-01-13",
    },
    {
      id: 3,
      studentId: "STU003",
      name: "Lisa Wong",
      photo: "https://i.pravatar.cc/40?img=3",
      attendanceRate: 98,
      status: "present",
      lastAttended: "2024-01-15",
    },
    {
      id: 4,
      studentId: "STU004",
      name: "David Miller",
      photo: "https://i.pravatar.cc/40?img=4",
      attendanceRate: 92,
      status: "late",
      lastAttended: "2024-01-15",
    },
  ];

  // Sample attendance history with detailed student data
  const attendanceHistory = [
    {
      date: "2024-01-15",
      present: 11,
      absent: 1,
      late: 0,
      total: 12,
      studentsDetail: [
        {
          id: 1,
          name: "Sarah Johnson",
          photo: "https://i.pravatar.cc/40?img=1",
          status: "present",
          time: "10:00",
        },
        {
          id: 3,
          name: "Lisa Wong",
          photo: "https://i.pravatar.cc/40?img=3",
          status: "present",
          time: "09:58",
        },
        {
          id: 4,
          name: "David Miller",
          photo: "https://i.pravatar.cc/40?img=4",
          status: "present",
          time: "10:02",
        },
        {
          id: 2,
          name: "Michael Brown",
          photo: "https://i.pravatar.cc/40?img=2",
          status: "absent",
          time: null,
        },
      ],
    },
    {
      date: "2024-01-13",
      present: 10,
      absent: 2,
      late: 0,
      total: 12,
      studentsDetail: [
        {
          id: 1,
          name: "Sarah Johnson",
          photo: "https://i.pravatar.cc/40?img=1",
          status: "present",
          time: "10:01",
        },
        {
          id: 3,
          name: "Lisa Wong",
          photo: "https://i.pravatar.cc/40?img=3",
          status: "present",
          time: "09:59",
        },
        {
          id: 2,
          name: "Michael Brown",
          photo: "https://i.pravatar.cc/40?img=2",
          status: "absent",
          time: null,
        },
        {
          id: 4,
          name: "David Miller",
          photo: "https://i.pravatar.cc/40?img=4",
          status: "absent",
          time: null,
        },
      ],
    },
    {
      date: "2024-01-11",
      present: 12,
      absent: 0,
      late: 0,
      total: 12,
      studentsDetail: [
        {
          id: 1,
          name: "Sarah Johnson",
          photo: "https://i.pravatar.cc/40?img=1",
          status: "present",
          time: "10:00",
        },
        {
          id: 2,
          name: "Michael Brown",
          photo: "https://i.pravatar.cc/40?img=2",
          status: "present",
          time: "09:57",
        },
        {
          id: 3,
          name: "Lisa Wong",
          photo: "https://i.pravatar.cc/40?img=3",
          status: "present",
          time: "10:01",
        },
        {
          id: 4,
          name: "David Miller",
          photo: "https://i.pravatar.cc/40?img=4",
          status: "present",
          time: "09:58",
        },
      ],
    },
    {
      date: "2024-01-08",
      present: 9,
      absent: 2,
      late: 1,
      total: 12,
      studentsDetail: [
        {
          id: 1,
          name: "Sarah Johnson",
          photo: "https://i.pravatar.cc/40?img=1",
          status: "present",
          time: "10:00",
        },
        {
          id: 2,
          name: "Michael Brown",
          photo: "https://i.pravatar.cc/40?img=2",
          status: "absent",
          time: null,
        },
        {
          id: 3,
          name: "Lisa Wong",
          photo: "https://i.pravatar.cc/40?img=3",
          status: "late",
          time: "10:15",
        },
        {
          id: 4,
          name: "David Miller",
          photo: "https://i.pravatar.cc/40?img=4",
          status: "absent",
          time: null,
        },
      ],
    },
    {
      date: "2024-01-06",
      present: 11,
      absent: 1,
      late: 0,
      total: 12,
      studentsDetail: [
        {
          id: 1,
          name: "Sarah Johnson",
          photo: "https://i.pravatar.cc/40?img=1",
          status: "present",
          time: "09:59",
        },
        {
          id: 2,
          name: "Michael Brown",
          photo: "https://i.pravatar.cc/40?img=2",
          status: "present",
          time: "10:02",
        },
        {
          id: 3,
          name: "Lisa Wong",
          photo: "https://i.pravatar.cc/40?img=3",
          status: "present",
          time: "10:00",
        },
        {
          id: 4,
          name: "David Miller",
          photo: "https://i.pravatar.cc/40?img=4",
          status: "absent",
          time: null,
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-600 border-green-200";
      case "absent":
        return "bg-red-100 text-red-600 border-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
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

  return (
    <div>
      {/* Responsive Styled Header - Mobile First */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-row items-center md:justify-between gap-3 w-full">

          <div className="flex items-center gap-3 order-2 md:order-1 flex-1">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Icon icon="mdi:book-open-variant" className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-lg font-bold text-gray-800 leading-tight truncate">
                {classData.name}
              </h1>
              <p className="text-xs text-gray-600 truncate">
                Teacher: {teacherName}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="order-1 md:order-2 flex items-center justify-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer shrink-0"
          >
            <Icon icon="mdi:arrow-left" className="w-6 h-6 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden md:inline font-normal">Back to Classes</span>
          </button>
        </div>
      </div>

      {/* Top Row: Class Details & Attendance History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Class Details (Top Left) */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Icon
              icon="mdi:information-outline"
              className="w-5 h-5 mr-2 text-blue-600"
            />
            Class Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Schedule</p>
                <p className="font-medium text-gray-800">
                  {classData.schedule || "Monday & Wednesday"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon
                icon="mdi:clock-outline"
                className="w-5 h-5 text-orange-500"
              />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium text-gray-800">{classData.time || "10:00 - 11:30"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon icon="mdi:map-marker" className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium text-gray-800">{classData.room || "A201"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="font-medium text-gray-800">{totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance History (Top Right) */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Icon
              icon="mdi:clipboard-text-clock"
              className="w-5 h-5 mr-2 text-green-500"
            />
            Attendance History
            <span className="text-xs text-gray-500 ml-2 font-normal">
              (Click to view details)
            </span>
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {attendanceHistory.map((record, index) => (
              <div
                key={index}
                onClick={() => onAttendanceHistoryClick(record)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(record.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {record.total} students
                  </p>
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
                  <Icon
                    icon="mdi:chevron-right"
                    className="w-4 h-4 text-gray-400 ml-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Students List */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Icon
              icon="mdi:account-group"
              className="w-5 h-5 mr-2 text-blue-500"
            />
            Students in This Class ({students.length})
          </h2>

          <div className="flex items-center space-x-4">
            <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors sm:px-4 sm:py-2 sm:text-sm text-xs">
              Open QR Scanner
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto flex-1 w-full" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full" style={{ minWidth: '700px' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Attended
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {student.attendanceRate}%
                          </div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${student.attendanceRate >= 90
                                ? "bg-green-500"
                                : student.attendanceRate >= 80
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                                }`}
                              style={{ width: `${student.attendanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(student.lastAttended).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            student.status
                          )}`}
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - Fixed, tidak ikut scroll */}
          <div className="border-t border-gray-200 bg-white relative z-10">
            <TablePagination
              component="div"
              count={students.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
              labelRowsPerPage={<span>Rows per page:</span>}
              sx={{
                ".MuiTablePagination-toolbar": {
                  paddingLeft: 2,
                  paddingRight: 2,
                  minHeight: "52px",
                  "@media (max-width: 640px)": {
                    paddingLeft: 1,
                    paddingRight: 1,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }
                },
                ".MuiTablePagination-spacer": {
                  "@media (max-width: 640px)": {
                    display: "none",
                  }
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                  fontSize: "0.875rem",
                  "@media (max-width: 640px)": {
                    marginTop: 1,
                    marginBottom: 1
                  }
                },

                ".MuiInputBase-root": {
                  marginRight: 2,
                  marginLeft: 1
                },
                ".MuiTablePagination-actions": {
                  marginLeft: 0,
                  "@media (max-width: 640px)": {
                    marginTop: 1
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailView;
