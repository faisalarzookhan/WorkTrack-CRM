import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/report_provider.dart';
import '../widgets/bottom_nav_bar.dart';

class ReportsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final reports = Provider.of<ReportProvider>(context).reports;

    return Scaffold(
      appBar: AppBar(
        title: Text('Reports'),
      ),
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (ctx, i) => ListTile(
          title: Text(reports[i].title),
          subtitle: Text('Type: ${reports[i].type}'),
          trailing: Text(reports[i].generatedDate.toString().substring(0, 10)),
          onTap: () {
            // TODO: Implement report viewing functionality
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          // TODO: Implement report generation functionality
        },
      ),
      bottomNavigationBar: BottomNavBar(),
    );
  }
}
