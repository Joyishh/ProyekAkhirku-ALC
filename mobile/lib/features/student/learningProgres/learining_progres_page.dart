import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/widgets/class_card.dart';
import 'learningprogres_detail_page.dart';

class StudentLearningProgressPage extends StatelessWidget {
  const StudentLearningProgressPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.overview,
      title: 'Learning Progress',
      subtitle: 'Track your grades and performance',
      activeTab: 2,
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          ClassCard(
            type: ClassCardType.learningProgress,
            showProgress: false,
            title: 'Komputer',
            subtitle: 'Paket SD - SMP',
            isActive: true,
            days: 'Mon, Fri',
            time: '13:00 - 15:00',
            room: 'Lab A',
            totalStudents: '15 Students',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const StudentLearningProgressDetailPage(
                    className: 'Komputer',
                    subtitle: 'Paket SD - SMP',
                    schedule: 'Mon, Fri',
                    time: '13:00 - 15:00',
                    room: 'Lab A',
                    students: '15 Students',
                    assignmentScore: 85,
                    midExamScore: 88,
                    finalExamScore: 90,
                    attendanceRate: 95,
                  ),
                ),
              );
            },
          ),
          ClassCard(
            type: ClassCardType.learningProgress,
            showProgress: false,
            title: 'Bahasa Inggris',
            subtitle: 'Paket SD - SMP',
            isActive: true,
            days: 'Tue, Thu',
            time: '10:00 - 12:00',
            room: 'Room 201',
            totalStudents: '12 Students',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const StudentLearningProgressDetailPage(
                    className: 'Bahasa Inggris',
                    subtitle: 'Paket SD - SMP',
                    schedule: 'Tue, Thu',
                    time: '10:00 - 12:00',
                    room: 'Room 201',
                    students: '12 Students',
                    assignmentScore: 92,
                    midExamScore: 85,
                    finalExamScore: 88,
                    attendanceRate: 92,
                  ),
                ),
              );
            },
          ),
          ClassCard(
            type: ClassCardType.learningProgress,
            showProgress: false,
            title: 'Matematika',
            subtitle: 'Paket SD - SMP',
            isActive: true,
            days: 'Wed',
            time: '09:00 - 11:00',
            room: 'Room 102',
            totalStudents: '18 Students',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const StudentLearningProgressDetailPage(
                    className: 'Matematika',
                    subtitle: 'Paket SD - SMP',
                    schedule: 'Wed',
                    time: '09:00 - 11:00',
                    room: 'Room 102',
                    students: '18 Students',
                    assignmentScore: 88,
                    midExamScore: 90,
                    finalExamScore: 85,
                    attendanceRate: 88,
                  ),
                ),
              );
            },
          ),
          ClassCard(
            type: ClassCardType.learningProgress,
            showProgress: false,
            title: 'IPA Terpadu',
            subtitle: 'Paket SD - SMP',
            isActive: true,
            days: 'Wed',
            time: '13:00 - 15:00',
            room: 'Lab B',
            totalStudents: '15 Students',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const StudentLearningProgressDetailPage(
                    className: 'IPA Terpadu',
                    subtitle: 'Paket SD - SMP',
                    schedule: 'Wed',
                    time: '13:00 - 15:00',
                    room: 'Lab B',
                    students: '15 Students',
                    assignmentScore: 85,
                    midExamScore: 82,
                    finalExamScore: 87,
                    attendanceRate: 90,
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}