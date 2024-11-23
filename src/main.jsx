import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ContextProvider from './context/ContextProvider.jsx';

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_DGRAPH_ENDPOINT}`, // Dgraph Cloud End point
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_DGRAPH_API_KEY}`,  // API Key
  },
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ContextProvider>
        <StrictMode>
          <App />
      </StrictMode>
    </ContextProvider>
  </ApolloProvider>,
)
