import 'package:flutter/material.dart';
import '../theme/app_colors.dart'; // Pastikan path ini sesuai dengan projectmu

// Enum untuk menentukan variasi kartu
enum ClassCardType {
  myClass,          // Tampil lengkap (Attendance + Next Class)
  learningProgress, // Tampil Grading Progress saja
  schedule,         // Footer hilang (Hanya info kelas)
}

class ClassCard extends StatelessWidget {
  // --- Configuration ---
  final ClassCardType type;
  final VoidCallback? onTap;
  final bool showProgress; // Control visibility of progress section

  // --- Data ---
  final String title;
  final String subtitle;
  final bool isActive; // Untuk badge "Active"
  
  // --- Grid Info Data ---
  final String days;         // "Mon, Wed"
  final String time;         // "10:00 - 12:00"
  final String room;         // "Room 101"
  final String totalStudents;// "12 Students"

  // --- Footer Data (Opsional) ---
  final double progressValue; // 0.0 sampai 1.0 (Contoh: 0.95 untuk 95%)
  final String? nextClassInfo; // Hanya muncul di tipe myClass

  const ClassCard({
    super.key,
    required this.type,
    this.onTap,
    this.showProgress = true,
    required this.title,
    required this.subtitle,
    this.isActive = true,
    required this.days,
    required this.time,
    required this.room,
    required this.totalStudents,
    this.progressValue = 0,
    this.nextClassInfo,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16), // Spasi antar kartu
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16), // Rounded-xl (~16px)
        border: Border.all(color: Colors.grey.shade200), // Border-gray-100
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03), // Shadow-sm (halus)
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding: const EdgeInsets.all(16.0), // p-4
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1. HEADER SECTION (Badge & Chevron)
                _buildHeader(),
                
                const SizedBox(height: 12),
                
                // 2. TITLE SECTION
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18, // text-lg
                    fontWeight: FontWeight.bold,
                    color: Colors.black87, // text-primary-light
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 12, // text-xs
                    color: Colors.grey.shade500, // text-secondary-light
                  ),
                ),

                const SizedBox(height: 16),

                // 3. GRID INFO SECTION (2 Kolom)
                _buildInfoGrid(),

                // 4. FOOTER SECTION (Dinamis based on Enum)
                if (showProgress && type != ClassCardType.schedule) 
                   _buildFooter(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // --- Widget Builders ---

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // Badge Active
        if (isActive)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFFD1FAE5), // bg-emerald-100
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.check_circle, 
                  size: 14, 
                  color: Color(0xFF047857), // text-emerald-700
                ),
                const SizedBox(width: 4),
                const Text(
                  "Active",
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF047857),
                  ),
                ),
              ],
            ),
          )
        else
          // Placeholder jika tidak active agar layout tidak loncat (opsional)
          const SizedBox(),

        // Chevron Icon
        Icon(
          Icons.chevron_right,
          color: Colors.grey.shade300,
        ),
      ],
    );
  }

  Widget _buildInfoGrid() {
    // Kita pakai Column + Row manual daripada GridView agar sizing-nya pas
    return Column(
      children: [
        Row(
          children: [
            // Kolom 1 Baris 1: Hari (Calendar)
            Expanded(
              child: _buildIconText(
                Icons.calendar_today_outlined, 
                days, 
                AppColors.primary, // Icon Primary Blue
              ),
            ),
            // Kolom 2 Baris 1: Jam (Schedule)
            Expanded(
              child: _buildIconText(
                Icons.schedule, 
                time, 
                AppColors.primary, // Icon Primary Blue
              ),
            ),
          ],
        ),
        const SizedBox(height: 12), // Gap antar baris
        Row(
          children: [
            // Kolom 1 Baris 2: Ruangan (Location)
            Expanded(
              child: _buildIconText(
                Icons.location_on_outlined, 
                room, 
                Colors.orange, // Icon Orange
              ),
            ),
            // Kolom 2 Baris 2: Students (People)
            Expanded(
              child: _buildIconText(
                Icons.people_outline, 
                totalStudents, 
                Colors.blue, // Icon Blue
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildIconText(IconData icon, String text, Color iconColor) {
    return Row(
      children: [
        Icon(icon, size: 16, color: iconColor),
        const SizedBox(width: 8),
        Text(
          text,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade600, // text-secondary-light
          ),
        ),
      ],
    );
  }

  Widget _buildFooter() {
    // Tentukan Label & Warna berdasarkan Tipe
    String label;
    Color color;

    if (type == ClassCardType.myClass) {
      label = "Attendance Rate";
      color = const Color(0xFF10B981); // Emerald-500
    } else {
      label = "Grading Progress";
      color = AppColors.primary; // Blue untuk progress belajar
    }

    return Column(
      children: [
        const SizedBox(height: 12),
        Divider(color: Colors.grey.shade100, thickness: 1), // Border-t
        const SizedBox(height: 12),
        
        // Progress Label & Percent
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade600,
              ),
            ),
            Text(
              "${(progressValue * 100).toInt()}%",
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: type == ClassCardType.myClass 
                    ? const Color(0xFF059669) // Emerald-600
                    : AppColors.primary,
              ),
            ),
          ],
        ),
        
        const SizedBox(height: 6),
        
        // Progress Bar
        ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: LinearProgressIndicator(
            value: progressValue,
            minHeight: 6,
            backgroundColor: Colors.grey.shade100,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),

        // Next Class Info (Hanya untuk MyClass)
        if (type == ClassCardType.myClass && nextClassInfo != null) 
          Padding(
            padding: const EdgeInsets.only(top: 8.0),
            child: Row(
              children: [
                Icon(Icons.event_available, size: 14, color: Colors.grey.shade400),
                const SizedBox(width: 4),
                Text(
                  nextClassInfo!,
                  style: TextStyle(
                    fontSize: 10,
                    color: Colors.grey.shade500,
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}