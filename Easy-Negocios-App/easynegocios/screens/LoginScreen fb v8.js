import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../components/Hooks/useAuth'

const LoginScreen = () => {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const { handleEmailSignUp, handleEmailLogin, logout } = useAuth();

    return (
        <View>
            <Text>Easy - Negocios</Text>

            <View>
                <TextInput 
                placeholder='Email'
                value={signInEmail}
                onChangeText={text => setSignInEmail(text)}/>
            </View>

            <View>
                <TextInput 
                placeholder='Password'
                value={signInPassword}
                onChangeText={text => setSignInPassword(text)}
                secureTextEntry/>
            </View>

            <TouchableOpacity onPress={handleEmailLogin(signInEmail, signInPassword)} style={styles.ProjectHomeButton}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Ingresar </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 80, textAlign: 'center' }}> Registro </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View>
                <TextInput 
                placeholder='Email'
                value={registerEmail}
                onChangeText={text => setRegisterEmail(text)}/>
            </View>

            <View>
                <TextInput 
                placeholder='Password'
                value={registerPassword}
                onChangeText={text => setRegisterPassword(text)}
                secureTextEntry/>
            </View>

            <TouchableOpacity onPress={handleEmailSignUp(registerEmail, registerPassword)} style={styles.ProjectHomeButton}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Registrar </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    ProjectHomeButton: {
        backgroundColor: 'cyan',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: '50%',
        alignSelf: 'center'
    }

})

export default LoginScreen