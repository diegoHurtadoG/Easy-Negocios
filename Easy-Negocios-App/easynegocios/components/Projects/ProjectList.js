import { FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getProjects, deleteProject } from '../../api';
import ProjectItem from './ProjectItem';

const ProjectList = () => {

  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {

    loadProjects();

  }, []);

  const handleDelete = async (id) => {
    await deleteProject(id)
    await loadProjects()
  }

  const renderItem = ({ item }) => {

    return <ProjectItem project={item} handleDelete={handleDelete} />;

  }

  return (
    <FlatList
      style={{
        width: '100%',
      }}
      data={projects}
      keyExtractor={(item) => item.id + ''}
      renderItem={renderItem}
    />
  );
};

export default ProjectList;