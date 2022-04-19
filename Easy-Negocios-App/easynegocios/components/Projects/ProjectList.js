import { View, Text, FlatList } from 'react-native';
import React from 'react';

const ProjectList = (props) => {
  return (
    <FlatList
    data={props.projects}
    keyExtractor={(item) => item.id + ''}
    renderItem={( {item} ) => {
        return <Text>{item.project_name}</Text>;
        }}/>
  );
};

export default ProjectList;