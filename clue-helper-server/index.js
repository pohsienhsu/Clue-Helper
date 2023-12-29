const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

// Initialize Express App
const app = express();

// Define a GraphQL schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld',
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => 'Hello, World!',
      },
    }),
  }),
});

// GraphQL Endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable GraphiQL for testing the GraphQL API
  })
);

// Start the server
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
