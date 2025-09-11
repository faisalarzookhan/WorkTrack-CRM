import 'package:flutter/foundation.dart';

class Notification {
  final String id;
  final String title;
  final String message;
  final DateTime timestamp;
  bool isRead;

  Notification({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    this.isRead = false,
  });
}

class NotificationProvider with ChangeNotifier {
  List<Notification> _notifications = [];

  List<Notification> get notifications {
    return [..._notifications];
  }

  void addNotification(Notification notification) {
    _notifications.add(notification);
    notifyListeners();
  }

  void markAsRead(String id) {
    final notificationIndex = _notifications.indexWhere((n) => n.id == id);
    if (notificationIndex >= 0) {
      _notifications[notificationIndex].isRead = true;
      notifyListeners();
    }
  }

  void clearNotifications() {
    _notifications.clear();
    notifyListeners();
  }
}

