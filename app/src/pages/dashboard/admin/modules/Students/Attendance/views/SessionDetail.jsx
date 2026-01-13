import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { TextField, MenuItem, TablePagination } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SessionDetail = ({ attendanceData, onBack }) => {
  const [students, setStudents] = useState(
    attendanceData?.studentsDetail || []
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
      case "excused":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "present":
        return "Hadir";
      case "late":
        return "Terlambat";
      case "absent":
        return "Alpha";
      case "excused":
        return "Sakit/Izin";
      default:
        return status;
    }
  };

  const handleStatusChange = async (studentId, newStatus, currentStatus) => {
    // Check if status is the same
    if (newStatus === currentStatus) {
      toast.info(`Student is already marked as ${getStatusLabel(newStatus)}`);
      return;
    }

    // Confirmation dialog
    const result = await Swal.fire({
      title: "Update Attendance?",
      text: `Are you sure you want to change attendance status to ${getStatusLabel(
        newStatus
      )}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    // Update the student status
    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.id === studentId ? { ...s, status: newStatus } : s
      )
    );

    toast.success("Attendance status updated successfully");
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      {/* Header with Back Button */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
              <Icon icon="mdi:calendar-check" className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Session Attendance Details
              </h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Icon icon="mdi:calendar" className="w-4 h-4" />
                  <span>
                    {new Date(attendanceData.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon icon="mdi:account-group" className="w-4 h-4" />
                  <span>{students.length} Students</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
            Back to Class Detail
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Attendance List
          </h2>
          <p className="text-sm text-gray-600">
            You can edit status for each student
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Recorded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center">
                    <Icon
                      icon="mdi:account-group"
                      className="w-16 h-16 text-gray-300 mx-auto mb-3"
                    />
                    <p className="text-gray-500">
                      No students found for this session
                    </p>
                  </td>
                </tr>
              ) : (
                students
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
                            <div className="text-xs text-gray-500">
                              {student.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Icon
                            icon="mdi:clock-outline"
                            className="w-4 h-4 mr-2 text-gray-400"
                          />
                          {student.time || (
                            <span className="text-gray-400 italic">
                              Not recorded
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <TextField
                          select
                          value={student.status}
                          onChange={(e) =>
                            handleStatusChange(
                              student.id,
                              e.target.value,
                              student.status
                            )
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
                                  : student.status === "excused"
                                  ? "#dbeafe"
                                  : "#f3f4f6",
                              "& fieldset": {
                                borderColor:
                                  student.status === "present"
                                    ? "#10b981"
                                    : student.status === "late"
                                    ? "#f59e0b"
                                    : student.status === "absent"
                                    ? "#ef4444"
                                    : student.status === "excused"
                                    ? "#3b82f6"
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
                                    : student.status === "excused"
                                    ? "#2563eb"
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
                                    : student.status === "excused"
                                    ? "#2563eb"
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
                                  : student.status === "excused"
                                  ? "#1e40af"
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
                            Hadir
                          </MenuItem>
                          <MenuItem
                            value="late"
                            sx={{ color: "#f59e0b", fontWeight: 500 }}
                          >
                            <Icon
                              icon="mdi:clock-alert"
                              className="w-4 h-4 mr-2 inline"
                            />
                            Terlambat
                          </MenuItem>
                          <MenuItem
                            value="absent"
                            sx={{ color: "#ef4444", fontWeight: 500 }}
                          >
                            <Icon
                              icon="mdi:close-circle"
                              className="w-4 h-4 mr-2 inline"
                            />
                            Alpha
                          </MenuItem>
                          <MenuItem
                            value="excused"
                            sx={{ color: "#3b82f6", fontWeight: 500 }}
                          >
                            <Icon
                              icon="mdi:hospital-box"
                              className="w-4 h-4 mr-2 inline"
                            />
                            Sakit/Izin
                          </MenuItem>
                        </TextField>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {students.length > 0 && (
          <TablePagination
            component="div"
            count={students.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{
              borderTop: "1px solid #e5e7eb",
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  marginTop: "14px",
                  marginBottom: "14px",
                },
            }}
          />
        )}
      </div>

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

export default SessionDetail;
