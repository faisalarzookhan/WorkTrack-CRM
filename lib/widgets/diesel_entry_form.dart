import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/diesel_entry_provider.dart';

class DieselEntryForm extends StatefulWidget {
  @override
  _DieselEntryFormState createState() => _DieselEntryFormState();
}

class _DieselEntryFormState extends State<DieselEntryForm> {
  final _formKey = GlobalKey<FormState>();
  String _equipmentCode = '';
  double _liters = 0;

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      Provider.of<DieselEntryProvider>(context, listen: false).addEntry(
        DieselEntry(
          id: DateTime.now().toString(),
          equipmentCode: _equipmentCode,
          liters: _liters,
          date: DateTime.now(),
        ),
      );
      _formKey.currentState!.reset();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Equipment Code'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter an equipment code';
              }
              return null;
            },
            onSaved: (value) => _equipmentCode = value!,
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'Liters'),
            keyboardType: TextInputType.number,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter the number of liters';
              }
              if (double.tryParse(value) == null) {
                return 'Please enter a valid number';
              }
              return null;
            },
            onSaved: (value) => _liters = double.parse(value!),
          ),
          ElevatedButton(
            child: Text('Submit Diesel Entry'),
            onPressed: _submitForm,
          ),
        ],
      ),
    );
  }
}

