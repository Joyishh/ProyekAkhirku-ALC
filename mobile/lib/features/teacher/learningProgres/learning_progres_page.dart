import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
import 'package:companion_app/core/widgets/class_card.dart';
import 'learningprogres_detail_page.dart';

class TeacherLearningProgressPage extends StatelessWidget {
  const TeacherLearningProgressPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.teacher,
      headerMode: HeaderMode.overview,
      title: 'Learning Progress',
      subtitle: 'Track student progress effectively',
      activeTab: 2,

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              height: 100,
              color: Colors.blue[100],
              child: const Center(child: Text("Module Statistic")),
            ),
            const SizedBox(height: 16),
            Container(
              child: Center(
                child: ClassCard(
                  type: ClassCardType.learningProgress, // <-- Footer berubah otomatis
                  title: 'Matematika',
                  subtitle: 'Paket SD - SMP',
                  days: 'Tue, Thu',
                  time: '08:00 - 10:00',
                  room: 'Room 203',
                  totalStudents: '8 Students',
                  progressValue: 0.75, // 75%,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const TeacherLearningProgressDetailPage(
                          className: 'Matematika',
                          subtitle: 'Paket SD - SMP',
                          schedule: 'Tue, Thu',
                          time: '08:00 - 10:00',
                          room: 'Room 203',
                          students: '8 Students',
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
                  type: ClassCardType.learningProgress, // <-- Footer berubah otomatis
                  title: 'Bahasa Inggris',
                  subtitle: 'Paket SD - SMP',
                  days: 'Tue, Thu',
                  time: '08:00 - 10:00',
                  room: 'Room 203',
                  totalStudents: '8 Students',
                  progressValue: 0.75, // 75%,
                  onTap: null,
                ),
              ),
            ),
            Container(
              child: Center(
                child: ClassCard(
                  type: ClassCardType.learningProgress, // <-- Footer berubah otomatis
                  title: 'IPA Terpadu',
                  subtitle: 'Paket SD - SMP',
                  days: 'Tue, Thu',
                  time: '08:00 - 10:00',
                  room: 'Room 203',
                  totalStudents: '8 Students',
                  progressValue: 0.75, // 75%,
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
