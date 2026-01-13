import 'package:flutter/material.dart';
import 'header.dart';
import 'bottom_navbar.dart';
import '../../features/teacher/dashboard/dashboard_page.dart';
import '../../features/teacher/classes/classes_page.dart';
import '../../features/teacher/learningProgres/learning_progres_page.dart';
import '../../features/teacher/schedule/schedule_page.dart';
import '../../features/student/dashboard/dashboard_page.dart';
import '../../features/student/classes/classes_page.dart';
import '../../features/student/learningProgres/learining_progres_page.dart';
import '../../features/student/schedule/schedule_page.dart';

enum HeaderMode { overview, detail }

enum UserRole { teacher, student }

class MainLayout extends StatelessWidget {
  final Widget body;
  
  // Header Props
  final HeaderMode headerMode;
  final String title;
  final String subtitle;
  
  // Nav Props
  final int activeTab;
  final UserRole userRole; // Tambahan untuk role-based navigation

  const MainLayout({
    super.key,
    required this.body,
    this.headerMode = HeaderMode.overview,
    required this.title,
    required this.subtitle,
    required this.activeTab,
    this.userRole = UserRole.teacher, // Default teacher untuk backward compatibility
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC), // Warna background abu-abu muda (Slate-50)
      
      // 1. App Bar Custom (Header)
      // Kita taruh di body Column supaya scrollable content tidak menutupi header
      // Atau bisa pakai PreferredSizeWidget jika ingin fixed saat scroll.
      // Di desain ini sepertinya fixed di atas.
      body: Column(
        children: [
          // Header Area
          AppHeader(
            title: title,
            subtitle: subtitle,
            isDetailPage: headerMode == HeaderMode.detail,
          ),
          
          // Body Module (Scrollable)
          Expanded(
            child: body,
          ),
        ],
      ),

      // 2. Bottom Navigation (Docked)
      bottomNavigationBar: BottomNavbar(
        currentIndex: activeTab,
        onTap: (index) {
          if (index == activeTab) return; // Jangan navigasi jika sudah di halaman yang sama
          
          final page = _getPageByRole(userRole, index);
          if (page == null) {
            debugPrint("Page untuk role $userRole dan index $index belum dibuat");
            return;
          }
          
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              pageBuilder: (context, animation, secondaryAnimation) => page,
              transitionDuration: Duration.zero,
              reverseTransitionDuration: Duration.zero,
            ),
          );
        },
      ),
    );
  }

  // Method untuk mendapatkan halaman berdasarkan role dan index
  Widget? _getPageByRole(UserRole role, int index) {
    switch (role) {
      case UserRole.teacher:
        return _getTeacherPage(index);
      case UserRole.student:
        return _getStudentPage(index);
    }
  }

  Widget? _getTeacherPage(int index) {
    switch (index) {
      case 0:
        return const TeacherDashboardPage();
      case 1:
        return const TeacherClassesPage();
      case 2:
        return const TeacherLearningProgressPage();
      case 3:
        return const TeacherSchedulePage();
      case 4:
        // TODO: Implement Teacher Profile Page
        return null;
      default:
        return null;
    }
  }

  Widget? _getStudentPage(int index) {
    switch (index) {
      case 0:
        return const StudentDashboardPage();
      case 1:
        return const StudentClassesPage();
      case 2:
        return const StudentLearningProgressPage();
      case 3:
        return const StudentSchedulePage();
      case 4:
        // TODO: Implement Student Profile Page
        return null;
      default:
        return null;
    }
  }
}