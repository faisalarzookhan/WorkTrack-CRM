import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class UserProfileWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AuthProvider>(context).user;

    return PopupMenuButton<String>(
      onSelected: (value) {
        if (value == 'logout') {
          Provider.of<AuthProvider>(context, listen: false).logout();
          Navigator.pushReplacementNamed(context, '/login');
        }
      },
      itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
        PopupMenuItem<String>(
          value: 'profile',
          child: Text('Profile'),
        ),
        PopupMenuItem<String>(
          value: 'logout',
          child: Text('Logout'),
        ),
      ],
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: CircleAvatar(
          backgroundImage: NetworkImage(user?.profilePicture ?? 'https://via.placeholder.com/150'),
        ),
      ),
    );
  }
}
