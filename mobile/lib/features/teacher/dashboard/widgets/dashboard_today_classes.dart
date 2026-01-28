import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

enum ClassStatus { ongoing, upcoming }

class ClassItem {
  final String name;
  final String room;
  final String level;
  final String startTime;
  final String endTime;
  final int studentCount;
  final ClassStatus status;

  const ClassItem({
    required this.name,
    required this.room,
    required this.level,
    required this.startTime,
    required this.endTime,
    required this.studentCount,
    required this.status,
  });
}

class DashboardTodayClasses extends StatelessWidget {
  final VoidCallback? onAttendanceTap;

  const DashboardTodayClasses({
    super.key,
    this.onAttendanceTap,
  });

  static const List<ClassItem> _classes = [
    ClassItem(
      name: 'Advanced English',
      room: 'Room 101',
      level: 'Advanced',
      startTime: '10:00',
      endTime: '12:00',
      studentCount: 12,
      status: ClassStatus.ongoing,
    ),
    ClassItem(
      name: 'Beginner Spanish',
      room: 'Room 203',
      level: 'Beginner',
      startTime: '14:30',
      endTime: '16:00',
      studentCount: 8,
      status: ClassStatus.upcoming,
    ),
    ClassItem(
      name: 'Intermediate French',
      room: 'Room 105',
      level: 'Intermediate',
      startTime: '16:00',
      endTime: '18:00',
      studentCount: 15,
      status: ClassStatus.upcoming,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header Row
        _buildHeader(),

        const SizedBox(height: 16),

        // Class Cards List
        ...List.generate(_classes.length, (index) {
          return Padding(
            padding: EdgeInsets.only(bottom: index < _classes.length - 1 ? 12 : 0),
            child: _ClassCard(
              classItem: _classes[index],
              onAttendanceTap: onAttendanceTap,
            ),
          );
        }),
      ],
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          "Today's Classes",
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: Colors.grey.shade100,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            '${_classes.length} classes',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: Colors.grey.shade700,
            ),
          ),
        ),
      ],
    );
  }
}

class _ClassCard extends StatelessWidget {
  final ClassItem classItem;
  final VoidCallback? onAttendanceTap;

  const _ClassCard({
    required this.classItem,
    this.onAttendanceTap,
  });

  Color get _statusColor => classItem.status == ClassStatus.ongoing
      ? Colors.green
      : AppColors.primary;

  Color get _statusBackgroundColor => classItem.status == ClassStatus.ongoing
      ? Colors.green.shade50
      : AppColors.primary.withOpacity(0.1);

  String get _statusText => classItem.status == ClassStatus.ongoing
      ? 'Ongoing'
      : 'Upcoming';

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: IntrinsicHeight(
        child: Row(
          children: [
            // Left colored border strip
            Container(
              width: 4,
              decoration: BoxDecoration(
                color: _statusColor,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  bottomLeft: Radius.circular(16),
                ),
              ),
            ),

            // Card Content
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Time Column
                    _buildTimeColumn(),

                    const SizedBox(width: 16),

                    // Main Content Column
                    Expanded(
                      child: _buildContentColumn(),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTimeColumn() {
    return SizedBox(
      width: 50,
      child: Column(
        children: [
          // Start Time
          Text(
            classItem.startTime,
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),

          const SizedBox(height: 2),

          // End Time
          Text(
            classItem.endTime,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey.shade500,
            ),
          ),

          const SizedBox(height: 8),

          // Vertical Line
          Container(
            width: 2,
            height: 24,
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(1),
            ),
          ),

          const SizedBox(height: 8),

          // Schedule Icon
          Icon(
            Icons.schedule_outlined,
            size: 18,
            color: Colors.grey.shade400,
          ),
        ],
      ),
    );
  }

  Widget _buildContentColumn() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title Row with Status Badge
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Text(
                classItem.name,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
            const SizedBox(width: 8),
            _buildStatusBadge(),
          ],
        ),

        const SizedBox(height: 6),

        // Room & Level Info
        Row(
          children: [
            Icon(
              Icons.location_on_outlined,
              size: 14,
              color: Colors.grey.shade500,
            ),
            const SizedBox(width: 4),
            Text(
              classItem.room,
              style: TextStyle(
                fontSize: 13,
                color: Colors.grey.shade600,
              ),
            ),
            const SizedBox(width: 8),
            Container(
              width: 4,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade400,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              classItem.level,
              style: TextStyle(
                fontSize: 13,
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),

        const SizedBox(height: 12),

        // Bottom Row - Student Count & Action
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Student Count
            Text(
              '${classItem.studentCount} Students',
              style: TextStyle(
                fontSize: 13,
                color: Colors.grey.shade600,
                fontWeight: FontWeight.w500,
              ),
            ),

            // Action Button or Chevron
            _buildAction(),
          ],
        ),
      ],
    );
  }

  Widget _buildStatusBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: _statusBackgroundColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        _statusText,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: _statusColor,
        ),
      ),
    );
  }

  Widget _buildAction() {
    if (classItem.status == ClassStatus.ongoing) {
      return SizedBox(
        height: 32,
        child: ElevatedButton.icon(
          onPressed: onAttendanceTap,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          icon: const Icon(Icons.person_add_alt_1_outlined, size: 16, color: Colors.white,),
          label: const Text(
            'Attendance',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      );
    } else {
      return Icon(
        Icons.chevron_right,
        color: Colors.grey.shade400,
        size: 24,
      );
    }
  }
}
