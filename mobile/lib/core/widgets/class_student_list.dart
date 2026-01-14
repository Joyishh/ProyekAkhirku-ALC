import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

// Enum tetap kita simpan untuk masa depan
enum StudentStatus { present, absent, late, permission }

class ClassStudentList extends StatelessWidget {
  final String name;
  final String id; // Misal: "ID: STU001"
  final String imageUrl;
  final double attendanceRate; // 0.0 - 1.0 (Penting!)
  
  // Opsional: Hanya pakai jika API sudah siap/efisien
  final StudentStatus? latestStatus; 
  final String? latestStatusDate; // Misal: "Jan 15"
  
  final VoidCallback? onTap;

  const ClassStudentList({
    super.key,
    required this.name,
    required this.id,
    required this.imageUrl,
    required this.attendanceRate,
    this.latestStatus, 
    this.latestStatusDate,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // Logic Warna Progress Bar: Hijau (>90%), Kuning (>75%), Merah (<75%)
    final Color progressColor = attendanceRate >= 0.9 
        ? const Color(0xFF22C55E) 
        : (attendanceRate >= 0.75 ? Colors.orange : Colors.red);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
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
      child: InkWell(
        onTap: onTap,
        child: Row(
          children: [
            // 1. AVATAR
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.grey.shade200),
                image: DecorationImage(
                  image: NetworkImage(imageUrl), 
                  fit: BoxFit.cover,
                ),
              ),
            ),
            
            const SizedBox(width: 12),
            
            // 2. INFO SISWA & PROGRESS
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Colors.black87,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    id,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey.shade500,
                    ),
                  ),
                  
                  const SizedBox(height: 8),

                  // Progress Bar & Percentage
                  Row(
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: LinearProgressIndicator(
                            value: attendanceRate,
                            backgroundColor: Colors.grey.shade100,
                            valueColor: AlwaysStoppedAnimation<Color>(progressColor),
                            minHeight: 6,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        "${(attendanceRate * 100).toInt()}%",
                        style: TextStyle(
                          fontSize: 12, // Sedikit diperbesar agar terbaca
                          fontWeight: FontWeight.bold,
                          color: progressColor,
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),

            // 3. LATEST STATUS (Hanya muncul jika datanya ada)
            if (latestStatus != null && latestStatusDate != null)
              Padding(
                padding: const EdgeInsets.only(left: 12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    _buildStatusBadge(latestStatus!),
                    const SizedBox(height: 4),
                    Text(
                      latestStatusDate!,
                      style: TextStyle(
                        fontSize: 10,
                        color: Colors.grey.shade400,
                      ),
                    ),
                  ],
                ),
              )
          ],
        ),
      ),
    );
  }

  // Helper badge (sama seperti sebelumnya, disimpan untuk jaga-jaga)
  Widget _buildStatusBadge(StudentStatus status) {
     String label;
    Color bgColor;
    Color textColor;

    switch (status) {
      case StudentStatus.present:
        label = "Present";
        bgColor = const Color(0xFFDCFCE7); // green-100
        textColor = const Color(0xFF15803D); // green-700
        break;
      case StudentStatus.absent:
        label = "Absent";
        bgColor = const Color(0xFFFEE2E2); // red-100
        textColor = const Color(0xFFB91C1C); // red-700
        break;
      case StudentStatus.late:
        label = "Late";
        bgColor = const Color(0xFFFEF9C3); // yellow-100
        textColor = const Color(0xFFA16207); // yellow-700
        break;
      default:
        label = "-";
        bgColor = Colors.grey.shade100;
        textColor = Colors.grey;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        label.toUpperCase(),
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.bold,
          color: textColor,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}