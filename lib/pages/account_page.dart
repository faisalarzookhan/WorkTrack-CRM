import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/diesel_entry_provider.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/diesel_entry_form.dart';

class AccountPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final dieselEntries = Provider.of<DieselEntryProvider>(context).entries;

    return Scaffold(
      appBar: AppBar(
        title: Text('Account'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: dieselEntries.length,
              itemBuilder: (ctx, i) => ListTile(
                title: Text('Equipment Code: ${dieselEntries[i].equipmentCode}'),
                subtitle: Text('Liters: ${dieselEntries[i].liters}'),
                trailing: Text(dieselEntries[i].date.toString().substring(0, 10)),
              ),
            ),
          ),
          DieselEntryForm(),
        ],
      ),
      bottomNavigationBar: BottomNavBar(),
    );
  }
}

