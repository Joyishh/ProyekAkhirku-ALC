import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

// ============================================================================
// DATA MODEL
// ============================================================================

class StudentGradeModel {
  final String id;
  final String name;
  final String studentId;
  final double? averageScore;
  final int? assignmentScore;
  final int? midExamScore;
  final int? finalExamScore;
  final double? attendanceRate;

  const StudentGradeModel({
    required this.id,
    required this.name,
    required this.studentId,
    this.averageScore,
    this.assignmentScore,
    this.midExamScore,
    this.finalExamScore,
    this.attendanceRate,
  });

  bool get isGraded =>
      assignmentScore != null ||
      midExamScore != null ||
      finalExamScore != null;
}

// ============================================================================
// MAIN LIST WIDGET
// ============================================================================

class LearningProgressStudentList extends StatelessWidget {
  final List<StudentGradeModel> students;
  final void Function(StudentGradeModel student)? onEditTap;
  final int totalStudents;
  final int gradedCount;

  const LearningProgressStudentList({
    super.key,
    required this.students,
    this.onEditTap,
    this.totalStudents = 0,
    this.gradedCount = 0,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Section Header
        _buildSectionHeader(),
        const SizedBox(height: 16),

        // Student Cards
        ...students.map(
          (student) => _StudentGradeCard(
            student: student,
            onEditTap: onEditTap != null ? () => onEditTap!(student) : null,
          ),
        ),
      ],
    );
  }

  Widget _buildSectionHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'Student List',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        if (totalStudents > 0)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              '$gradedCount/$totalStudents Graded',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: AppColors.primary,
              ),
            ),
          ),
      ],
    );
  }
}

// ============================================================================
// PRIVATE STUDENT CARD WIDGET
// ============================================================================

class _StudentGradeCard extends StatelessWidget {
  final StudentGradeModel student;
  final VoidCallback? onEditTap;

  const _StudentGradeCard({
    required this.student,
    this.onEditTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Row: Student Info + Actions
          _buildHeaderRow(),

          const SizedBox(height: 16),

          // Bottom Section: Stats Grid
          _buildStatsGrid(),
        ],
      ),
    );
  }

  Widget _buildHeaderRow() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Left: Avatar placeholder + Student Info
        const SizedBox(width: 12),

        // Student Name & ID
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                student.name,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                'ID: ${student.studentId}',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey.shade500,
                ),
              ),
              const SizedBox(height: 4),
              // Average Badge
              _buildAverageBadge(),
            ],
          ),
        ),

        // Right: Edit Button
        InkWell(
          onTap: onEditTap,
          borderRadius: BorderRadius.circular(8),
          child: Padding(
            padding: const EdgeInsets.all(8),
            child: Icon(
              Icons.edit_note_outlined,
              color: AppColors.primary,
              size: 24,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAverageBadge() {
    final bool hasAverage = student.averageScore != null;
    final String text =
        hasAverage ? 'Avg: ${student.averageScore!.toInt()}' : 'Not Graded';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: hasAverage ? Colors.green.shade50 : Colors.grey.shade100,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: hasAverage ? Colors.green.shade700 : Colors.grey.shade600,
        ),
      ),
    );
  }

  Widget _buildStatsGrid() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          // Row 1: Assignment & Mid Exam
          Row(
            children: [
              Expanded(
                child: _StatItem(
                  label: 'ASSIGNMENT',
                  value: student.assignmentScore?.toString() ?? '-',
                  valueColor: AppColors.primary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _StatItem(
                  label: 'MID EXAM',
                  value: student.midExamScore?.toString() ?? '-',
                  valueColor: AppColors.primary,
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Row 2: Final Exam & Attendance
          Row(
            children: [
              Expanded(
                child: _StatItem(
                  label: 'FINAL EXAM',
                  value: student.finalExamScore?.toString() ?? '-',
                  valueColor: AppColors.primary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _StatItem(
                  label: 'ATTENDANCE',
                  value: student.attendanceRate != null
                      ? '${(student.attendanceRate! * 100).toInt()}%'
                      : '-',
                  valueColor: Colors.green.shade600,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// STAT ITEM WIDGET
// ============================================================================

class _StatItem extends StatelessWidget {
  final String label;
  final String value;
  final Color valueColor;

  const _StatItem({
    required this.label,
    required this.value,
    required this.valueColor,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w600,
            color: Colors.grey.shade500,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: valueColor,
          ),
        ),
      ],
    );
  }
}
