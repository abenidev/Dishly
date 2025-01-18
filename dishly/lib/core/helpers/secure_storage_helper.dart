import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageHelper {
  static AndroidOptions _getAndroidOptions() => const AndroidOptions(encryptedSharedPreferences: true);
  static final storage = FlutterSecureStorage(aOptions: _getAndroidOptions());

  static Future<void> writeSecureData(String key, String value) async => await storage.write(key: key, value: value);
  static Future<String?> readSecureData(String key) async => await storage.read(key: key);
  static Future<void> deleteSecureData(String key) async => await storage.delete(key: key);
}
