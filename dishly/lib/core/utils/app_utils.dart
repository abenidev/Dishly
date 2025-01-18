Map<String, String> splitFullName(String fullName) {
  fullName = fullName.trim();
  List<String> parts = fullName.split(' ');
  String firstName = parts.isNotEmpty ? parts.first : '';
  String lastName = parts.length > 1 ? parts.sublist(1).join(' ') : '';
  return {
    'firstName': firstName,
    'lastName': lastName,
  };
}
