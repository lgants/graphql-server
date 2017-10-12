// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt
} from 'graphql';

let count = 0;

// top-level query object returns a `RootQueryType` object, which has a `count` field, which is an integer.
let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        description: 'The count!',
        resolve: function() {
          return count;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Updates the count',
        resolve: function() {
          count += 1;
          return count;
        }
      }
    }
  })
});

export default schema;
