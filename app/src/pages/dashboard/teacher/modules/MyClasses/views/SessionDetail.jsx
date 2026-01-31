import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TextField, MenuItem, TablePagination } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ModuleHeader from "../../../../../../components/ModuleHeader";
import DataTable from "../../../../../../components/DataTable";

const AttendanceDetailView = ({ attendanceData, onBack }) => {
  const [students, setStudents] = useState(
    attendanceData?.studentsDetail || [],
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleStatusUpdate = async (studentId, newStatus) => {
    // Step 1: Check if status is already the same (No Change Logic)
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    if (student.status === newStatus) {
      toast.info(
        `Student is already marked as ${
          newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
        }`,
      );
      return;
    }

    // Step 2: Confirmation with SweetAlert2
    const statusColors = {
      present: "#10B981",
      late: "#F59E0B",
      absent: "#EF4444",
    };

    const result = await Swal.fire({
      title: "Update Attendance?",
      text: `Change status for ${student.name} to ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      confirmButtonColor: statusColors[newStatus] || "#3B82F6",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#6B7280",
    });

    // Step 3: Execute & Feedback
    if (result.isConfirmed) {
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === studentId ? { ...s, status: newStatus } : s,
        ),
      );

      toast.success("Attendance updated successfully!");
    }
  };

  if (!attendanceData) {
    return (
      <div className="text-center py-12">
        <Icon
          icon="mdi:calendar-remove"
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
        />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No Data Available
        </h3>
        <p className="text-gray-500">
          Attendance data not found for this date.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:calendar-check"
        iconColor="blue"
        title="Session Attendance Details"
        description={
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:calendar" className="w-4 h-4" />
              <span>
                {new Date(attendanceData.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:account-group" className="w-4 h-4" />
              <span>{students.length} Students</span>
            </div>
          </div>
        }
      >
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
          Back to Classes
        </button>
      </ModuleHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon
                icon="mdi:check-circle"
                className="w-6 h-6 text-green-600"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">
                {students.filter((s) => s.status === "present").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Icon
                icon="mdi:clock-alert"
                className="w-6 h-6 text-yellow-600"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-2xl font-bold text-yellow-600">
                {students.filter((s) => s.status === "late").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Icon icon="mdi:close-circle" className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">
                {students.filter((s) => s.status === "absent").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon icon="mdi:hospital-box" className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Excused</p>
              <p className="text-2xl font-bold text-blue-600">
                {students.filter((s) => s.status === "excused").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon
                icon="mdi:account-group"
                className="w-6 h-6 text-purple-600"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-purple-600">
                {students.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <DataTable
        title="Student Attendance List"
        columns={[
          {
            header: "Student",
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
                  <div className="text-sm text-gray-500">
                    ID: {student.id.toString().padStart(3, "0")}
                  </div>
                </div>
              </div>
            ),
          },
          {
            header: "Time Recorded",
            render: (student) => (
              <div className="flex items-center text-sm text-gray-900">
                <Icon
                  icon="mdi:clock-outline"
                  className="w-4 h-4 mr-2 text-gray-400"
                />
                {student.time || (
                  <span className="text-gray-400 italic">Not recorded</span>
                )}
              </div>
            ),
          },
          {
            header: "Status",
            render: (student) => (
              <TextField
                select
                value={student.status}
                onChange={(e) =>
                  handleStatusUpdate(student.id, e.target.value)
                }
                size="small"
                variant="outlined"
                sx={{
                  minWidth: "140px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor:
                      student.status === "present"
                        ? "#dcfce7"
                        : student.status === "late"
                          ? "#fef3c7"
                          : student.status === "absent"
                            ? "#fee2e2"
                            : "#f3f4f6",
                    "& fieldset": {
                      borderColor:
                        student.status === "present"
                          ? "#10b981"
                          : student.status === "late"
                            ? "#f59e0b"
                            : student.status === "absent"
                              ? "#ef4444"
                              : "#d1d5db",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        student.status === "present"
                          ? "#059669"
                          : student.status === "late"
                            ? "#d97706"
                            : student.status === "absent"
                              ? "#dc2626"
                              : "#9ca3af",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor:
                        student.status === "present"
                          ? "#059669"
                          : student.status === "late"
                            ? "#d97706"
                            : student.status === "absent"
                              ? "#dc2626"
                              : "#6b7280",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiSelect-select": {
                    color:
                      student.status === "present"
                        ? "#166534"
                        : student.status === "late"
                          ? "#92400e"
                          : student.status === "absent"
                            ? "#991b1b"
                            : "#374151",
                    paddingY: "6px",
                  },
                }}
              >
                <MenuItem
                  value="present"
                  sx={{ color: "#16a34a", fontWeight: 500 }}
                >
                  <Icon
                    icon="mdi:check-circle"
                    className="w-4 h-4 mr-2 inline"
                  />
                  Present
                </MenuItem>
                <MenuItem
                  value="late"
                  sx={{ color: "#f59e0b", fontWeight: 500 }}
                >
                  <Icon
                    icon="mdi:clock-alert"
                    className="w-4 h-4 mr-2 inline"
                  />
                  Late
                </MenuItem>
                <MenuItem
                  value="absent"
                  sx={{ color: "#ef4444", fontWeight: 500 }}
                >
                  <Icon
                    icon="mdi:close-circle"
                    className="w-4 h-4 mr-2 inline"
                  />
                  Absent
                </MenuItem>
              </TextField>
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

      {/* Empty State */}
      {students.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Icon
            icon="mdi:account-group"
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No Students Found
          </h3>
          <p className="text-gray-500">
            No attendance records found for this date.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetailView;
