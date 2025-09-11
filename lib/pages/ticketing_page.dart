import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/ticket_provider.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/ticket_form.dart';

class TicketingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tickets = Provider.of<TicketProvider>(context).tickets;

    return Scaffold(
      appBar: AppBar(
        title: Text('IT Support Tickets'),
      ),
      body: ListView.builder(
        itemCount: tickets.length,
        itemBuilder: (ctx, i) => ListTile(
          title: Text(tickets[i].title),
          subtitle: Text('Status: ${tickets[i].status}'),
          trailing: Text(tickets[i].createdDate.toString().substring(0, 10)),
          onTap: () {
            // TODO: Implement ticket details view
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          showDialog(
            context: context,
            builder: (ctx) => TicketForm(),
          );
        },
      ),
      bottomNavigationBar: BottomNavBar(),
    );
  }
}
