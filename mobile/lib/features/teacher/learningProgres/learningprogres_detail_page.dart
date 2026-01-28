import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';
import '../../../core/widgets/class_detail_info_card.dart';
import 'widgets/learningprogres_student_list.dart';
import 'widgets/learningprogres_modal_edit.dart';

class TeacherLearningProgressDetailPage extends StatefulWidget {
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
  State<TeacherLearningProgressDetailPage> createState() =>
      _TeacherLearningProgressDetailPageState();
}

class _TeacherLearningProgressDetailPageState
    extends State<TeacherLearningProgressDetailPage> {
  late List<StudentGradeModel> _students;

  @override
  void initState() {
    super.initState();
    _students = _getDummyStudents();
  }

  // Dummy data untuk student list
  List<StudentGradeModel> _getDummyStudents() {
    return [
      const StudentGradeModel(
        id: '1',
        name: 'Sarah Johnson',
        studentId: 'STU-2024-001',
        averageScore: 85,
        assignmentScore: 85,
        midExamScore: 88,
        finalExamScore: 82,
        attendanceRate: 0.95,
      ),
      const StudentGradeModel(
        id: '2',
        name: 'Michael Brown',
        studentId: 'STU-2024-002',
        averageScore: 71,
        assignmentScore: 75,
        midExamScore: 70,
        finalExamScore: 68,
        attendanceRate: 0.88,
      ),
      const StudentGradeModel(
        id: '3',
        name: 'Lisa Wong',
        studentId: 'STU-2024-003',
        averageScore: 91,
        assignmentScore: 92,
        midExamScore: 91,
        finalExamScore: 90,
        attendanceRate: 0.98,
      ),
      const StudentGradeModel(
        id: '4',
        name: 'David Martinez',
        studentId: 'STU-2024-004',
        averageScore: null,
        assignmentScore: null,
        midExamScore: null,
        finalExamScore: null,
        attendanceRate: 0.75,
      ),
    ];
  }

  void _handleStudentUpdate(StudentGradeModel updatedStudent) {
    setState(() {
      final index = _students.indexWhere((s) => s.id == updatedStudent.id);
      if (index != -1) {
        _students[index] = updatedStudent;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Grades saved for ${updatedStudent.name}'),
        backgroundColor: Colors.green,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final gradedCount = _students.where((s) => s.isGraded).length;

    return MainLayout(
      userRole: UserRole.teacher,
      headerMode: HeaderMode.detail,
      title: widget.className,
      subtitle: widget.subtitle,
      activeTab: 2,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Card Info Class
            ClassDetailInfoCard(
              schedule: widget.schedule,
              time: widget.time,
              room: widget.room,
              students: widget.students,
            ),

            const SizedBox(height: 24),

            // Student Grading List
            LearningProgressStudentList(
              students: _students,
              totalStudents: _students.length,
              gradedCount: gradedCount,
              onEditTap: (student) {
                showEditGradeModal(
                  context: context,
                  student: student,
                  className: widget.className,
                  onSave: _handleStudentUpdate,
                );
              },
            ),

            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
