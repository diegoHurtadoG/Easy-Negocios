import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../components/Hooks/useAuth'
import { auth } from '../firebase'

const LoginScreen = () => {
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const { signInWithGoogle, registerWithEmailAndPassword, loginWithEmailAndPassword } = useAuth();

    return (
        <View>

            <View>
                <Text style={styles.descriptionText}>Administra tus productos, clientes, ventas, pedidos y mas con esta herramienta</Text>
            </View>

            {/** SIGN IN */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 100, textAlign: 'center' }}> Iniciar Sesion </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View>
                <TextInput
                    placeholder='Email'
                    value={signInEmail}
                    onChangeText={(text) => setSignInEmail(text)} />
            </View>

            <View>
                <TextInput
                    placeholder='Password'
                    value={signInPassword}
                    onChangeText={(text) => setSignInPassword(text)}
                    secureTextEntry />
            </View>

            <TouchableOpacity onPress={() => loginWithEmailAndPassword(auth, signInEmail, signInPassword)} style={styles.ProjectHomeButton}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Ingresar </Text>
            </TouchableOpacity>

            {/** GOOGLE */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 150, textAlign: 'center' }}> Ingreso con Google </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={{ padding: 30 }}>
                <TouchableOpacity onPress={signInWithGoogle} style={styles.ProjectHomeButton}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Ingresar Con Google </Text>
                </TouchableOpacity>
            </View>

            {/** REGISTER */}

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
                    onChangeText={(text) => setRegisterEmail(text)} />
            </View>

            <View>
                <TextInput
                    placeholder='Password'
                    value={registerPassword}
                    onChangeText={(text) => setRegisterPassword(text)}
                    secureTextEntry />
            </View>

            <TouchableOpacity onPress={() => registerWithEmailAndPassword(auth, registerEmail, registerPassword)} style={styles.ProjectHomeButton}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Registrar </Text>
            </TouchableOpacity>

            

            {/** ABOUT US */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 80, textAlign: 'center' }}> Acerca De </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View>
                <Text style={styles.descriptionText}>Enviar sugerencias y feedback a:</Text>
            </View>

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
    },

    descriptionText: {
        width: '80%',
        color: '#000000',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        padding: 30,
    }

})

export default LoginScreen