import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/timesheet_provider.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/timesheet_form.dart';

class TimesheetPage extends StatefulWidget {
  @override
  _TimesheetPageState createState() => _TimesheetPageState();
}

class _TimesheetPageState extends State<TimesheetPage> {
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _fetchTimesheet();
  }

  Future<void> _fetchTimesheet() async {
    setState(() {
      _isLoading = true;
    });
    try {
      await Provider.of<TimesheetProvider>(context, listen: false).fetchEntries();
    } catch (error) {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text('An error occurred'),
          content: Text('Could not fetch timesheet entries.'),
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
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Timesheet'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Entries'),
              Tab(text: 'Add Entry'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _isLoading
                ? Center(child: CircularProgressIndicator())
                : TimesheetEntriesList(),
            TimesheetForm(),
          ],
        ),
        bottomNavigationBar: BottomNavBar(),
      ),
    );
  }
}

class TimesheetEntriesList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final timesheetEntries = Provider.of<TimesheetProvider>(context).entries;

    return ListView.builder(
      itemCount: timesheetEntries.length,
      itemBuilder: (ctx, i) => ListTile(
        title: Text('${timesheetEntries[i].type} - ${timesheetEntries[i].code}'),
        subtitle: Text('Hours: ${timesheetEntries[i].hours}'),
        trailing: Text(timesheetEntries[i].date.toString().substring(0, 10)),
      ),
    );
  }
}

