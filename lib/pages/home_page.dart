import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/notification_provider.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/user_profile_widget.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final notificationProvider = Provider.of<NotificationProvider>(context);
    final userRole = authProvider.userRole;
    final notifications = notificationProvider.notifications;

    return Scaffold(
      appBar: AppBar(
        title: Text('WorkTrack Dashboard'),
        actions: [
          IconButton(
            icon: Stack(
              children: [
                Icon(Icons.notifications),
                if (notifications.isNotEmpty)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: EdgeInsets.all(2),
                      decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      constraints: BoxConstraints(
                        minWidth: 16,
                        minHeight: 16,
                      ),
                      child: Text(
                        '${notifications.length}',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            ),
            onPressed: () {
              // TODO: Show notifications
            },
          ),
          UserProfileWidget(),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to WorkTrack!'),
            SizedBox(height: 20),
            Text('Your role: $userRole'),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text('View Timesheet'),
              onPressed: () {
                Navigator.of(context).pushNamed('/timesheet');
              },
            ),
            if (userRole == 'admin')
              ElevatedButton(
                child: Text('Admin Panel'),
                onPressed: () {
                  Navigator.of(context).pushNamed('/admin');
                },
              ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavBar(),
    );
  }
}
