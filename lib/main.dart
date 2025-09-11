import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'providers/auth_provider.dart';
import 'providers/timesheet_provider.dart';
import 'providers/notification_provider.dart';
import 'providers/diesel_entry_provider.dart';
import 'providers/report_provider.dart';
import 'providers/ticket_provider.dart';
import 'pages/splash_screen.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'pages/timesheet_page.dart';
import 'pages/department_page.dart';
import 'pages/admin_page.dart';
import 'pages/account_page.dart';
import 'pages/reports_page.dart';
import 'pages/ticketing_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");

  if (kIsWeb) {
    // Initialize any web-specific configurations here
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => TimesheetProvider()),
        ChangeNotifierProvider(create: (_) => NotificationProvider()),
        ChangeNotifierProvider(create: (_) => DieselEntryProvider()),
        ChangeNotifierProvider(create: (_) => ReportProvider()),
        ChangeNotifierProvider(create: (_) => TicketProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WorkTrack App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: 'Roboto',
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => SplashScreen(),
        '/login': (context) => LoginPage(),
        '/home': (context) => HomePage(),
        '/timesheet': (context) => TimesheetPage(),
        '/department': (context) => DepartmentPage(),
        '/admin': (context) => AdminPage(),
        '/account': (context) => AccountPage(),
        '/reports': (context) => ReportsPage(),
        '/ticketing': (context) => TicketingPage(),
      },
    );
  }
}

