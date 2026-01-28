import '../../../core/widgets/class_card.dart';
import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
import 'class_detail_page.dart';

class TeacherClassesPage extends StatelessWidget {
  const TeacherClassesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.teacher,
      headerMode: HeaderMode.overview,
      title: 'My Classes',
      subtitle: 'Manage your assigned classes',
      activeTab: 1,

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const SizedBox(height: 16),
            Container(
              child: Center(
                child: ClassCard(
                  type: ClassCardType.myClass,
                  title: 'Bahasa Inggris',
                  subtitle: 'Paket SD - SMP',
                  days: 'Mon, Wed',
                  time: '10:00 - 12:00',
                  room: 'Room 101',
                  totalStudents: '12 Students',
                  progressValue: 0.95, // 95%
                  nextClassInfo: 'Next: Today, 10:00 AM',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const TeacherClassDetailPage(
                          className: 'Bahasa Inggris',
                          subtitle: 'Paket SD - SMP',
                          schedule: 'Mon, Wed',
                          time: '10:00 - 12:00',
                          room: 'Room 101',
                          students: '12 Students',
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
            Container(
              child: Center(
                child: ClassCard(
                  type: ClassCardType.myClass,
                  title: 'Matematika',
                  subtitle: 'Paket SMP',
                  days: 'Tue, Fri',
                  time: '13:00 - 15:00',
                  room: 'Room 202',
                  totalStudents: '10 Students',
                  progressValue: 0.80,
                  nextClassInfo: 'Next: Tomorrow, 13:00 PM',
                  onTap: null,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
