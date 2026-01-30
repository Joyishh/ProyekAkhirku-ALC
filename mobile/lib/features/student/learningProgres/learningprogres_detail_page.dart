import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/class_detail_info_card.dart';

class StudentLearningProgressDetailPage extends StatelessWidget {
  final String className;
  final String subtitle;
  final String schedule;
  final String time;
  final String room;
  final String students;
  final int assignmentScore;
  final int midExamScore;
  final int finalExamScore;
  final int attendanceRate;

  const StudentLearningProgressDetailPage({
    super.key,
    required this.className,
    required this.subtitle,
    required this.schedule,
    required this.time,
    required this.room,
    required this.students,
    required this.assignmentScore,
    required this.midExamScore,
    required this.finalExamScore,
    required this.attendanceRate,
  });

  double get overallAverage {
    // Calculate weighted average: Assignment 30%, Mid 30%, Final 40%
    return (assignmentScore * 0.3) + (midExamScore * 0.3) + (finalExamScore * 0.4);
  }

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.detail,
      title: className,
      subtitle: subtitle,
      activeTab: 2,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Section 1: Class Details
            ClassDetailInfoCard(
              schedule: schedule,
              time: time,
              room: room,
              students: students,
            ),

            const SizedBox(height: 24),

            // Section 2: My Grades
            _buildMyGradesSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildMyGradesSection() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              const Icon(Icons.bar_chart, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              const Text(
                'My Grades',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // 2x2 Grid Layout
          Row(
            children: [
              Expanded(
                child: _buildGradeItem(
                  label: 'ASSIGNMENT',
                  value: assignmentScore.toString(),
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildGradeItem(
                  label: 'MID EXAM',
                  value: midExamScore.toString(),
                  color: AppColors.primary,
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          Row(
            children: [
              Expanded(
                child: _buildGradeItem(
                  label: 'FINAL EXAM',
                  value: finalExamScore.toString(),
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildGradeItem(
                  label: 'ATTENDANCE',
                  value: '$attendanceRate%',
                  color: const Color(0xFF22C55E), // Green
                ),
              ),
            ],
          ),

          const SizedBox(height: 24),

          // Divider
          Divider(height: 1, thickness: 1, color: Colors.grey.shade100),

          const SizedBox(height: 16),

          // Overall Average
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Overall Average',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  overallAverage.toStringAsFixed(1),
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGradeItem({
    required String label,
    required String value,
    required Color color,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: Colors.grey.shade500,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: color,
            height: 1.0,
          ),
        ),
      ],
    );
  }
}
