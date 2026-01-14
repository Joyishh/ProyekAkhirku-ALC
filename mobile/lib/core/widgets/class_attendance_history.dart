import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class AttendanceHistoryCard extends StatelessWidget {
  final String title;
  final VoidCallback? onViewAll;
  final List<AttendanceHistoryItem> items;

  const AttendanceHistoryCard({
    super.key,
    this.title = "Attendance History",
    this.onViewAll,
    required this.items,
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
                    const Icon(Icons.history_edu, color: Colors.green, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
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
              // Jika data sedikit, tampilkan biasa (tidak scrollable)
              if (items.length <= 3) {
                return Column(
                  children: [
                    for (int i = 0; i < items.length; i++) ...[
                      if (i != 0)
                        Divider(height: 1, thickness: 1, color: Colors.grey.shade100),
                      items[i],
                    ]
                  ],
                );
              } else {
                // Jika data banyak, scrollable dengan tinggi max 300
                return ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 300),
                  child: ListView.separated(
                    padding: EdgeInsets.zero,
                    itemCount: items.length,
                    separatorBuilder: (context, index) => Divider(
                      height: 1,
                      thickness: 1,
                      color: Colors.grey.shade100,
                    ),
                    itemBuilder: (context, index) => items[index],
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

// --- AttendanceHistoryItem Widget
class AttendanceHistoryItem extends StatelessWidget {
  final String date;
  final String subtitle;
  final int presentCount;
  final int absentCount;
  final VoidCallback? onTap;

  const AttendanceHistoryItem({
    Key? key,
    required this.date,
    required this.subtitle,
    required this.presentCount,
    required this.absentCount,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      title: Text(date, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(subtitle),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.check_circle, color: Colors.green, size: 18),
          Text(' $presentCount  '),
          Icon(Icons.cancel, color: Colors.red, size: 18),
          Text(' $absentCount'),
        ],
      ),
    );
  }
}

// Widget AttendanceHistoryItem biarkan tetap sama seperti sebelumnya