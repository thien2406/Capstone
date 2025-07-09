import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              // Dịch vụ của chúng tôi
              SectionHeader(title: 'Dịch vụ của chúng tôi'),
              ServiceCard(title: 'Thuê giúp việc theo giờ'),
              ServiceCard(title: 'Thuê giúp việc định kỳ'),
              ServiceCard(title: 'Tổng vệ sinh'),

              // Nhân viên nổi bật
              SectionHeader(title: 'Nhân viên nổi bật'),
              EmployeeCard(name: 'Trần Minh Ngọc', age: 25, experience: '14 năm 6 tháng'),
              EmployeeCard(name: 'Lê Thi Bảo', age: 30, experience: '5 năm'),

              // Quy trình sử dụng dịch vụ
              SectionHeader(title: 'Quy trình sử dụng dịch vụ'),
              ProcessStep(step: 'Chọn Dịch Vụ', description: 'Chọn dịch vụ giúp việc mà bạn cần.'),
              ProcessStep(step: 'Chọn Thời Gian và Vị Trí', description: 'Chọn thời gian và địa điểm cho dịch vụ.'),
              ProcessStep(step: 'Xác Nhận và Thanh Toán', description: 'Xác nhận thông tin và thực hiện thanh toán.'),
            ],
          ),
        ),
      ),
    );
  }
}

// Widget header section
class SectionHeader extends StatelessWidget {
  final String title;

  SectionHeader({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Text(
        title,
        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black),
      ),
    );
  }
}

// Widget card service
class ServiceCard extends StatelessWidget {
  final String title;

  ServiceCard({required this.title});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      child: ListTile(
        title: Text(title),
        trailing: Icon(Icons.arrow_forward),
        onTap: () {
          // Handle tap event
        },
      ),
    );
  }
}

// Widget for displaying employee info
class EmployeeCard extends StatelessWidget {
  final String name;
  final int age;
  final String experience;

  EmployeeCard({required this.name, required this.age, required this.experience});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      child: ListTile(
        leading: CircleAvatar(child: Text(name[0])),
        title: Text(name),
        subtitle: Text('Tuổi: $age\nKinh nghiệm: $experience'),
        onTap: () {
          // Handle tap event
        },
      ),
    );
  }
}

// Widget for process steps
class ProcessStep extends StatelessWidget {
  final String step;
  final String description;

  ProcessStep({required this.step, required this.description});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      child: ListTile(
        title: Text(step, style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(description),
        trailing: Icon(Icons.check_circle_outline),
        onTap: () {
          // Handle tap event
        },
      ),
    );
  }
}
