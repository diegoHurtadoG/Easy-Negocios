import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { getProjects, deleteProject } from '../../api';
import ProjectItem from './ProjectItem';
import useAuth from '../Hooks/useAuth';



const ProjectList = () => {

  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const isFocused = useIsFocused();

  const loadProjects = async () => {
    const data = await getProjects(user?.uid);
    setProjects(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {
    loadProjects();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProject(id)
    await loadProjects()
  }

  const renderItem = ({ item }) => {

    return <ProjectItem project={item} handleDelete={handleDelete} />;

  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={projects}
      keyExtractor={(item) => item.id + ''}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl 
        refreshing={refreshing}
        onRefresh={onRefresh}/>
      }
    />
  );
};

export default ProjectList;