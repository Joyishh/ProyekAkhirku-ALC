import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
import '../../../../core/widgets/class_detail_info_card.dart';

class TeacherLearningProgressDetailPage extends StatelessWidget {
  // Parameter yang diperlukan untuk menampilkan detail
  final String className;
  final String subtitle;
  final String schedule;
  final String time;
  final String room;
  final String students;

  const TeacherLearningProgressDetailPage({
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
      userRole: UserRole.teacher,
      headerMode: HeaderMode.detail, // Ini akan menampilkan back button
      title: className,
      subtitle: subtitle,
      activeTab: 2, // Tetap di Learning Progress tab
      
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Card Info Class
            ClassDetailInfoCard(
              schedule: schedule,
              time: time,
              room: room,
              students: students,
            ),
            
            const SizedBox(height: 24),
            
            // Placeholder untuk konten lain
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: const Center(
                child: Text(
                  "Student List / Additional Content",
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: const Center(
                child: Text(
                  "Class Materials / Assignments",
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
