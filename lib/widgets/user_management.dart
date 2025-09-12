import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class UserManagement extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ListTile(
          title: Text('Create User'),
          onTap: () {
            // TODO: Implement user creation
            showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: Text('Create User'),
                content: Text('User creation functionality to be implemented.'),
                actions: <Widget>[
                  TextButton(
                    child: Text('Okay'),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                    },
                  )
                ],
              ),
            );
          },
        ),
        ListTile(
          title: Text('Edit User'),
          onTap: () {
            // TODO: Implement user editing
            showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: Text('Edit User'),
                content: Text('User editing functionality to be implemented.'),
                actions: <Widget>[
                  TextButton(
                    child: Text('Okay'),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                    },
                  )
                ],
              ),
            );
          },
        ),
        ListTile(
          title: Text('Delete User'),
          onTap: () {
            // TODO: Implement user deletion
            showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: Text('Delete User'),
                content: Text('User deletion functionality to be implemented.'),
                actions: <Widget>[
                  TextButton(
                    child: Text('Okay'),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                    },
                  )
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

