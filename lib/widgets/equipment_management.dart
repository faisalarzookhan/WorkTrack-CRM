import 'package:flutter/material.dart';

class EquipmentManagement extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ListTile(
          title: Text('Add Equipment'),
          onTap: () {
            // TODO: Implement equipment addition
          },
        ),
        ListTile(
          title: Text('Edit Equipment'),
          onTap: () {
            // TODO: Implement equipment editing
          },
        ),
        ListTile(
          title: Text('Delete Equipment'),
          onTap: () {
            // TODO: Implement equipment deletion
          },
        ),
      ],
    );
  }
}
