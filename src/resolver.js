import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs


const resolvers = {
  Query: {
    // Fetch chat history for a specific user
    getChatHistory: async (_, { userId }, { dgraphClient }) => {
      const query = `
        query getChatHistory($userId: string) {
          getChatHistory(func: eq(Chat.userId, $userId)) {
            id
            title
            message       # Include message
            author        # Include author
            timestamp
            userId
          }
        }
      `;
    
      const response = await dgraphClient.newTxn().queryWithVars(query, { $userId: userId });
      const result = response.getJson();
      return result.getChatHistory || [];
    },

    // Fetch a specific chat by ID
    getChatById: async (_, { id }, { dgraphClient }) => {
      const query = `
        query getChatById($id: string) {
          getChatById(func: eq(Chat.id, $id)) {
            id
            title
            message      
            author       
            timestamp
            userId
          }
        }
      `;
      
      const response = await dgraphClient.newTxn().queryWithVars(query, { $id: id });
      const result = response.getJson();
      return result.getChatById[0] || null;
    },
  },

  Mutation: {
    // Create a new chat
    createChat: async (_, { title, message, author, userId }, { dgraphClient }) => {
      const chat = {
        id: uuidv4(),
        title,
        message,       
        author,  
        timestamp: new Date().toISOString(),
        userId,
      };

      const mutation = {
        set: [chat],
      };

      const txn = dgraphClient.newTxn();
      try {
        await txn.mutate({ setJson: mutation });
        await txn.commit();
        return chat;
      } finally {
        await txn.discard();
      }
    },

    // Switch chat by ID
    switchChat: async (_, { id, userId }, { dgraphClient }) => {
      const query = `
        query getChatById($id: string) {
          getChatById(func: eq(Chat.id, $id)) {
            id
            title
            message     
            author     
            timestamp
            userId
          }
        }
      `;
      
      const response = await dgraphClient.newTxn().queryWithVars(query, { $id: id });
      const result = response.getJson();
      return result.getChatById[0] || null;
    },
  },
};

export default resolvers;
