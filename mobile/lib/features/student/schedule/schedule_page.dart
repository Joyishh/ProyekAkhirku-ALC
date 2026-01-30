import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/widgets/class_card.dart';

class StudentSchedulePage extends StatelessWidget {
  const StudentSchedulePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.overview,
      title: 'My Schedule',
      subtitle: 'Your weekly class schedule',
      activeTab: 3,
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          // Monday
          _buildDaySection([
            _ClassData(
              title: 'Komputer',
              subtitle: 'Paket SD - SMP',
              days: 'Mon',
              time: '13:00 - 15:00',
              room: 'Lab A',
              students: '15 Students',
            ),
          ]),

          // Tuesday
          _buildDaySection([
            _ClassData(
              title: 'Bahasa Inggris',
              subtitle: 'Paket SD - SMP',
              days: 'Tue',
              time: '10:00 - 12:00',
              room: 'Room 201',
              students: '12 Students',
            ),
          ]),

          // Wednesday
          _buildDaySection([
            _ClassData(
              title: 'Matematika',
              subtitle: 'Paket SD - SMP',
              days: 'Wed',
              time: '09:00 - 11:00',
              room: 'Room 102',
              students: '18 Students',
            ),
            _ClassData(
              title: 'IPA Terpadu',
              subtitle: 'Paket SD - SMP',
              days: 'Wed',
              time: '13:00 - 15:00',
              room: 'Lab B',
              students: '15 Students',
            ),
          ]),

          // Thursday
          _buildDaySection([
            _ClassData(
              title: 'Bahasa Inggris',
              subtitle: 'Paket SD - SMP',
              days: 'Thu',
              time: '10:00 - 12:00',
              room: 'Room 201',
              students: '12 Students',
            ),
          ]),

          // Friday
          _buildDaySection([
            _ClassData(
              title: 'Komputer',
              subtitle: 'Paket SD - SMP',
              days: 'Fri',
              time: '13:00 - 15:00',
              room: 'Lab A',
              students: '15 Students',
            ),
          ]),
        ],
      ),
    );
  }

  Widget _buildDaySection(List<_ClassData> classes) {
    if (classes.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Class Cards
        ...classes.map((classData) => ClassCard(
              type: ClassCardType.schedule,
              showProgress: false,
              onTap: null, // Non-clickable
              title: classData.title,
              subtitle: classData.subtitle,
              isActive: true,
              days: classData.days,
              time: classData.time,
              room: classData.room,
              totalStudents: classData.students,
            )),
      ],
    );
  }
}

// Private data class for schedule items
class _ClassData {
  final String title;
  final String subtitle;
  final String days;
  final String time;
  final String room;
  final String students;

  _ClassData({
    required this.title,
    required this.subtitle,
    required this.days,
    required this.time,
    required this.room,
    required this.students,
  });
}