import 'package:dishly/core/config/graphql_config.dart';
import 'package:dishly/core/helpers/graphql_mutation_helper.dart';
import 'package:dishly/core/helpers/graphql_query_helper.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLService {
  static final GraphQLConfig _config = GraphQLConfig();
  static final GraphQLClient _client = _config.clientToQuery();

  static Future<QueryResult> authenticateWithGoogleAcc(Map<String, dynamic> input) async {
    try {
      QueryResult result = await _client.mutate(
        MutationOptions(
          document: gql(GraphqlMutationHelper.authenticateWithGoogleAcc),
          variables: {
            "input": input,
          },
        ),
      );
      return result;
    } catch (e) {
      debugPrint(e.toString());
      throw Exception(e.toString());
    }
  }

  static Future<QueryResult> queryAllUsers() async {
    try {
      QueryResult result = await _client.query(
        QueryOptions(
          fetchPolicy: FetchPolicy.noCache,
          document: gql(GraphqlQueryHelper.getAllUsers),
          // variables: {},
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception.toString());
      }
      return result;
    } catch (e) {
      debugPrint(e.toString());
      throw Exception(e.toString());
    }
  }
}
