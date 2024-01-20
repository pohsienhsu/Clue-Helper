const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");


// Import GraphQL schema
const typeDefs = importSchema('./schema.graphql');

// Create executable GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize Express App
const app = express();

app.use(cors());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL interface for testing
  context: {
    db: require('./db'), // Initialize and export your database connection here (e.g., using pg-promise)
  },
}));

// Start the server
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
