class GraphqlMutationHelper {
  static String authenticateWithGoogleAcc = """
    mutation AuthenticateWithGoogleAcc(\$input: AuthenticateWithGoogleAccInput!){
      authenticateWithGoogleAcc(input: \$input) {
        id,
        email,
        firstName,
        lastName,
        photoUrl,
        token,
      }
    }
  """;
}
