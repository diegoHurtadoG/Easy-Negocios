import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <View style={styles.container}>
            <StatusBar/>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },
});

export default Layout