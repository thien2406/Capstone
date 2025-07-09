import 'package:flutter/material.dart';
import 'LoginScreen.dart'; // Import file chứa LoginScreen
// import 'TrangChu.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'House Keeper',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      // Sử dụng initialRoute để xác định trang đầu tiên
      initialRoute: '/login', // Đảm bảo trang đăng nhập sẽ mở đầu tiên
      routes: {
        '/login': (context) => const LoginScreen(), // Đảm bảo đăng nhập có route
        '/': (context) => const HomeScreen(), // Trang chủ nếu đăng nhập thành công
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Trang Chủ'),
      ),
      body: const Center(
        child: Text('Chào mừng bạn đến với trang chủ!'),
      ),
    );
  }
}
