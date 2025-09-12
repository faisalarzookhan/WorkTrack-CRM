import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/timesheet_provider.dart';

class TimesheetForm extends StatefulWidget {
  @override
  _TimesheetFormState createState() => _TimesheetFormState();
}

class _TimesheetFormState extends State<TimesheetForm> {
  final _formKey = GlobalKey<FormState>();
  String _type = 'Equipment';
  String _code = '';
  int _hours = 0;
  DateTime _selectedDate = DateTime.now();

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        await Provider.of<TimesheetProvider>(context, listen: false)
            .addEntry(_type, _code, _hours, _selectedDate);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Timesheet entry added successfully')),
        );
        _formKey.currentState!.reset();
      } catch (error) {
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text('An error occurred'),
            content: Text('Could not add timesheet entry.'),
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
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            DropdownButtonFormField<String>(
              value: _type,
              decoration: InputDecoration(labelText: 'Type'),
              items: ['Equipment', 'Drivers'].map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _type = value!;
                });
              },
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Code'),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a code';
                }
                return null;
              },
              onSaved: (value) => _code = value!,
            ),
            TextFormField(
              decoration: InputDecoration(labelText: 'Hours'),
              keyboardType: TextInputType.number,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter the number of hours';
                }
                if (int.tryParse(value) == null) {
                  return 'Please enter a valid number';
                }
                return null;
              },
              onSaved: (value) => _hours = int.parse(value!),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text('Select Date'),
              onPressed: () async {
                final DateTime? picked = await showDatePicker(
                  context: context,
                  initialDate: _selectedDate,
                  firstDate: DateTime(2000),
                  lastDate: DateTime(2025),
                );
                if (picked != null && picked != _selectedDate)
                  setState(() {
                    _selectedDate = picked;
                  });
              },
            ),
            SizedBox(height: 10),
            Text('Selected date: ${_selectedDate.toString().substring(0, 10)}'),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text('Submit Timesheet Entry'),
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }
}

