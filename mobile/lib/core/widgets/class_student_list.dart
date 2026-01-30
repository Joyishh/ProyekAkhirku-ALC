import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

/// Model data sederhana untuk list siswa di kelas
class ClassStudentData {
  final String name;
  final String id;
  final double attendanceRate; // 0.0 - 1.0

  ClassStudentData({
    required this.name,
    required this.id,
    required this.attendanceRate,
  });
}

class ClassStudentList extends StatelessWidget {
  final String title;
  final List<ClassStudentData> students;
  final Function(ClassStudentData)? onTap;
  final bool showAttendanceRate;
  final VoidCallback? onViewAll;

  const ClassStudentList({
    super.key,
    this.title = "Students",
    required this.students,
    this.onTap,
    this.showAttendanceRate = true,
    this.onViewAll,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade100),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // --- HEADER ---
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.people_outline, color: AppColors.primary, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
                if (onViewAll != null)
                  GestureDetector(
                    onTap: onViewAll,
                    child: Text(
                      "View All",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.primary,
                      ),
                    ),
                  ),
              ],
            ),
          ),

          Divider(height: 1, thickness: 1, color: Colors.grey.shade100),

          // --- LIST ITEMS (SCROLLABLE AREA) ---
          LayoutBuilder(
            builder: (context, constraints) {
              // Jika data sedikit (≤3), tampilkan biasa (tidak scrollable)
              if (students.length <= 3) {
                return Column(
                  children: [
                    for (int i = 0; i < students.length; i++) ...[
                      if (i != 0)
                        Divider(height: 1, thickness: 1, color: Colors.grey.shade100),
                      _ClassStudentTile(
                        name: students[i].name,
                        id: students[i].id,
                        attendanceRate: students[i].attendanceRate,
                        showAttendanceRate: showAttendanceRate,
                        onTap: () => onTap?.call(students[i]),
                      ),
                    ]
                  ],
                );
              } else {
                // Jika data banyak (>3), scrollable dengan tinggi max 300
                return ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 300),
                  child: ListView.separated(
                    padding: EdgeInsets.zero,
                    itemCount: students.length,
                    separatorBuilder: (context, index) => Divider(
                      height: 1,
                      thickness: 1,
                      color: Colors.grey.shade100,
                    ),
                    itemBuilder: (context, index) {
                      final student = students[index];
                      return _ClassStudentTile(
                        name: student.name,
                        id: student.id,
                        attendanceRate: student.attendanceRate,
                        showAttendanceRate: showAttendanceRate,
                        onTap: () => onTap?.call(student),
                      );
                    },
                  ),
                );
              }
            },
          ),
        ],
      ),
    );
  }
}

/// Private widget untuk Tile (Baris) Siswa
class _ClassStudentTile extends StatelessWidget {
  final String name;
  final String id;
  final double attendanceRate;
  final bool showAttendanceRate;
  final VoidCallback? onTap;

  const _ClassStudentTile({
    required this.name,
    required this.id,
    required this.attendanceRate,
    required this.showAttendanceRate,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // Logic warna progress bar
    final Color progressColor = attendanceRate >= 0.9 
        ? const Color(0xFF22C55E) // Green
        : (attendanceRate >= 0.75 ? const Color(0xFFF59E0B) : const Color(0xFFEF4444)); // Orange / Red

    return InkWell(
      onTap: onTap,
      child: Padding(
        // Padding disamakan dengan Session Detail (horizontal 16, vertical 12)
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            // Student Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: Colors.black87, // AppColors.textPrimary
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        id,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey.shade500,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Attendance Rate (Only show if showAttendanceRate is true)
            if (showAttendanceRate)
              Row(
                children: [
                  // Text Persentase
                  Text(
                    "${(attendanceRate * 100).toInt()}%",
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: progressColor,
                    ),
                  ),
                  const SizedBox(width: 8),
                  // Progress Bar Kecil
                  SizedBox(
                    width: 60, 
                    height: 6,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: LinearProgressIndicator(   
                        value: attendanceRate,
                        backgroundColor: Colors.grey.shade100,
                        valueColor: AlwaysStoppedAnimation<Color>(progressColor),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                ],
              ),
          ],
        ),
      ),
    );
  }
}