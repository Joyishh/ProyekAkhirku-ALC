import 'package:flutter/material.dart';
import '../../../../core/layout/main_layout.dart';

class TeacherSchedulePage extends StatelessWidget {
  const TeacherSchedulePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      headerMode: HeaderMode.overview, 
      title: 'Schedule',
      subtitle: 'Track your upcoming schedules',
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