import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AuthProvider with ChangeNotifier {
  String? _token;
  String? _userId;
  String? _userRole;

  bool get isAuth {
    return token != null;
  }

  String? get token {
    if (_token != null) {
      return _token;
    }
    return null;
  }

  String? get userId {
    return _userId;
  }

  String? get userRole {
    return _userRole;
  }

  Future<void> login(String email, String password) async {
    final url = Uri.parse('${dotenv.env['API_URL']}/login');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      final responseData = json.decode(response.body);
      if (response.statusCode != 200) {
        throw Exception(responseData['message']);
      }

      _token = responseData['token'];
      _userId = responseData['userId'];
      _userRole = responseData['role'];
      notifyListeners();
    } catch (error) {
      throw error;
    }
  }

  void logout() {
    _token = null;
    _userId = null;
    _userRole = null;
    notifyListeners();
  }
}

