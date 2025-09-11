import 'package:flutter/foundation.dart';

class Report {
  final String id;
  final String title;
  final String type;
  final DateTime generatedDate;
  final String fileUrl;

  Report({
    required this.id,
    required this.title,
    required this.type,
    required this.generatedDate,
    required this.fileUrl,
  });
}

class ReportProvider with ChangeNotifier {
  List<Report> _reports = [];

  List<Report> get reports {
    return [..._reports];
  }

  void addReport(Report report) {
    _reports.add(report);
    notifyListeners();
  }

  void removeReport(String id) {
    _reports.removeWhere((report) => report.id == id);
    notifyListeners();
  }
}
