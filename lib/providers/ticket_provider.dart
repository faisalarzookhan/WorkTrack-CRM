import 'package:flutter/foundation.dart';

class Ticket {
  final String id;
  final String title;
  final String description;
  final String status;
  final DateTime createdDate;
  final String? imageUrl;
  double? rating;

  Ticket({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.createdDate,
    this.imageUrl,
    this.rating,
  });
}

class TicketProvider with ChangeNotifier {
  List<Ticket> _tickets = [];

  List<Ticket> get tickets {
    return [..._tickets];
  }

  void addTicket(Ticket ticket) {
    _tickets.add(ticket);
    notifyListeners();
  }

  void updateTicketStatus(String id, String status) {
    final ticketIndex = _tickets.indexWhere((t) => t.id == id);
    if (ticketIndex >= 0) {
      _tickets[ticketIndex] = Ticket(
        id: _tickets[ticketIndex].id,
        title: _tickets[ticketIndex].title,
        description: _tickets[ticketIndex].description,
        status: status,
        createdDate: _tickets[ticketIndex].createdDate,
        imageUrl: _tickets[ticketIndex].imageUrl,
        rating: _tickets[ticketIndex].rating,
      );
      notifyListeners();
    }
  }

  void rateTicket(String id, double rating) {
    final ticketIndex = _tickets.indexWhere((t) => t.id == id);
    if (ticketIndex >= 0) {
      _tickets[ticketIndex].rating = rating;
      notifyListeners();
    }
  }
}

