import 'package:flutter/material.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/user_management.dart';
import '../widgets/equipment_management.dart';
import '../widgets/driver_management.dart';

class AdminPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Admin Panel'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Users'),
              Tab(text: 'Equipment'),
              Tab(text: 'Drivers'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            UserManagement(),
            EquipmentManagement(),
            DriverManagement(),
          ],
        ),
        bottomNavigationBar: BottomNavBar(),
      ),
    );
  }
}

