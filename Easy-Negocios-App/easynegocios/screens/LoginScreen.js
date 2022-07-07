import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../components/Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <Text>LoginScreen</Text>
            <Button title="login" onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen