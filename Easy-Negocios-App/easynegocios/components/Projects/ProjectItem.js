import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native' 

const ProjectItem = (props) => {

    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.underline} 
            onPress={() => navigation.navigate('ProjectHomeScreen', { project_id : props.project.id, project_name : props.project.project_name })}>
                <Text style={styles.itemTitle}>{props.project.project_name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ backgroundColor: 'red', borderRadius: 10, padding: 3 }}
                onPress={() => props.handleDelete(props.project.id)}>
                <Text style={styles.itemTitle}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemTitle: {
        color: '#000000',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
    },

    underline: {
        borderBottomColor: '#000000',
        borderWidth: 1,
        borderColor: '#f2f2f2',
    }
})

export default ProjectItem