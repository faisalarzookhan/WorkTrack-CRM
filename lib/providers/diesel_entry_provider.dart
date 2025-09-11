import 'package:flutter/foundation.dart';

class DieselEntry {
  final String id;
  final String equipmentCode;
  final double liters;
  final DateTime date;

  DieselEntry({
    required this.id,
    required this.equipmentCode,
    required this.liters,
    required this.date,
  });
}

class DieselEntryProvider with ChangeNotifier {
  List<DieselEntry> _entries = [];

  List<DieselEntry> get entries {
    return [..._entries];
  }

  void addEntry(DieselEntry entry) {
    _entries.add(entry);
    notifyListeners();
  }

  void removeEntry(String id) {
    _entries.removeWhere((entry) => entry.id == id);
    notifyListeners();
  }
}
