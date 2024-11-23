import gql from "graphql-tag";

const typeDefs = gql`
  type Chat {
    id: ID!
    title: String!
    message: String!    # Add message field
    author: String!     # Add author field
    timestamp: String!
    userId: ID!
  }

  type Query {
    getChatHistory(userId: ID!): [Chat]
    getChatById(id: ID!): Chat
  }

  type Mutation {
    createChat(title: String!, message: String!, author: String!, userId: ID!): Chat
    switchChat(id: ID!, userId: ID!): Chat
  }
`;

export default typeDefs;
