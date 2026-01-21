import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/theme/app_colors.dart';


enum AttendanceStatus { present, late, absent, excused }

class StudentAttendance {
  final String id;
  final String name;
  final String studentId;
  final String checkInTime;
  AttendanceStatus status;

  StudentAttendance({
    required this.id,
    required this.name,
    required this.studentId,
    required this.checkInTime,
    required this.status,
  });
}

class SessionDetailPage extends StatefulWidget {
  final String sessionDate;
  final String sessionName;
  final List<StudentAttendance>? students;

  const SessionDetailPage({
    super.key,
    required this.sessionDate,
    required this.sessionName,
    this.students,
  });

  @override
  State<SessionDetailPage> createState() => _SessionDetailPageState();
}

class _SessionDetailPageState extends State<SessionDetailPage> {
  late List<StudentAttendance> _students;

  @override
  void initState() {
    super.initState();
    // Initialize with provided data or dummy data
    _students = widget.students ?? _getDummyStudents();
  }

  List<StudentAttendance> _getDummyStudents() {
    return [
      StudentAttendance(
        id: '1',
        name: 'Sarah Johnson',
        studentId: 'STU001',
        checkInTime: '10:00 AM',
        status: AttendanceStatus.present,
      ),
      StudentAttendance(
        id: '2',
        name: 'Michael Brown',
        studentId: 'STU002',
        checkInTime: '10:05 AM',
        status: AttendanceStatus.late,
      ),
      StudentAttendance(
        id: '3',
        name: 'Lisa Wong',
        studentId: 'STU003',
        checkInTime: '-',
        status: AttendanceStatus.absent,
      ),
      StudentAttendance(
        id: '4',
        name: 'David Chen',
        studentId: 'STU004',
        checkInTime: '-',
        status: AttendanceStatus.excused,
      ),
      StudentAttendance(
        id: '5',
        name: 'Emma Wilson',
        studentId: 'STU005',
        checkInTime: '09:58 AM',
        status: AttendanceStatus.present,
      ),
      StudentAttendance(
        id: '6',
        name: 'James Miller',
        studentId: 'STU006',
        checkInTime: '10:02 AM',
        status: AttendanceStatus.present,
      ),
      StudentAttendance(
        id: '7',
        name: 'Olivia Davis',
        studentId: 'STU007',
        checkInTime: '10:08 AM',
        status: AttendanceStatus.late,
      ),
      StudentAttendance(
        id: '8',
        name: 'William Garcia',
        studentId: 'STU008',
        checkInTime: '09:55 AM',
        status: AttendanceStatus.present,
      ),
    ];
  }

  // Calculate summary counts
  int get _presentCount =>
      _students.where((s) => s.status == AttendanceStatus.present).length;
  int get _lateCount =>
      _students.where((s) => s.status == AttendanceStatus.late).length;
  int get _absentCount =>
      _students.where((s) => s.status == AttendanceStatus.absent).length;
  int get _excusedCount =>
      _students.where((s) => s.status == AttendanceStatus.excused).length;
  int get _totalCount => _students.length;

