import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Topics = ({topicName}) => (
  <Query
    query={gql`
    {
        topic(name: "${topicName}") {
          name
          stargazerCount
          relatedTopics(first: 10) {
            name
            stargazerCount
          }
        }
      }      
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
            <h1>Topic: {data.topic.name}</h1>
            <h3>Stargazers: {data.topic.stargazerCount}</h3>
            <p>Related topics</p>
            <ul style={{listStyle: 'none', padding: '0'}}>
            {data.topic.relatedTopics.map(topic=>(
                <li>{topic.name}</li>
            ))}
            </ul>
        </div>
      );
    }}
  </Query>
);
export default Topics;