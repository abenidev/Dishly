import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLConfig {
  static String host = kReleaseMode ? "http://192.168.8.188:4000/graphql" : "http://10.0.2.2:4000/graphql";
  static HttpLink httpLink = HttpLink(host);
  GraphQLClient clientToQuery() => GraphQLClient(link: httpLink, cache: GraphQLCache());
}
