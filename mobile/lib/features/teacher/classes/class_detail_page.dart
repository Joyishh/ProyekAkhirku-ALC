import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
// Pastikan import ini mengarah ke file widget yang benar
import '../../../core/widgets/class_detail_info_card.dart';
import 'widgets/class_attendance_history.dart'; // Sesuaikan jika nama file beda
import 'widgets/class_student_list.dart'; // Ganti class_student_list.dart jika isinya cuma satu kartu
import 'session_detail_page.dart';

class TeacherClassDetailPage extends StatelessWidget {
  // Parameter data kelas
  final String className;
  final String subtitle;
  final String schedule;
  final String time;
  final String room;
  final String students;

  const TeacherClassDetailPage({
    super.key,
    required this.className,
    required this.subtitle,
    required this.schedule,
    required this.time,
    required this.room,
    required this.students,
  });

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      // userRole: UserRole.teacher, // Hapus jika MainLayout tidak butuh ini (generic)
      headerMode: HeaderMode.detail,
      title: className,
      subtitle: subtitle,
      activeTab: 1, // Tab Classes aktif

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. CARD INFO CLASS (Metadata)
            ClassDetailInfoCard(
              schedule: schedule,
              time: time,
              room: room,
              students: students,
            ),

            const SizedBox(height: 24),

            // 2. ATTENDANCE HISTORY SECTION
            AttendanceHistoryCard(
              title: "Attendance History",
              onViewAll: () {},
              items: [
                AttendanceHistoryItem(
                  date: "Mon, Jan 15",
                  subtitle: "12 Students recorded",
                  presentCount: 11,
                  absentCount: 1,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Mon, Jan 15',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
                AttendanceHistoryItem(
                  date: "Sat, Jan 13",
                  subtitle: "12 Students recorded",
                  presentCount: 10,
                  absentCount: 2,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Sat, Jan 13',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
                AttendanceHistoryItem(
                  date: "Mon, Jan 15",
                  subtitle: "12 Students recorded",
                  presentCount: 11,
                  absentCount: 1,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Mon, Jan 15',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
                AttendanceHistoryItem(
                  date: "Sat, Jan 13",
                  subtitle: "12 Students recorded",
                  presentCount: 10,
                  absentCount: 2,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Sat, Jan 13',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
                AttendanceHistoryItem(
                  date: "Mon, Jan 15",
                  subtitle: "12 Students recorded",
                  presentCount: 11,
                  absentCount: 1,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Mon, Jan 15',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
                AttendanceHistoryItem(
                  date: "Sat, Jan 13",
                  subtitle: "12 Students recorded",
                  presentCount: 10,
                  absentCount: 2,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder:
                            (context) => const SessionDetailPage(
                              sessionDate: 'Sat, Jan 13',
                              sessionName: 'Bahasa Inggris',
                            ),
                      ),
                    );
                  },
                ),
              ],
            ),

            const SizedBox(height: 24),

            // 3. STUDENT LIST SECTION
            _buildSectionHeader(title: "Students (4)", showSort: true),
            const SizedBox(height: 12),

            // Panggil Widget List Baru
            ClassStudentList(
              students: [
                ClassStudentData(
                  name: "Sarah Johnson",
                  id: "STU001",
                  attendanceRate: 0.95,
                ),
                ClassStudentData(
                  name: "Michael Brown",
                  id: "STU002",
                  attendanceRate: 0.87,
                ),
                ClassStudentData(
                  name: "David Miller",
                  id: "STU004",
                  attendanceRate: 0.65, // Merah
                ),
                ClassStudentData(
                  name: "Lisa Wong",
                  id: "STU003",
                  attendanceRate: 0.98,
                ),
              ],
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  // Helper Widget Header
  Widget _buildSectionHeader({
    required String title,
    bool showViewAll = false,
    bool showSort = false,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        if (showViewAll)
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(
              visualDensity: VisualDensity.compact, // Agar tidak terlalu lebar
            ),
            child: const Text("View All", style: TextStyle(fontSize: 12)),
          ),
        if (showSort)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const Text("Sort by Name", style: TextStyle(fontSize: 10)),
                const SizedBox(width: 4),
                Icon(
                  Icons.keyboard_arrow_down,
                  size: 14,
                  color: Colors.grey.shade600,
                ),
              ],
            ),
          ),
      ],
    );
  }
}
