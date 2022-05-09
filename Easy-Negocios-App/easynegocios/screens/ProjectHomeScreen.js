import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import Layout from "../components/Layout"

const ProjectHomeScreen = (props) => {

    useEffect(() => {
        if (props.route.params && props.route.params.project_id) {
            props.navigation.setOptions({ title: props.route.params.project_name });
        }
    })

    return (
        <Layout>
            <View>
                <Text>ProjectHomeScreen</Text>
            </View>
        </Layout>
    )
}

export default ProjectHomeScreen