  void _updateStudentStatus(String studentId, AttendanceStatus newStatus) {
    setState(() {
      final index = _students.indexWhere((s) => s.id == studentId);
      if (index != -1) {
        _students[index].status = newStatus;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      headerMode: HeaderMode.detail,
      title: 'Session Details',
      subtitle: '${widget.sessionDate} • ${widget.sessionName}',
      activeTab: 1,
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Section 1: Summary KPIs
                _buildSummarySection(),

                const SizedBox(height: 24),

                // Section 2: Student List Header
                _buildSectionHeader(title: 'Student Attendance ($_totalCount)'),

                const SizedBox(height: 12),

                // Section 2: Student List
                _buildStudentList(),
                
                // Extra padding for FAB
                const SizedBox(height: 80),
              ],
            ),
          ),
          
          // Floating Action Button for QR Scanner
          Positioned(
            right: 24,
            bottom: 24,
            child: FloatingActionButton(
              onPressed: () => _openQRScanner(context),
              backgroundColor: AppColors.primary,
              elevation: 4,
              child: const Icon(
                Icons.qr_code_scanner,
                color: Colors.white,
                size: 28,
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  void _openQRScanner(BuildContext context) {
    // TODO: Implement QR Scanner functionality
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('QR Scanner akan segera diimplementasikan'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  Widget _buildSummarySection() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _SummaryCard(
            icon: Icons.check_circle_outline,
            label: 'Present',
            count: _presentCount,
            color: const Color(0xFF22C55E), // Green
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          _SummaryCard(
            icon: Icons.schedule,
            label: 'Late',
            count: _lateCount,
            color: const Color(0xFFF59E0B), // Amber/Orange
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          _SummaryCard(
            icon: Icons.cancel_outlined,
            label: 'Absent',
            count: _absentCount,
            color: const Color(0xFFEF4444), // Red
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          _SummaryCard(
            icon: Icons.info_outline,
            label: 'Excused',
            count: _excusedCount,
            color: const Color(0xFF3B82F6), // Blue
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          _SummaryCard(
            icon: Icons.groups_outlined,
            label: 'Total',
            count: _totalCount,
            color: AppColors.textSecondary,
            backgroundColor: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader({required String title}) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
      ),
    );
  }

  Widget _buildStudentList() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100), // border-gray-100
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05), // shadow-sm
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        padding: EdgeInsets.zero,
        itemCount: _students.length,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          color: Colors.grey.shade200,
        ),
        itemBuilder: (context, index) {
          final student = _students[index];
          return _StudentAttendanceTile(
            name: student.name,
            studentId: student.studentId,
            checkInTime: student.checkInTime,
            status: student.status,
            onStatusChanged: (newStatus) {
              _updateStudentStatus(student.id, newStatus);
            },
          );
        },
      ),
    );
  }
}

/// Summary KPI Card Widget
class _SummaryCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final int count;
  final Color color;
  final Color backgroundColor;

  const _SummaryCard({
    required this.icon,
    required this.label,
    required this.count,
    required this.color,
    required this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100), // border-gray-100
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05), // shadow-sm
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              icon,
              color: color,
              size: 24,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            count.toString(),
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: color.withOpacity(0.8),
            ),
          ),
        ],
      ),
    );
  }
}

/// Student Attendance List Tile Widget
class _StudentAttendanceTile extends StatelessWidget {
  final String name;
  final String studentId;
  final String checkInTime;
  final AttendanceStatus status;
  final ValueChanged<AttendanceStatus> onStatusChanged;

  const _StudentAttendanceTile({
    required this.name,
    required this.studentId,
    required this.checkInTime,
    required this.status,
    required this.onStatusChanged,
  });

  Color _getStatusColor(AttendanceStatus status) {
    switch (status) {
      case AttendanceStatus.present:
        return const Color(0xFF22C55E);
      case AttendanceStatus.late:
        return const Color(0xFFF59E0B);
      case AttendanceStatus.absent:
        return const Color(0xFFEF4444);
      case AttendanceStatus.excused:
        return const Color(0xFF3B82F6);
    }
  }

  String _getStatusLabel(AttendanceStatus status) {
    switch (status) {
      case AttendanceStatus.present:
        return 'Present';
      case AttendanceStatus.late:
        return 'Late';
      case AttendanceStatus.absent:
        return 'Absent';
      case AttendanceStatus.excused:
        return 'Excused';
    }
  }

  @override
  Widget build(BuildContext context) {
    final statusColor = _getStatusColor(status);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          // Left: Student Info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      studentId,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.grey.shade500,
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.symmetric(horizontal: 8),
                      width: 4,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        shape: BoxShape.circle,
                      ),
                    ),
                    Icon(
                      Icons.access_time,
                      size: 14,
                      color: Colors.grey.shade500,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      checkInTime,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.grey.shade500,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Right: Status Dropdown
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: statusColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: statusColor.withOpacity(0.3),
                width: 1,
              ),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<AttendanceStatus>(
                value: status,
                isDense: true,
                icon: Icon(
                  Icons.keyboard_arrow_down,
                  color: statusColor,
                  size: 20,
                ),
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: statusColor,
                ),
                dropdownColor: Colors.white,
                borderRadius: BorderRadius.circular(12),
                items: AttendanceStatus.values.map((status) {
                  final color = _getStatusColor(status);
                  return DropdownMenuItem<AttendanceStatus>(
                    value: status,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.only(right: 8),
                          decoration: BoxDecoration(
                            color: color,
                            shape: BoxShape.circle,
                          ),
                        ),
                        Text(
                          _getStatusLabel(status),
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: color,
                          ),
                        ),
                      ],
                    ),
                  );
                }).toList(),
                onChanged: (newStatus) {
                  if (newStatus != null) {
                    onStatusChanged(newStatus);
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
