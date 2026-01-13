import 'package:flutter/material.dart';
import 'header.dart';
import 'bottom_navbar.dart';

enum HeaderMode { overview, detail }

class MainLayout extends StatelessWidget {
  final Widget body;
  
  // Header Props
  final HeaderMode headerMode;
  final String title;
  final String subtitle;
  
  // Nav Props
  final int activeTab;

  const MainLayout({
    super.key,
    required this.body,
    this.headerMode = HeaderMode.overview,
    required this.title,
    required this.subtitle,
    required this.activeTab,
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
          // Logic navigasi sederhana
          // Nanti bisa diganti dengan GoRouter atau logic navigasi lainnya
          debugPrint("Navigasi ke tab: $index");
        },
      ),
    );
  }
}