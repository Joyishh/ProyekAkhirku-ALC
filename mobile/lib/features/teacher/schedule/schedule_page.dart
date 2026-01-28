import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
import '../../../core/widgets/class_card.dart';

class TeacherSchedulePage extends StatelessWidget {
  const TeacherSchedulePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.teacher,
      headerMode: HeaderMode.overview,
      title: 'Schedule',
      subtitle: 'Track your upcoming schedules',
      activeTab: 3,

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const SizedBox(height: 16),
            Container(
              child: const Center(
                child: ClassCard(
                  type: ClassCardType.schedule, // <-- Footer hilang
                  title: 'Komputer',
                  subtitle: 'Paket SD - SMP',
                  days: 'Fri',
                  time: '13:00 - 15:00',
                  room: 'Lab A',
                  totalStudents: '15 Students',
                ),
              ),
            ),
            Container(
              child: const Center(
                child: ClassCard(
                  type: ClassCardType.schedule, // <-- Footer hilang
                  title: 'Bahasa Inggris',
                  subtitle: 'Paket SD - SMP',
                  days: 'Fri',
                  time: '13:00 - 15:00',
                  room: 'Lab A',
                  totalStudents: '15 Students',
                ),
              ),
            ),
            Container(
              child: const Center(
                child: ClassCard(
                  type: ClassCardType.schedule, // <-- Footer hilang
                  title: 'Matematika',
                  subtitle: 'Paket SD - SMP',
                  days: 'Fri',
                  time: '13:00 - 15:00',
                  room: 'Lab A',
                  totalStudents: '15 Students',
                ),
              ),
            ),
            Container(
              child: const Center(
                child: ClassCard(
                  type: ClassCardType.schedule, // <-- Footer hilang
                  title: 'IPA Terpadu',
                  subtitle: 'Paket SD - SMP',
                  days: 'Fri',
                  time: '13:00 - 15:00',
                  room: 'Lab A',
                  totalStudents: '15 Students',
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
