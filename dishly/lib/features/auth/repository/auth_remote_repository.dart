import 'package:dishly/core/constants/app_strings.dart';
import 'package:dishly/core/helpers/secure_storage_helper.dart';
import 'package:dishly/core/services/graphql_service.dart';
import 'package:dishly/core/utils/app_utils.dart';
import 'package:dishly/features/auth/model/user.dart';
import 'package:dishly/features/auth/service/google_auth_service.dart';
import 'package:dishly/main.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

final authRemoteProvider = Provider<AuthRemoteRepository>((ref) {
  return AuthRemoteRepository();
});

class AuthRemoteRepository {
  Future<void> authenticateWithGoogleAcc() async {
    try {
      final googleUser = await GoogleAuthService.signIn();
      if (googleUser != null) {
        Map<String, dynamic> input = {
          "email": googleUser.email,
          "firstName": splitFullName(googleUser.displayName ?? '')['firstName'],
          "lastName": splitFullName(googleUser.displayName ?? '')['lastName'],
          "photoUrl": googleUser.photoUrl,
        };
        QueryResult result = await GraphQLService.authenticateWithGoogleAcc(input);
        if (result.hasException) {
          throw Exception(result.exception.toString());
        }
        if (result.data == null) {
          throw Exception('Data is null');
        }
        if (result.data!['authenticateWithGoogleAcc'] == null) {
          throw Exception('Data is null');
        }

        List<User> users = userBox.values.toList();
        logger.i('userBox: ${userBox.values.toList()}');
        if (users.isEmpty) {
          User newUser = User.fromMap(result.data!['authenticateWithGoogleAcc']);
          await userBox.add(newUser);
          await SecureStorageHelper.writeSecureData(tokenSecuredStorageKey, result.data!['authenticateWithGoogleAcc']['token'] ?? '');
          //TODO: use fpdart here to return success
        }
      }
    } catch (e) {
      logger.e(e.toString());
    }
  }
}
