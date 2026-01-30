import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/theme/app_colors.dart';
import 'widgets/happening_now_card.dart';
import 'widgets/today_classes_card.dart';
import 'widgets/announcement_card.dart';

class StudentDashboardPage extends StatelessWidget {
  const StudentDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.overview,
      title: 'John Doe',
      subtitle: 'Welcome back!',
      activeTab: 0,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Section 1: Happening Now (Hero)
            _buildSectionHeader(
              title: 'Happening Now',
            ),
            const SizedBox(height: 12),
            HappeningNowCard(
              subject: 'Komputer',
              room: 'Lab A',
              time: '13:00 - 15:00',
              isOngoing: true,
              onCheckIn: () {
                // TODO: Navigate to QR Scanner for check-in
                debugPrint('Check In tapped');
              },
            ),

            const SizedBox(height: 28),

            // Section 2: Today's Schedule
            _buildSectionHeader(
              title: "Today's Schedule",
              trailing: '4 classes',
            ),
            const SizedBox(height: 12),
            _buildTodayClassesList(),

            const SizedBox(height: 28),

            // Section 3: Announcements
            _buildSectionHeader(
              title: 'Announcements',
              trailing: '3 new',
            ),
            const SizedBox(height: 12),
            _buildAnnouncementsList(),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader({
    required String title,
    String? trailing,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        if (trailing != null)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              trailing,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade600,
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildTodayClassesList() {
    // Dummy data for today's classes
    final classes = [
      {'subject': 'Matematika', 'time': '09:00 - 11:00', 'room': 'Room 102'},
      {'subject': 'Bahasa Inggris', 'time': '10:00 - 12:00', 'room': 'Room 201'},
      {'subject': 'Komputer', 'time': '13:00 - 15:00', 'room': 'Lab A'},
      {'subject': 'IPA Terpadu', 'time': '13:00 - 15:00', 'room': 'Lab B'},
    ];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      clipBehavior: Clip.none,
      child: Row(
        children: classes.asMap().entries.map((entry) {
          final index = entry.key;
          final classData = entry.value;
          return Padding(
            padding: EdgeInsets.only(right: index < classes.length - 1 ? 12 : 0),
            child: TodayClassesCard(
              subject: classData['subject']!,
              time: classData['time']!,
              room: classData['room']!,
              onTap: () {
                debugPrint('Tapped on ${classData['subject']}');
              },
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildAnnouncementsList() {
    // Dummy data for announcements
    final announcements = [
      {
        'title': 'Mid-term Schedule Released',
        'description': 'Check the new mid-term examination schedule for this semester.',
        'type': AnnouncementType.info,
      },
      {
        'title': 'Library Closure Notice',
        'description': 'The library will be closed on Feb 15th for maintenance.',
        'type': AnnouncementType.warning,
      },
      {
        'title': 'Tuition Payment Deadline',
        'description': 'Please complete your payment before January 31st.',
        'type': AnnouncementType.important,
      },
    ];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      clipBehavior: Clip.none,
      child: Row(
        children: announcements.asMap().entries.map((entry) {
          final index = entry.key;
          final announcement = entry.value;
          return Padding(
            padding: EdgeInsets.only(right: index < announcements.length - 1 ? 12 : 0),
            child: AnnouncementCard(
              title: announcement['title'] as String,
              description: announcement['description'] as String,
              type: announcement['type'] as AnnouncementType,
              onTap: () {
                debugPrint('Tapped on ${announcement['title']}');
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}