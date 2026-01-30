import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/class_detail_info_card.dart';
import 'widgets/attendance_history_card.dart';
import '../../../core/widgets/class_student_list.dart';

class StudentClassDetailPage extends StatelessWidget {
  final String className;
  final String subtitle;
  final String schedule;
  final String time;
  final String room;
  final String students;

  const StudentClassDetailPage({
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
      userRole: UserRole.student,
      headerMode: HeaderMode.detail,
      title: className,
      subtitle: subtitle,
      activeTab: 1,
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Section 1: Class Info
                ClassDetailInfoCard(
                  schedule: schedule,
                  time: time,
                  room: room,
                  students: students,
                ),

                const SizedBox(height: 24),

                // Section 2: My Attendance History
                const SizedBox(height: 12),
                _buildAttendanceHistory(),

                const SizedBox(height: 24),

                // Section 3: Classmates
                _buildSectionHeader('Classmates'),
                const SizedBox(height: 12),
                _buildClassmatesList(),

                const SizedBox(height: 80), // Extra padding for FAB
              ],
            ),
          ),

          // Floating Action Button for Student QR Code
          Positioned(
            right: 24,
            bottom: 24,
            child: FloatingActionButton(
              onPressed: () => _showStudentQRCode(context),
              backgroundColor: AppColors.primary,
              elevation: 4,
              child: const Icon(
                Icons.qr_code,
                color: Colors.white,
                size: 28,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showStudentQRCode(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'My QR Code',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(context),
                    color: Colors.grey.shade600,
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // Student Info
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey.shade50,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(
                      'John Doe',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'STU001',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // QR Code (Dummy using Container with pattern)
              Container(
                width: 250,
                height: 250,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300, width: 2),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.qr_code_2,
                        size: 150,
                        color: Colors.grey.shade800,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'STU001',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey.shade700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Info text
              Text(
                'Show this QR code to your teacher for attendance',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 13,
                  color: Colors.grey.shade600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
      ),
    );
  }

  Widget _buildAttendanceHistory() {
    // Dummy data - Student's own attendance history
    final sessions = [
      AttendanceSessionData(
        sessionName: 'Session 8',
        date: 'Jan 27, 2026',
        checkInTime: '10:02 AM',
        status: AttendanceSessionStatus.present,
      ),
      AttendanceSessionData(
        sessionName: 'Session 7',
        date: 'Jan 25, 2026',
        checkInTime: '10:15 AM',
        status: AttendanceSessionStatus.late,
      ),
      AttendanceSessionData(
        sessionName: 'Session 6',
        date: 'Jan 22, 2026',
        checkInTime: '09:58 AM',
        status: AttendanceSessionStatus.present,
      ),
      AttendanceSessionData(
        sessionName: 'Session 5',
        date: 'Jan 20, 2026',
        checkInTime: '-',
        status: AttendanceSessionStatus.absent,
      ),
      AttendanceSessionData(
        sessionName: 'Session 4',
        date: 'Jan 18, 2026',
        checkInTime: '-',
        status: AttendanceSessionStatus.excused,
      ),
      AttendanceSessionData(
        sessionName: 'Session 3',
        date: 'Jan 15, 2026',
        checkInTime: '10:00 AM',
        status: AttendanceSessionStatus.present,
      ),
    ];

    return AttendanceHistoryCard(
      sessions: sessions,
      onTap: null, // Read-only for students
    );
  }

  Widget _buildClassmatesList() {
    // Dummy data - Classmates (without showing their attendance)
    final classmates = [
      ClassStudentData(name: 'Alice Johnson', id: 'STU001', attendanceRate: 0),
      ClassStudentData(name: 'Bob Smith', id: 'STU002', attendanceRate: 0),
      ClassStudentData(name: 'Charlie Brown', id: 'STU003', attendanceRate: 0),
      ClassStudentData(name: 'Diana Ross', id: 'STU004', attendanceRate: 0),
      ClassStudentData(name: 'Edward Lee', id: 'STU005', attendanceRate: 0),
      ClassStudentData(name: 'Fiona Chen', id: 'STU006', attendanceRate: 0),
      ClassStudentData(name: 'George Wang', id: 'STU007', attendanceRate: 0),
      ClassStudentData(name: 'Hannah Kim', id: 'STU008', attendanceRate: 0),
    ];

    return ClassStudentList(
      students: classmates,
      showAttendanceRate: false, // Hide attendance rate for student view
      onTap: (student) {
        // Could navigate to classmate profile in future
        debugPrint('Tapped on ${student.name}');
      },
    );
  }
}
