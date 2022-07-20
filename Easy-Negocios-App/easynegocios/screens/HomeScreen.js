import React from "react";
import { Text, TouchableOpacity } from "react-native";
import useAuth from "../components/Hooks/useAuth";
import Layout from '../components/Layout';
import ProjectList from '../components/Projects/ProjectList';

const HomeScreen = () => {
    const { logout } = useAuth();
    return (
        <Layout>
            <ProjectList />

            <TouchableOpacity onPress={logout} style={{
                backgroundColor: '#ff5555',
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                width: '30%',
                alignSelf: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize:20 }}> Salir </Text>
            </TouchableOpacity>

        </Layout>
    )
};


export default HomeScreen;