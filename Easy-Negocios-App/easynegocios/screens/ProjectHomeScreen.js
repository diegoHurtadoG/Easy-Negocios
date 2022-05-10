import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import Layout from "../components/Layout"
import { borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const ProjectHomeScreen = (props) => {

    useEffect(() => {
        if (props.route.params && props.route.params.project_id) {
            props.navigation.setOptions({ title: props.route.params.project_name });
        }
    })

    return (
        <Layout>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Productos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Clientes</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Ventas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Compras</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Stock</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.GenerateCashFlux}
                    onPress={() => navigation.navigate('ProjectHomeScreen', { project_id: props.project.id, project_name: props.project.project_name })}>
                    <Text style={styles.ProjectHomeText}>Generar Flujo de Caja</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        marginVertical: 30,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    ProjectHomeButton: { 
        backgroundColor: '#e0e0e0', 
        borderRadius: 2, 
        padding: 20,
        width: '45%'
    },

    ProjectHomeText:{
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    GenerateCashFlux: { 
        backgroundColor: '#e0e0e0', 
        borderRadius: 2, 
        padding: 20,
        width: '100%'
    }
})

export default ProjectHomeScreen