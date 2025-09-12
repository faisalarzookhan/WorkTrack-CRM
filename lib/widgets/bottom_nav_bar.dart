import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class BottomNavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final userRole = authProvider.userRole;

    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      items: <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.timer),
          label: 'Timesheet',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.business),
          label: 'Department',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.account_balance),
          label: 'Account',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.assessment),
          label: 'Reports',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.support),
          label: 'Support',
        ),
        if (userRole == 'admin')
          BottomNavigationBarItem(
            icon: Icon(Icons.admin_panel_settings),
            label: 'Admin',
          ),
      ],
      onTap: (index) {
        switch (index) {
          case 0:
            Navigator.of(context).pushReplacementNamed('/home');
            break;
          case 1:
            Navigator.of(context).pushReplacementNamed('/timesheet');
            break;
          case 2:
            Navigator.of(context).pushReplacementNamed('/department');
            break;
          case 3:
            Navigator.of(context).pushReplacementNamed('/account');
            break;
          case 4:
            Navigator.of(context).pushReplacementNamed('/reports');
            break;
          case 5:
            Navigator.of(context).pushReplacementNamed('/ticketing');
            break;
          case 6:
            if (userRole == 'admin') {
              Navigator.of(context).pushReplacementNamed('/admin');
            }
            break;
        }
      },
    );
  }
}

