import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ProjectItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.project.project_name}</Text>
            <Text style={styles.itemTitle}>{props.project.project_description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#333333',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },

    itemTitle:{
        color: '#ffffff',
    }
})

export default ProjectItem