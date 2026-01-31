import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import KPICard from "../../../../../../../components/KPICard";
import ModuleHeader from "../../../../../../../components/ModuleHeader";
import DataTable from "../../../../../../../components/DataTable";

const Overview = ({ onClassClick }) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterGrade, setFilterGrade] = useState("All");

  // Pagination States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock Data: All Classes
  const [classes] = useState([
    {
      id: 1,
      name: "Matematika Kelas 12 IPA",
      teacher: "Ibu Siti Rahayu",
      subject: "Matematika",
      grade: "12",
      schedule: "Senin & Rabu",
      time: "08:00 - 09:30",
      room: "Ruang 101",
      totalStudents: 25,
      attendanceRate: 88,
      attendanceHistory: [
        {
          date: "2024-12-21",
          present: 22,
          absent: 2,
          late: 1,
          excused: 0,
          total: 25,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD001",
              name: "Ahmad Pratama",
              photo: "https://i.pravatar.cc/40?img=1",
              time: "08:05",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD002",
              name: "Siti Nurhaliza",
              photo: "https://i.pravatar.cc/40?img=2",
              time: "08:03",
              status: "present",
            },
            {
              id: 3,
              studentId: "STD003",
              name: "Budi Santoso",
              photo: "https://i.pravatar.cc/40?img=3",
              time: "08:15",
              status: "late",
            },
            {
              id: 4,
              studentId: "STD004",
              name: "Dewi Lestari",
              photo: "https://i.pravatar.cc/40?img=4",
              time: "-",
              status: "absent",
            },
            {
              id: 5,
              studentId: "STD005",
              name: "Eko Prasetyo",
              photo: "https://i.pravatar.cc/40?img=5",
              time: "08:02",
              status: "present",
            },
          ],
        },
        {
          date: "2024-12-18",
          present: 24,
          absent: 1,
          late: 0,
          excused: 0,
          total: 25,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD001",
              name: "Ahmad Pratama",
              photo: "https://i.pravatar.cc/40?img=1",
              time: "07:58",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD002",
              name: "Siti Nurhaliza",
              photo: "https://i.pravatar.cc/40?img=2",
              time: "08:00",
              status: "present",
            },
            {
              id: 3,
              studentId: "STD003",
              name: "Budi Santoso",
              photo: "https://i.pravatar.cc/40?img=3",
              time: "08:01",
              status: "present",
            },
            {
              id: 4,
              studentId: "STD004",
              name: "Dewi Lestari",
              photo: "https://i.pravatar.cc/40?img=4",
              time: "-",
              status: "absent",
            },
            {
              id: 5,
              studentId: "STD005",
              name: "Eko Prasetyo",
              photo: "https://i.pravatar.cc/40?img=5",
              time: "07:59",
              status: "present",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD001",
          name: "Ahmad Pratama",
          photo: "https://i.pravatar.cc/40?img=1",
          attendanceRate: 95,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 2,
          studentId: "STD002",
          name: "Siti Nurhaliza",
          photo: "https://i.pravatar.cc/40?img=2",
          attendanceRate: 92,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 3,
          studentId: "STD003",
          name: "Budi Santoso",
          photo: "https://i.pravatar.cc/40?img=3",
          attendanceRate: 78,
          status: "late",
          lastAttended: "2024-12-21",
        },
        {
          id: 4,
          studentId: "STD004",
          name: "Dewi Lestari",
          photo: "https://i.pravatar.cc/40?img=4",
          attendanceRate: 65,
          status: "absent",
          lastAttended: "2024-12-18",
        },
        {
          id: 5,
          studentId: "STD005",
          name: "Eko Prasetyo",
          photo: "https://i.pravatar.cc/40?img=5",
          attendanceRate: 98,
          status: "present",
          lastAttended: "2024-12-21",
        },
      ],
    },
    {
      id: 2,
      name: "Bahasa Inggris Kelas 11 IPS",
      teacher: "Pak Joko Widodo",
      subject: "Bahasa Inggris",
      grade: "11",
      schedule: "Selasa & Kamis",
      time: "10:00 - 11:30",
      room: "Ruang 203",
      totalStudents: 28,
      attendanceRate: 92,
      attendanceHistory: [
        {
          date: "2024-12-21",
          present: 25,
          absent: 1,
          late: 0,
          excused: 2,
          total: 28,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD010",
              name: "Rina Wijaya",
              photo: "https://i.pravatar.cc/40?img=10",
              time: "09:58",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD011",
              name: "Arief Rahman",
              photo: "https://i.pravatar.cc/40?img=11",
              time: "10:01",
              status: "present",
            },
            {
              id: 3,
              studentId: "STD012",
              name: "Linda Kusuma",
              photo: "https://i.pravatar.cc/40?img=12",
              time: "-",
              status: "excused",
            },
            {
              id: 4,
              studentId: "STD013",
              name: "Rudi Hartono",
              photo: "https://i.pravatar.cc/40?img=13",
              time: "-",
              status: "absent",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD010",
          name: "Rina Wijaya",
          photo: "https://i.pravatar.cc/40?img=10",
          attendanceRate: 96,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 2,
          studentId: "STD011",
          name: "Arief Rahman",
          photo: "https://i.pravatar.cc/40?img=11",
          attendanceRate: 94,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 3,
          studentId: "STD012",
          name: "Linda Kusuma",
          photo: "https://i.pravatar.cc/40?img=12",
          attendanceRate: 88,
          status: "excused",
          lastAttended: "2024-12-19",
        },
        {
          id: 4,
          studentId: "STD013",
          name: "Rudi Hartono",
          photo: "https://i.pravatar.cc/40?img=13",
          attendanceRate: 72,
          status: "absent",
          lastAttended: "2024-12-18",
        },
      ],
    },
    {
      id: 3,
      name: "Fisika Kelas 12 IPA",
      teacher: "Pak Bambang Susilo",
      subject: "Fisika",
      grade: "12",
      schedule: "Senin & Jumat",
      time: "13:00 - 14:30",
      room: "Lab Fisika",
      totalStudents: 24,
      attendanceRate: 100,
      attendanceHistory: [
        {
          date: "2024-12-21",
          present: 24,
          absent: 0,
          late: 0,
          excused: 0,
          total: 24,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD020",
              name: "Hendra Wijaya",
              photo: "https://i.pravatar.cc/40?img=20",
              time: "12:58",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD021",
              name: "Fitri Handayani",
              photo: "https://i.pravatar.cc/40?img=21",
              time: "12:59",
              status: "present",
            },
            {
              id: 3,
              studentId: "STD022",
              name: "Dimas Aditya",
              photo: "https://i.pravatar.cc/40?img=22",
              time: "13:00",
              status: "present",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD020",
          name: "Hendra Wijaya",
          photo: "https://i.pravatar.cc/40?img=20",
          attendanceRate: 100,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 2,
          studentId: "STD021",
          name: "Fitri Handayani",
          photo: "https://i.pravatar.cc/40?img=21",
          attendanceRate: 100,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 3,
          studentId: "STD022",
          name: "Dimas Aditya",
          photo: "https://i.pravatar.cc/40?img=22",
          attendanceRate: 100,
          status: "present",
          lastAttended: "2024-12-21",
        },
      ],
    },
    {
      id: 4,
      name: "Kimia Kelas 11 IPA",
      teacher: "Ibu Dewi Kartika",
      subject: "Kimia",
      grade: "11",
      schedule: "Rabu & Jumat",
      time: "08:00 - 09:30",
      room: "Lab Kimia",
      totalStudents: 26,
      attendanceRate: 85,
      attendanceHistory: [
        {
          date: "2024-12-20",
          present: 22,
          absent: 3,
          late: 1,
          excused: 0,
          total: 26,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD030",
              name: "Yoga Pratama",
              photo: "https://i.pravatar.cc/40?img=30",
              time: "08:02",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD031",
              name: "Indah Permata",
              photo: "https://i.pravatar.cc/40?img=31",
              time: "08:10",
              status: "late",
            },
            {
              id: 3,
              studentId: "STD032",
              name: "Rizky Fadillah",
              photo: "https://i.pravatar.cc/40?img=32",
              time: "-",
              status: "absent",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD030",
          name: "Yoga Pratama",
          photo: "https://i.pravatar.cc/40?img=30",
          attendanceRate: 90,
          status: "present",
          lastAttended: "2024-12-20",
        },
        {
          id: 2,
          studentId: "STD031",
          name: "Indah Permata",
          photo: "https://i.pravatar.cc/40?img=31",
          attendanceRate: 82,
          status: "late",
          lastAttended: "2024-12-20",
        },
        {
          id: 3,
          studentId: "STD032",
          name: "Rizky Fadillah",
          photo: "https://i.pravatar.cc/40?img=32",
          attendanceRate: 68,
          status: "absent",
          lastAttended: "2024-12-18",
        },
      ],
    },
    {
      id: 5,
      name: "Biologi Kelas 10 IPA",
      teacher: "Ibu Siti Rahayu",
      subject: "Biologi",
      grade: "10",
      schedule: "Selasa & Kamis",
      time: "13:00 - 14:30",
      room: "Lab Biologi",
      totalStudents: 30,
      attendanceRate: 78,
      attendanceHistory: [
        {
          date: "2024-12-19",
          present: 23,
          absent: 5,
          late: 2,
          excused: 0,
          total: 30,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD040",
              name: "Mega Wulandari",
              photo: "https://i.pravatar.cc/40?img=40",
              time: "12:59",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD041",
              name: "Andi Saputra",
              photo: "https://i.pravatar.cc/40?img=41",
              time: "13:15",
              status: "late",
            },
            {
              id: 3,
              studentId: "STD042",
              name: "Sari Rahayu",
              photo: "https://i.pravatar.cc/40?img=42",
              time: "-",
              status: "absent",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD040",
          name: "Mega Wulandari",
          photo: "https://i.pravatar.cc/40?img=40",
          attendanceRate: 85,
          status: "present",
          lastAttended: "2024-12-19",
        },
        {
          id: 2,
          studentId: "STD041",
          name: "Andi Saputra",
          photo: "https://i.pravatar.cc/40?img=41",
          attendanceRate: 75,
          status: "late",
          lastAttended: "2024-12-19",
        },
        {
          id: 3,
          studentId: "STD042",
          name: "Sari Rahayu",
          photo: "https://i.pravatar.cc/40?img=42",
          attendanceRate: 60,
          status: "absent",
          lastAttended: "2024-12-15",
        },
      ],
    },
    {
      id: 6,
      name: "Sejarah Kelas 10 IPS",
      teacher: "Pak Agus Setiawan",
      subject: "Sejarah",
      grade: "10",
      schedule: "Senin & Rabu",
      time: "10:00 - 11:30",
      room: "Ruang 105",
      totalStudents: 32,
      attendanceRate: 90,
      attendanceHistory: [
        {
          date: "2024-12-21",
          present: 29,
          absent: 2,
          late: 1,
          excused: 0,
          total: 32,
          studentsDetail: [
            {
              id: 1,
              studentId: "STD050",
              name: "Fajar Nugroho",
              photo: "https://i.pravatar.cc/40?img=50",
              time: "09:58",
              status: "present",
            },
            {
              id: 2,
              studentId: "STD051",
              name: "Nina Agustina",
              photo: "https://i.pravatar.cc/40?img=51",
              time: "10:00",
              status: "present",
            },
            {
              id: 3,
              studentId: "STD052",
              name: "Hadi Purnomo",
              photo: "https://i.pravatar.cc/40?img=52",
              time: "10:12",
              status: "late",
            },
          ],
        },
      ],
      students: [
        {
          id: 1,
          studentId: "STD050",
          name: "Fajar Nugroho",
          photo: "https://i.pravatar.cc/40?img=50",
          attendanceRate: 94,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 2,
          studentId: "STD051",
          name: "Nina Agustina",
          photo: "https://i.pravatar.cc/40?img=51",
          attendanceRate: 96,
          status: "present",
          lastAttended: "2024-12-21",
        },
        {
          id: 3,
          studentId: "STD052",
          name: "Hadi Purnomo",
          photo: "https://i.pravatar.cc/40?img=52",
          attendanceRate: 80,
          status: "late",
          lastAttended: "2024-12-21",
        },
      ],
    },
  ]);

  // Filter Options
  const teachers = ["All", ...new Set(classes.map((c) => c.teacher))];
  const subjects = ["All", ...new Set(classes.map((c) => c.subject))];
  const grades = ["All", "10", "11", "12"];

  // Calculate KPI Stats
  const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0);
  const avgAttendanceRate = Math.round(
    classes.reduce((sum, c) => sum + c.attendanceRate, 0) / classes.length,
  );

  // Calculate today's stats from latest attendance history
  const todayStats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;

    classes.forEach((cls) => {
      if (cls.attendanceHistory && cls.attendanceHistory.length > 0) {
        const latestSession = cls.attendanceHistory[0];
        present += latestSession.present || 0;
        absent += latestSession.absent || 0;
        late += latestSession.late || 0;
      }
    });

    return { present, absent, late };
  }, [classes]);

  // Filtered Classes
  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      const matchSearch =
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTeacher =
        filterTeacher === "All" || cls.teacher === filterTeacher;
      const matchSubject =
        filterSubject === "All" || cls.subject === filterSubject;
      const matchGrade = filterGrade === "All" || cls.grade === filterGrade;

      return matchSearch && matchTeacher && matchSubject && matchGrade;
    });
  }, [classes, searchQuery, filterTeacher, filterSubject, filterGrade]);

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get attendance rate color
  const getAttendanceRateColor = (rate) => {
    if (rate >= 90) return "text-green-600 bg-green-100";
    if (rate >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:clipboard-check"
        iconColor="purple"
        title="Attendance Management"
        description="Monitor and manage student attendance across all classes"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Average Attendance"
          value={`${avgAttendanceRate}%`}
          icon="mdi:chart-line"
          color="green"
          trend={`${classes.length} active classes`}
        />
        <KPICard
          title="Present Today"
          value={todayStats.present}
          icon="mdi:account-check"
          color="blue"
          trend={`of ${totalStudents} total students`}
        />
        <KPICard
          title="Absent Today"
          value={todayStats.absent}
          icon="mdi:account-off"
          color="red"
          trend="Requires attention"
        />
        <KPICard
          title="Late Today"
          value={todayStats.late}
          icon="mdi:account-clock"
          color="yellow"
          trend="Tardiness tracking"
        />
      </div>

      {/* Filter Section & Table */}
      <DataTable
        title="Class List"
        subtitle="Click on a View Details button to see more details"
        searchPlaceholder="Search class name or teacher..."
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        filterComponents={
          <>
            <TextField
              select
              size="small"
              variant="outlined"
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              sx={{
                minWidth: "160px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": { borderColor: "#a855f7" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9333ea",
                    borderWidth: "2px",
                  },
                },
              }}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher} value={teacher}>
                  {teacher === "All" ? "All Teachers" : teacher}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              variant="outlined"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              sx={{
                minWidth: "160px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": { borderColor: "#a855f7" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9333ea",
                    borderWidth: "2px",
                  },
                },
              }}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject === "All" ? "All Subjects" : subject}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              variant="outlined"
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              sx={{
                minWidth: "140px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": { borderColor: "#a855f7" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9333ea",
                    borderWidth: "2px",
                  },
                },
              }}
            >
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade === "All" ? "All Grades" : `Grade ${grade}`}
                </MenuItem>
              ))}
            </TextField>
          </>
        }
        columns={[
          {
            header: "Class Name",
            align: "left",
            render: (cls) => (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon
                    icon="mdi:school"
                    className="w-5 h-5 text-purple-600"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {cls.name}
                  </div>
                  <div className="text-xs text-gray-500">{cls.room}</div>
                </div>
              </div>
            ),
          },
          {
            header: "Teacher",
            align: "left",
            render: (cls) => (
              <div className="flex items-center">
                <Icon
                  icon="mdi:account-tie"
                  className="w-4 h-4 text-gray-400 mr-2"
                />
                <span className="text-sm text-gray-700">{cls.teacher}</span>
              </div>
            ),
          },
          {
            header: "Schedule",
            align: "left",
            render: (cls) => (
              <div>
                <div className="text-sm text-gray-900 flex items-center">
                  <Icon
                    icon="mdi:calendar"
                    className="w-4 h-4 text-gray-400 mr-1"
                  />
                  {cls.schedule}
                </div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Icon
                    icon="mdi:clock-outline"
                    className="w-3 h-3 text-gray-400 mr-1"
                  />
                  {cls.time}
                </div>
              </div>
            ),
          },
          {
            header: "Total Students",
            align: "center",
            render: (cls) => (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                <Icon
                  icon="mdi:account-group"
                  className="w-3.5 h-3.5 mr-1"
                />
                {cls.totalStudents}
              </span>
            ),
          },
          {
            header: "Attendance Rate",
            align: "center",
            render: (cls) => (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getAttendanceRateColor(
                  cls.attendanceRate
                )}`}
              >
                {cls.attendanceRate}%
              </span>
            ),
          },
          {
            header: "Action",
            align: "center",
            render: (cls) => (
              <button
                onClick={() => onClassClick(cls)}
                className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                View Details
              </button>
            ),
          },
        ]}
        data={filteredClasses.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
        pagination={{
          count: filteredClasses.length,
          page: page,
          rowsPerPage: rowsPerPage,
          handleChangePage: handleChangePage,
          handleChangeRowsPerPage: handleChangeRowsPerPage,
        }}
      />
    </div>
  );
};

export default Overview;
