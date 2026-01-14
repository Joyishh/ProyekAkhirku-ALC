import 'package:flutter/material.dart';
import '../theme/app_colors.dart'; // Pastikan path ini benar

class ClassDetailInfoCard extends StatelessWidget {
  final String schedule; // e.g. "Mon, Wed"
  final String time;     // e.g. "10:00 - 12:00"
  final String room;     // e.g. "Room 101"
  final String students; // e.g. "24 Total"

  const ClassDetailInfoCard({
    super.key,
    required this.schedule,
    required this.time,
    required this.room,
    required this.students,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16), // p-4
      decoration: BoxDecoration(
        color: Colors.white, // bg-card-light
        borderRadius: BorderRadius.circular(12), // rounded-xl
        border: Border.all(color: Colors.grey.shade100), // border-gray-100
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05), // shadow-sm
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // --- HEADER SECTION ---
          Row(
            children: [
              Icon(
                Icons.info_outline_rounded, // material-symbols: info
                color: AppColors.primary, // text-primary
                size: 20, // text-xl (~20px)
              ),
              const SizedBox(width: 8), // gap-2
              const Text(
                "Class Details",
                style: TextStyle(
                  fontSize: 16, // text-base
                  fontWeight: FontWeight.w600, // font-semibold
                  color: Colors.black87,
                ),
              ),
            ],
          ),
          
          const SizedBox(height: 16), // mb-4 (di HTML ada margin bawah header)

          // --- GRID SECTION ---
          // Kita pakai Column + Row untuk meniru grid-cols-2 gap-4
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Kolom Kiri
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildDetailItem(
                      Icons.calendar_today_rounded, 
                      "SCHEDULE", 
                      schedule
                    ),
                    const SizedBox(height: 16), // gap-4 (vertical)
                    _buildDetailItem(
                      Icons.meeting_room_rounded, 
                      "ROOM", 
                      room
                    ),
                  ],
                ),
              ),
              
              const SizedBox(width: 16), // gap-4 (horizontal)

              // Kolom Kanan
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildDetailItem(
                      Icons.schedule_rounded, 
                      "TIME", 
                      time
                    ),
                    const SizedBox(height: 16), // gap-4 (vertical)
                    _buildDetailItem(
                      Icons.groups_rounded, 
                      "STUDENTS", 
                      students
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDetailItem(IconData icon, String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Label Row
        Row(
          children: [
            Icon(
              icon, 
              size: 16, // text-base (~16px)
              color: Colors.grey.shade400, // text-text-sub-light (kurang lebih abu muda)
            ),
            const SizedBox(width: 6), // gap-1.5
            Text(
              label,
              style: TextStyle(
                fontSize: 10, // text-xs
                fontWeight: FontWeight.w500, // font-medium
                color: Colors.grey.shade500, // text-text-sub-light
                letterSpacing: 1.0, // tracking-wider
              ),
            ),
          ],
        ),
        
        const SizedBox(height: 4), // space-y-1 (jarak dikit ke value)

        // Value Text
        Padding(
          padding: const EdgeInsets.only(left: 22.0), // pl-6 (padding left)
          // 22px didapat dari size icon (16) + gap (6) agar rata kiri dengan teks label
          child: Text(
            value,
            style: const TextStyle(
              fontSize: 14, // text-sm
              fontWeight: FontWeight.w600, // font-semibold
              color: Colors.black87,
            ),
          ),
        ),
      ],
    );
  }
}