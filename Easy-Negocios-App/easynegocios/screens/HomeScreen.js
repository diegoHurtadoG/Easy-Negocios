import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';

import Layout from '../components/Layout';
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
        <Layout>
            <ProjectList projects={projects} />
        </Layout>
    );
};

export default HomeScreen;