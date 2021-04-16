import React, {useState} from 'react';
import './App.css';
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-boost'
import Topics from './Topics';
import RelatedTopics from './RelatedTopics';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        process.env.REACT_APP_GITHUB_API_TOKEN
      }`
    }
  }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

const App = () => {
  const intialTopic = 'react';
  const [topic, setTopic] = useState('');
  const handleEvent = (name) => {
    setTopic(name);
  };
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GitHub API</h1>
        <Topics topicName={intialTopic} onTopicClick={handleEvent}/>
        {topic!=='' && <RelatedTopics relatedTopicName={topic}/>}
      </div>
      </ApolloProvider>
  );
}

export default App;
