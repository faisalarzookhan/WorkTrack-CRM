import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'auth_provider.dart';

class TimesheetEntry {
  final String id;
  final String type;
  final String code;
  final int hours;
  final DateTime date;

  TimesheetEntry({
    required this.id,
    required this.type,
    required this.code,
    required this.hours,
    required this.date,
  });
}

class TimesheetProvider with ChangeNotifier {
  List<TimesheetEntry> _entries = [];
  final AuthProvider authProvider;

  TimesheetProvider({required this.authProvider});

  List<TimesheetEntry> get entries {
    return [..._entries];
  }

  Future<void> fetchEntries() async {
    final url = Uri.parse('${dotenv.env['API_URL']}/timesheet');
    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${authProvider.token}',
        },
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to load timesheet entries');
      }

      final List<dynamic> responseData = json.decode(response.body);
      final List<TimesheetEntry> loadedEntries = responseData.map((entry) {
        return TimesheetEntry(
          id: entry['id'],
          type: entry['type'],
          code: entry['code'],
          hours: entry['hours'],
          date: DateTime.parse(entry['date']),
        );
      }).toList();

      _entries = loadedEntries;
      notifyListeners();
    } catch (error) {
      throw error;
    }
  }

  Future<void> addEntry(String type, String code, int hours, DateTime date) async {
    final url = Uri.parse('${dotenv.env['API_URL']}/timesheet');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${authProvider.token}',
        },
        body: json.encode({
          'type': type,
          'code': code,
          'hours': hours,
          'date': date.toIso8601String(),
        }),
      );

      if (response.statusCode != 201) {
        throw Exception('Failed to add timesheet entry');
      }

      final responseData = json.decode(response.body);
      final newEntry = TimesheetEntry(
        id: responseData['id'],
        type: type,
        code: code,
        hours: hours,
        date: date,
      );

      _entries.add(newEntry);
      notifyListeners();
    } catch (error) {
      throw error;
    }
  }
}
