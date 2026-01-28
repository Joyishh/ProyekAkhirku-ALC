import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import 'learningprogres_student_list.dart';

class LearningProgressModalEdit extends StatefulWidget {
  final StudentGradeModel student;
  final String className;
  final void Function(StudentGradeModel updatedStudent)? onSave;

  const LearningProgressModalEdit({
    super.key,
    required this.student,
    required this.className,
    this.onSave,
  });

  @override
  State<LearningProgressModalEdit> createState() =>
      _LearningProgressModalEditState();
}

class _LearningProgressModalEditState extends State<LearningProgressModalEdit> {
  late TextEditingController _assignmentController;
  late TextEditingController _midExamController;
  late TextEditingController _finalExamController;

  @override
  void initState() {
    super.initState();
    _assignmentController = TextEditingController(
      text: widget.student.assignmentScore?.toString() ?? '',
    );
    _midExamController = TextEditingController(
      text: widget.student.midExamScore?.toString() ?? '',
    );
    _finalExamController = TextEditingController(
      text: widget.student.finalExamScore?.toString() ?? '',
    );

    // Add listeners for auto-calculation
    _assignmentController.addListener(_calculateAverage);
    _midExamController.addListener(_calculateAverage);
    _finalExamController.addListener(_calculateAverage);
  }

  @override
  void dispose() {
    _assignmentController.dispose();
    _midExamController.dispose();
    _finalExamController.dispose();
    super.dispose();
  }

  double? _overallAverage;

  void _calculateAverage() {
    final assignment = int.tryParse(_assignmentController.text);
    final midExam = int.tryParse(_midExamController.text);
    final finalExam = int.tryParse(_finalExamController.text);

    List<int> scores = [];
    if (assignment != null) scores.add(assignment);
    if (midExam != null) scores.add(midExam);
    if (finalExam != null) scores.add(finalExam);

    setState(() {
      if (scores.isNotEmpty) {
        _overallAverage = scores.reduce((a, b) => a + b) / scores.length;
      } else {
        _overallAverage = null;
      }
    });
  }

  void _handleSave() {
    final updatedStudent = StudentGradeModel(
      id: widget.student.id,
      name: widget.student.name,
      studentId: widget.student.studentId,
      assignmentScore: int.tryParse(_assignmentController.text),
      midExamScore: int.tryParse(_midExamController.text),
      finalExamScore: int.tryParse(_finalExamController.text),
      attendanceRate: widget.student.attendanceRate,
      averageScore: _overallAverage,
    );

    widget.onSave?.call(updatedStudent);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    // Initialize average on first build
    if (_overallAverage == null && widget.student.averageScore != null) {
      _overallAverage = widget.student.averageScore;
    }

    return Dialog(
      insetPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 400),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header Section (Blue)
            _buildHeader(),

            // Body Section
            Flexible(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Academic Scores Title
                    _buildSectionTitle(),

                    const SizedBox(height: 20),

                    // Input Grid
                    _buildInputGrid(),

                    const SizedBox(height: 20),

                    // Overall Average Section
                    _buildAverageSection(),

                    const SizedBox(height: 24),

                    // Action Buttons
                    _buildActionButtons(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 16, 12, 16),
      decoration: const BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(16),
          topRight: Radius.circular(16),
        ),
      ),
      child: Row(
        children: [
          // Avatar placeholder
          const SizedBox(width: 12),

          // Student Info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.student.name,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${widget.student.studentId} • ${widget.className}',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.white.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),

          // Close buttons
          IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: const Icon(Icons.close, color: Colors.white),
            iconSize: 24,
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle() {
    return Row(
      children: [
        Icon(
          Icons.assignment_outlined,
          size: 20,
          color: Colors.grey.shade600,
        ),
        const SizedBox(width: 8),
        Text(
          'ACADEMIC SCORES',
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: Colors.grey.shade600,
            letterSpacing: 1,
          ),
        ),
      ],
    );
  }

  Widget _buildInputGrid() {
    return Column(
      children: [
        // Row 1: Assignment & Mid Exam
        Row(
          children: [
            Expanded(
              child: _buildScoreInput(
                label: 'ASSIGNMENT',
                controller: _assignmentController,
                isEditable: true,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildScoreInput(
                label: 'MID EXAM',
                controller: _midExamController,
                isEditable: true,
              ),
            ),
          ],
        ),

        const SizedBox(height: 16),

        // Row 2: Final Exam & Attendance
        Row(
          children: [
            Expanded(
              child: _buildScoreInput(
                label: 'FINAL EXAM',
                controller: _finalExamController,
                isEditable: true,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildAttendanceField(),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildScoreInput({
    required String label,
    required TextEditingController controller,
    required bool isEditable,
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
        Container(
          decoration: BoxDecoration(
            color: Colors.grey.shade50,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: TextField(
            controller: controller,
            enabled: isEditable,
            keyboardType: TextInputType.number,
            textAlign: TextAlign.left,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
            ),
            decoration: const InputDecoration(
              contentPadding:
                  EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              border: InputBorder.none,
              hintText: '-',
              hintStyle: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAttendanceField() {
    final attendanceValue = widget.student.attendanceRate != null
        ? '${(widget.student.attendanceRate! * 100).toInt()}%'
        : '-';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'ATTENDANCE',
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: Colors.grey.shade500,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            color: Colors.grey.shade100,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                attendanceValue,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.green.shade600,
                ),
              ),
              Icon(
                Icons.lock_outline,
                size: 18,
                color: Colors.grey.shade400,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildAverageSection() {
    final averageDisplay = _overallAverage != null
        ? _overallAverage!.toInt().toString()
        : '-';

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              Icons.bar_chart_rounded,
              color: AppColors.primary,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          const Text(
            'Overall Average',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppColors.textPrimary,
            ),
          ),
          const Spacer(),
          Text(
            averageDisplay,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons() {
    return Row(
      children: [
        // Cancel Button
        Expanded(
          child: OutlinedButton(
            onPressed: () => Navigator.of(context).pop(),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14),
              side: BorderSide(color: Colors.grey.shade300),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              'Close',
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
          ),
        ),

        const SizedBox(width: 12),

        // Save Button
        Expanded(
          child: ElevatedButton.icon(
            onPressed: _handleSave,
            icon: const Icon(Icons.save_outlined, size: 20, color: Colors.white,),
            label: const Text(
              'Save Grades',
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 14),
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ============================================================================
// HELPER FUNCTION TO SHOW MODAL
// ============================================================================

Future<void> showEditGradeModal({
  required BuildContext context,
  required StudentGradeModel student,
  required String className,
  void Function(StudentGradeModel updatedStudent)? onSave,
}) {
  return showDialog(
    context: context,
    barrierDismissible: true,
    builder: (context) => LearningProgressModalEdit(
      student: student,
      className: className,
      onSave: onSave,
    ),
  );
}
