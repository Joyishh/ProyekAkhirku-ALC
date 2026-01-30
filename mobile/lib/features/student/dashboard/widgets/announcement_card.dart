import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

enum AnnouncementType { info, warning, important }

class AnnouncementCard extends StatelessWidget {
  final String title;
  final String description;
  final AnnouncementType type;
  final VoidCallback? onTap;

  const AnnouncementCard({
    super.key,
    required this.title,
    required this.description,
    this.type = AnnouncementType.info,
    this.onTap,
  });

  Color get _badgeColor {
    switch (type) {
      case AnnouncementType.info:
        return AppColors.primary;
      case AnnouncementType.warning:
        return const Color(0xFFF59E0B);
      case AnnouncementType.important:
        return const Color(0xFFEF4444);
    }
  }

  String get _badgeText {
    switch (type) {
      case AnnouncementType.info:
        return 'Info';
      case AnnouncementType.warning:
        return 'Warning';
      case AnnouncementType.important:
        return 'Important';
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 260,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Type Badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: _badgeColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(width: 4),
                  Text(
                    _badgeText,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: _badgeColor,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 12),

            // Title
            Text(
              title,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),

            const SizedBox(height: 8),

            // Description
            Text(
              description,
              style: TextStyle(
                fontSize: 13,
                color: Colors.grey.shade600,
                height: 1.4,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
