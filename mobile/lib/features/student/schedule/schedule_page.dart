import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';

class StudentSchedulePage extends StatelessWidget {
  const StudentSchedulePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      userRole: UserRole.student,
      headerMode: HeaderMode.overview, 
      title: 'My Schedule',
      subtitle: 'Your upcoming classes',
      activeTab: 3,

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(height: 100, color: Colors.blue[100], child: const Center(child: Text("Module Statistic"))),
            const SizedBox(height: 16),
            Container(height: 300, color: Colors.orange[100], child: const Center(child: Text("Module Schedule"))),
          ],
        ),
      ),
    );
  }
}