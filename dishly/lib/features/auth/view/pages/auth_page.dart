import 'package:dishly/features/auth/model/user.dart';
import 'package:dishly/features/auth/viewmodel/auth_viewmodel.dart';
import 'package:dishly/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthPage extends ConsumerStatefulWidget {
  const AuthPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _AuthPageState();
}

class _AuthPageState extends ConsumerState<AuthPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () async {
                await ref.read(authViewmodelProvider.notifier).authenticateWithGoogleAcc();

                //!remove
                List<User> users = userBox.values.toList();
                if (users.isNotEmpty && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${users[0].firstName} ${users[0].lastName}')),
                  );
                }
              },
              child: const Text('Sign In With Google'),
            ),
          ],
        ),
      ),
    );
  }
}
