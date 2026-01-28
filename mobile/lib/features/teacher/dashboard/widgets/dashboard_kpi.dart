import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class DashboardKPI extends StatelessWidget {
  const DashboardKPI({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _KPICard(
            icon: Icons.class_outlined,
            iconBackgroundColor: AppColors.primary.withOpacity(0.1),
            iconColor: AppColors.primary,
            label: 'My Classes',
            value: '6',
            subtitle: '3 classes today',
          ),
          const SizedBox(width: 12),
          _KPICard(
            icon: Icons.groups_outlined,
            iconBackgroundColor: Colors.orange.shade50,
            iconColor: Colors.orange,
            label: 'Total Students',
            value: '87',
            subtitle: '+5 new this month',
            subtitleIcon: Icons.arrow_upward,
            subtitleColor: Colors.green,
          ),
          const SizedBox(width: 12),
          _KPICard(
            icon: Icons.fact_check_outlined,
            iconBackgroundColor: Colors.green.shade50,
            iconColor: Colors.green,
            label: 'Attendance Rate',
            value: '92%',
            subtitle: '+3% from last week',
            subtitleIcon: Icons.arrow_upward,
            subtitleColor: Colors.green,
          ),
        ],
      ),
    );
  }
}

class _KPICard extends StatelessWidget {
  final IconData icon;
  final Color iconBackgroundColor;
  final Color iconColor;
  final String label;
  final String value;
  final String subtitle;
  final IconData? subtitleIcon;
  final Color? subtitleColor;

  const _KPICard({
    required this.icon,
    required this.iconBackgroundColor,
    required this.iconColor,
    required this.label,
    required this.value,
    required this.subtitle,
    this.subtitleIcon,
    this.subtitleColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade100),
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
          // Icon Container
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: iconBackgroundColor,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              color: iconColor,
              size: 24,
            ),
          ),

          const SizedBox(height: 16),

          // Label
          Text(
            label,
            style: TextStyle(
              fontSize: 13,
              color: Colors.grey.shade600,
              fontWeight: FontWeight.w500,
            ),
          ),

          const SizedBox(height: 4),

          // Value
          Text(
            value,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),

          const SizedBox(height: 8),

          // Subtitle
          Row(
            children: [
              if (subtitleIcon != null) ...[
                Icon(
                  subtitleIcon,
                  size: 14,
                  color: subtitleColor ?? Colors.grey.shade500,
                ),
                const SizedBox(width: 2),
              ],
              Expanded(
                child: Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 11,
                    color: subtitleColor ?? Colors.grey.shade500,
                    fontWeight: subtitleIcon != null ? FontWeight.w500 : FontWeight.normal,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
