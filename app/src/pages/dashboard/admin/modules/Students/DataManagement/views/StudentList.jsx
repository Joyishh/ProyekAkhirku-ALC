import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import ModuleHeader from "../../../../../../../components/ModuleHeader";
import DataTable from "../../../../../../../components/DataTable";
import studentService from "../../../../../../../services/studentService";
import { toast } from "react-toastify";

const StudentList = ({ onViewDetails, refreshTrigger }) => {
  // State management
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProgram, setFilterProgram] = useState("All Programs");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch students on component mount or when refreshTrigger changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await studentService.getAllStudents();

        if (response.success && response.data) {
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Gagal memuat data siswa");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [refreshTrigger]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter students based on search and program filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProgram =
      filterProgram === "All Programs" || student.program === filterProgram;

    return matchesSearch && matchesProgram;
  });

  // Get paginated students
  const paginatedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress size={40} sx={{ color: "#10b981" }} />
        <span className="ml-3 text-gray-600">Loading students data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        title="Students Data Management"
        description="Manage student information, profiles, and academic records"
        icon="mdi:database-edit"
        iconColor="green"
      />

      {/* Students Table */}
      <DataTable
        title="Student List"
        subtitle={`Showing ${paginatedStudents.length} of ${filteredStudents.length} students`}
        searchPlaceholder="Search students by name, ID, or program..."
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        accentColor="#10b981"
        filterComponents={
          <TextField
            select
            size="small"
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            sx={{
              minWidth: "200px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                "&:hover fieldset": {
                  borderColor: "#10b981 !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#10b981 !important",
                  borderWidth: "2px !important",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#10b981 !important",
              },
            }}
          >
            <MenuItem value="All Programs">All Programs</MenuItem>
            <MenuItem value="Paket Reguler SMA">Paket Reguler SMA</MenuItem>
            <MenuItem value="Paket Intensif SMA">Paket Intensif SMA</MenuItem>
            <MenuItem value="Paket UTBK">Paket UTBK</MenuItem>
            <MenuItem value="Paket Private">Paket Private</MenuItem>
          </TextField>
        }
        actionComponent={
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap">
            <Icon icon="mdi:upload" className="w-4 h-4 inline mr-2" />
            Export Data
          </button>
        }
        columns={[
          {
            header: "Student Name",
            align: "left",
            render: (student) => (
              <div className="flex items-center">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {student.name || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {student.email || "N/A"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {student.studentId || "N/A"}
                  </div>
                </div>
              </div>
            ),
          },
          {
            header: "Program",
            align: "center",
            render: (student) => (
              <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {student.program || "No Program"}
              </span>
            ),
          },
          {
            header: "Class Level",
            align: "center",
            render: (student) => (
              <span className="text-sm text-gray-600">
                {student.classLevel || "-"}
              </span>
            ),
          },
          {
            header: "Status",
            align: "center",
            render: (student) => (
              <span
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  student.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {student.status || "inactive"}
              </span>
            ),
          },
          {
            header: "Joined",
            align: "center",
            render: (student) => (
              <span className="text-sm text-gray-500">
                {student.joined || "N/A"}
              </span>
            ),
          },
          {
            header: "Actions",
            align: "center",
            render: (student) => (
              <button
                onClick={() => onViewDetails(student.id)}
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all cursor-pointer"
              >
                <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                View Details
              </button>
            ),
          },
        ]}
        data={paginatedStudents}
        pagination={{
          count: filteredStudents.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage,
        }}
      />
    </div>
  );
};

export default StudentList;
