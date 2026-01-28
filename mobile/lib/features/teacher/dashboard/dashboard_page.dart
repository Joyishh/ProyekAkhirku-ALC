import 'package:flutter/material.dart';
import '../../../core/layout/main_layout.dart';
import 'widgets/dashboard_kpi.dart';
import 'widgets/dashboard_today_classes.dart';

class TeacherDashboardPage extends StatelessWidget {
  const TeacherDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.teacher,
      headerMode: HeaderMode.overview,
      title: 'Bayu Ramadany',
      subtitle: 'Welcome back!',
      activeTab: 0,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // KPI Cards Section
            const DashboardKPI(),

            const SizedBox(height: 24),

            // Today's Classes Section
            DashboardTodayClasses(
              onAttendanceTap: () {
                // TODO: Navigate to attendance page
                debugPrint('Attendance tapped');
              },
            ),
          ],
        ),
      ),
    );
  }
}