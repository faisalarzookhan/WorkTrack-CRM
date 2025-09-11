import 'package:flutter/material.dart';

class FileUploadDownload extends StatelessWidget {
  final String department;

  FileUploadDownload({required this.department});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ElevatedButton(
            child: Text('Upload File'),
            onPressed: () {
              // TODO: Implement file upload logic
              print('Uploading file for $department');
            },
          ),
          SizedBox(height: 16),
          ElevatedButton(
            child: Text('Download Files'),
            onPressed: () {
              // TODO: Implement file download logic
              print('Downloading files for $department');
            },
          ),
        ],
      ),
    );
  }
}
