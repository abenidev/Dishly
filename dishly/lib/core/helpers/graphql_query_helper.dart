class GraphqlQueryHelper {
  static String getAllUsers = """
    query UsersQuery{
      users {
        id,
        firstName,
        lastName,
        email,
      }
    }
  """;
}
