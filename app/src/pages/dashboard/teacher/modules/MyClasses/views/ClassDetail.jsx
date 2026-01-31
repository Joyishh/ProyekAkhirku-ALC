import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, TablePagination } from "@mui/material";
import ModuleHeader from "../../../../../../components/ModuleHeader";
import DataTable from "../../../../../../components/DataTable";
import ClassDetailsCard from "../../../../../../components/ClassDetailsCard";
import AttendanceHistoryCard from "../../../../../../components/AttendanceHistoryCard";

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
    <div className="space-y-6">
      {/* Responsive Styled Header - Mobile First */}
      <ModuleHeader
        icon="mdi:book-open-variant"
        iconColor="blue"
        title={classData.name}
        description={`Teacher: ${teacherName}`}
      >
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
          Back to Classes
        </button>
      </ModuleHeader>

      {/* Top Row: Class Details & Attendance History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Class Details (Top Left) */}
        <ClassDetailsCard 
          classData={{
            schedule: classData.schedule || "Monday & Wednesday",
            time: classData.time || "10:00 - 11:30",
            room: classData.room || "A201",
            totalStudents: totalStudents,
            attendanceRate: classData.attendanceRate
          }}
        />

        {/* Attendance History (Top Right) */}
        <AttendanceHistoryCard 
          attendanceHistory={attendanceHistory}
          onAttendanceHistoryClick={onAttendanceHistoryClick}
        />
      </div>

      {/* Bottom: Students List */}
      <DataTable
        title={"Students in This Class"}
        headerActionComponent={
          <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors sm:px-4 sm:py-2 sm:text-sm text-xs">
            Open QR Scanner
          </button>
        }
        columns={[
          {
            header: 'Student',
            align: 'left',
            render: (student) => (
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
            )
          },
          {
            header: 'Student ID',
            align: 'left',
            render: (student) => (
              <span className="text-sm text-gray-900">{student.studentId}</span>
            )
          },
          {
            header: 'Attendance Rate',
            align: 'left',
            render: (student) => (
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900">
                  {student.attendanceRate}%
                </div>
                <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      student.attendanceRate >= 90
                        ? "bg-green-500"
                        : student.attendanceRate >= 80
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${student.attendanceRate}%` }}
                  ></div>
                </div>
              </div>
            )
          },
          {
            header: 'Last Attended',
            align: 'left',
            render: (student) => (
              <span className="text-sm text-gray-900">
                {new Date(student.lastAttended).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )
          },
          {
            header: 'Status',
            align: 'left',
            render: (student) => (
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  student.status
                )}`}
              >
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </span>
            )
          }
        ]}
        data={students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        pagination={{
          count: students.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage
        }}
      />
    </div>
  );
};

export default ClassDetailView;
