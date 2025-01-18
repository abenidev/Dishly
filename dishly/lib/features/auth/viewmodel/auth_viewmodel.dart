import 'package:dishly/features/auth/repository/auth_remote_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authViewmodelProvider = StateNotifierProvider<AuthViewmodelNotifier, String>((ref) {
  AuthRemoteRepository authRemoteRepository = ref.watch(authRemoteProvider);
  return AuthViewmodelNotifier(authRemoteRepository);
});

class AuthViewmodelNotifier extends StateNotifier<String> {
  final AuthRemoteRepository _authRemoteRepository;
  AuthViewmodelNotifier(this._authRemoteRepository) : super('');

  Future<void> authenticateWithGoogleAcc() async {
    await _authRemoteRepository.authenticateWithGoogleAcc();
  }
}
