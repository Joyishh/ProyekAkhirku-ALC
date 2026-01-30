import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/widgets/class_card.dart';
import 'student_class_detail_page.dart';

class StudentClassesPage extends StatelessWidget {
  const StudentClassesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.overview,
      title: 'My Classes',
      subtitle: 'Your enrolled courses',
      activeTab: 1,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            // Class 1
            ClassCard(
              type: ClassCardType.myClass,
              title: 'Komputer',
              subtitle: 'Paket SD - SMP',
              days: 'Mon, Fri',
              time: '13:00 - 15:00',
              room: 'Lab A',
              totalStudents: '15 Students',
              progressValue: 0.92,
              nextClassInfo: 'Next: Today, 13:00 PM',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const StudentClassDetailPage(
                      className: 'Komputer',
                      subtitle: 'Paket SD - SMP',
                      schedule: 'Mon, Fri',
                      time: '13:00 - 15:00',
                      room: 'Lab A',
                      students: '15 Students',
                    ),
                  ),
                );
              },
            ),

            // Class 2
            ClassCard(
              type: ClassCardType.myClass,
              title: 'Bahasa Inggris',
              subtitle: 'Paket SD - SMP',
              days: 'Tue, Thu',
              time: '10:00 - 12:00',
              room: 'Room 201',
              totalStudents: '12 Students',
              progressValue: 0.88,
              nextClassInfo: 'Next: Tomorrow, 10:00 AM',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const StudentClassDetailPage(
                      className: 'Bahasa Inggris',
                      subtitle: 'Paket SD - SMP',
                      schedule: 'Tue, Thu',
                      time: '10:00 - 12:00',
                      room: 'Room 201',
                      students: '12 Students',
                    ),
                  ),
                );
              },
            ),

            // Class 3
            ClassCard(
              type: ClassCardType.myClass,
              title: 'Matematika',
              subtitle: 'Paket SD - SMP',
              days: 'Wed',
              time: '09:00 - 11:00',
              room: 'Room 102',
              totalStudents: '18 Students',
              progressValue: 0.95,
              nextClassInfo: 'Next: Wednesday, 09:00 AM',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const StudentClassDetailPage(
                      className: 'Matematika',
                      subtitle: 'Paket SD - SMP',
                      schedule: 'Wed',
                      time: '09:00 - 11:00',
                      room: 'Room 102',
                      students: '18 Students',
                    ),
                  ),
                );
              },
            ),

            // Class 4
            ClassCard(
              type: ClassCardType.myClass,
              title: 'IPA Terpadu',
              subtitle: 'Paket SD - SMP',
              days: 'Wed',
              time: '13:00 - 15:00',
              room: 'Lab B',
              totalStudents: '15 Students',
              progressValue: 0.78,
              nextClassInfo: 'Next: Wednesday, 13:00 PM',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const StudentClassDetailPage(
                      className: 'IPA Terpadu',
                      subtitle: 'Paket SD - SMP',
                      schedule: 'Wed',
                      time: '13:00 - 15:00',
                      room: 'Lab B',
                      students: '15 Students',
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}