import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

/// Enum untuk status kehadiran
enum AttendanceSessionStatus { present, absent, late, excused }

/// Model data untuk session attendance
class AttendanceSessionData {
  final String sessionName;
  final String date;
  final String checkInTime;
  final AttendanceSessionStatus status;

  AttendanceSessionData({
    required this.sessionName,
    required this.date,
    required this.checkInTime,
    required this.status,
  });
}

/// Widget kartu untuk menampilkan riwayat kehadiran
class AttendanceHistoryCard extends StatelessWidget {
  final String title;
  final List<AttendanceSessionData> sessions;
  final Function(AttendanceSessionData)? onTap;
  final VoidCallback? onViewAll;

  const AttendanceHistoryCard({
    super.key,
    this.title = "Attendance History",
    required this.sessions,
    this.onTap,
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
          ),

          Divider(height: 1, thickness: 1, color: Colors.grey.shade100),

          // --- LIST ITEMS (SCROLLABLE AREA) ---
          LayoutBuilder(
            builder: (context, constraints) {
              // Jika data sedikit (≤3), tampilkan biasa (tidak scrollable)
              if (sessions.length <= 3) {
                return Column(
                  children: [
                    for (int i = 0; i < sessions.length; i++) ...[
                      if (i != 0)
                        Divider(height: 1, thickness: 1, color: Colors.grey.shade100),
                      _AttendanceSessionTile(
                        sessionName: sessions[i].sessionName,
                        date: sessions[i].date,
                        checkInTime: sessions[i].checkInTime,
                        status: sessions[i].status,
                        onTap: onTap != null ? () => onTap!(sessions[i]) : null,
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
                    itemCount: sessions.length,
                    separatorBuilder: (context, index) => Divider(
                      height: 1,
                      thickness: 1,
                      color: Colors.grey.shade100,
                    ),
                    itemBuilder: (context, index) {
                      final session = sessions[index];
                      return _AttendanceSessionTile(
                        sessionName: session.sessionName,
                        date: session.date,
                        checkInTime: session.checkInTime,
                        status: session.status,
                        onTap: onTap != null ? () => onTap!(session) : null,
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

/// Private widget untuk Tile session
class _AttendanceSessionTile extends StatelessWidget {
  final String sessionName;
  final String date;
  final String checkInTime;
  final AttendanceSessionStatus status;
  final VoidCallback? onTap;

  const _AttendanceSessionTile({
    required this.sessionName,
    required this.date,
    required this.checkInTime,
    required this.status,
    this.onTap,
  });

  Color _getStatusColor(AttendanceSessionStatus status) {
    switch (status) {
      case AttendanceSessionStatus.present:
        return const Color(0xFF22C55E); // Green
      case AttendanceSessionStatus.late:
        return const Color(0xFFF59E0B); // Orange
      case AttendanceSessionStatus.absent:
        return const Color(0xFFEF4444); // Red
      case AttendanceSessionStatus.excused:
        return const Color(0xFF3B82F6); // Blue
    }
  }

  String _getStatusLabel(AttendanceSessionStatus status) {
    switch (status) {
      case AttendanceSessionStatus.present:
        return 'Present';
      case AttendanceSessionStatus.late:
        return 'Late';
      case AttendanceSessionStatus.absent:
        return 'Absent';
      case AttendanceSessionStatus.excused:
        return 'Excused';
    }
  }

  IconData _getStatusIcon(AttendanceSessionStatus status) {
    switch (status) {
      case AttendanceSessionStatus.present:
        return Icons.check_circle_outline;
      case AttendanceSessionStatus.late:
        return Icons.schedule;
      case AttendanceSessionStatus.absent:
        return Icons.cancel_outlined;
      case AttendanceSessionStatus.excused:
        return Icons.info_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    final statusColor = _getStatusColor(status);

    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            // Left: Session Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    sessionName,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(
                        Icons.calendar_today_outlined,
                        size: 14,
                        color: Colors.grey.shade500,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        date,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey.shade500,
                        ),
                      ),
                      if (checkInTime.isNotEmpty && checkInTime != '-') ...[
                        Container(
                          margin: const EdgeInsets.symmetric(horizontal: 8),
                          width: 4,
                          height: 4,
                          decoration: BoxDecoration(
                            color: Colors.grey.shade400,
                            shape: BoxShape.circle,
                          ),
                        ),
                        Icon(
                          Icons.access_time,
                          size: 14,
                          color: Colors.grey.shade500,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          checkInTime,
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.grey.shade500,
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),

            // Right: Status Badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: statusColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    _getStatusIcon(status),
                    size: 16,
                    color: statusColor,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    _getStatusLabel(status),
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: statusColor,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
