import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const RelatedTopics = ({relatedTopicName}) => (
  <Query
    query={gql`
    {
        topic(name: "${relatedTopicName}") {
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
            <h1>Related Topic: {data.topic.name}</h1>
            <h3>Stargazers: {data.topic.stargazerCount}</h3>
            <p style={{textDecoration: 'underline'}}>Related topics</p>
            <ul style={{listStyle: 'none', padding: 0}}>
            {data.topic.relatedTopics.map((topic, index) =>(
                <li key={index}>{topic.name}</li>
            ))}
            </ul>
        </div>
      );
    }}
  </Query>
);
export default RelatedTopics;