import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';

import ProjectList from '../components/Projects/ProjectList';

const HomeScreen = () => {

    const [projects, setProjects] = useState([]);

    const loadProjects = async () => {
        const data = await getProjects();
        setProjects(data);
    };

    // Every time the screen loads, the useEffect runs
    useEffect(() => {

        loadProjects();

    }, []);

    return (
        <View>
            <ProjectList projects={projects} />
        </View>
    );
};

export default HomeScreen;