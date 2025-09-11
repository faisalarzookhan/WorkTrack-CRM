import 'package:flutter/material.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/file_upload_download.dart';

class DepartmentPage extends StatelessWidget {
  final List<String> departments = [
    'HR', 'IT', 'Production', 'Procurement', 'Movement', 'Safety', 'Recruitment', 'Account'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Departments'),
      ),
      body: ListView.builder(
        itemCount: departments.length,
        itemBuilder: (context, index) {
          return ExpansionTile(
            title: Text(departments[index]),
            children: [
              FileUploadDownload(department: departments[index]),
            ],
          );
        },
      ),
      bottomNavigationBar: BottomNavBar(),
    );
  }
}
