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
  final List<ClassStudentData> students;
  final Function(ClassStudentData)? onTap;

  const ClassStudentList({
    super.key,
    required this.students,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        padding: EdgeInsets.zero,
        itemCount: students.length,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          color: Colors.grey.shade200,
        ),
        itemBuilder: (context, index) {
          final student = students[index];
          return _ClassStudentTile(
            name: student.name,
            id: student.id,
            attendanceRate: student.attendanceRate,
            onTap: () => onTap?.call(student),
          );
        },
      ),
    );
  }
}

/// Private widget untuk Tile (Baris) Siswa
class _ClassStudentTile extends StatelessWidget {
  final String name;
  final String id;
  final double attendanceRate;
  final VoidCallback? onTap;

  const _ClassStudentTile({
    required this.name,
    required this.id,
    required this.attendanceRate,
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

            // Attendance Rate
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