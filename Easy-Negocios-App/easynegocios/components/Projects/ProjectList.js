import { View, Text, FlatList } from 'react-native';
import React from 'react';

import ProjectItem from './ProjectItem';

const ProjectList = (props) => {

  const renderItem = ( {item} ) => {

    return <ProjectItem project={item}/>;

    }

  return (
    <FlatList
    data={props.projects}
    keyExtractor={(item) => item.id + ''}
    renderItem={renderItem}
    />
  );
};

export default ProjectList;