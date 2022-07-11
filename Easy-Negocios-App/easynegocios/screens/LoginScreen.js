import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useAuth from '../components/Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <Text>LoginScreen</Text>

            <TouchableOpacity onPress={signInWithGoogle} style={styles.ProjectHomeButton}>
                <Text style={{fontWeight:'bold', alignSelf:'center'}}> Ingresar Con Google </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    ProjectHomeButton: {
        backgroundColor: 'cyan',
        borderRadius: 10,
        borderWidth:1,
        padding: 10,
        width: '50%',
        alignSelf:'center'
    }

})

export default LoginScreen