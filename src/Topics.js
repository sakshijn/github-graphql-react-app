import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Topics = ({topicName, onTopicClick}) => (
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
       function handleClick(e) {
        onTopicClick(e.currentTarget.innerText);
       }
      return (
        <div>
            <h1>Topic: {data.topic.name}</h1>
            <h3>Stargazers: {data.topic.stargazerCount}</h3>
            <p style={{textDecoration: 'underline', fontWeight: 'bold'}}>Related topics</p>
            <ul style={{listStyle: 'none', padding: 0, textDecoration: 'underline'}}>
            {data.topic.relatedTopics.map((topic, index) =>(
                <li key={index} onClick={handleClick}>{topic.name}</li>
            ))}
            </ul>
        </div>
      );
    }}
  </Query>
);
export default Topics;