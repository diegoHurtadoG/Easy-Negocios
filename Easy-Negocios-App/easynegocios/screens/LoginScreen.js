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
                    <Text
                        accessibilityLabel="Inicio de Sesion"
                        style={{ width: 100, textAlign: 'center' }}> Iniciar Sesion </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    accessibilityLabel="Email de la cuenta"
                    placeholder='Email de Ingreso'
                    value={signInEmail}
                    onChangeText={(text) => setSignInEmail(text)} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    accessibilityLabel="Contraseña de la cuenta"
                    placeholder='Contraseña de la cuenta'
                    value={signInPassword}
                    onChangeText={(text) => setSignInPassword(text)}
                    secureTextEntry />
            </View>

            <TouchableOpacity
                accessibilityLabel="Iniciar Sesion"
                accessibilityHint="Inicia la sesion con los datos entregados"
                onPress={() => loginWithEmailAndPassword(auth, signInEmail, signInPassword)} style={styles.ProjectHomeButton}>
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Ingresar </Text>
            </TouchableOpacity>

            {/** GOOGLE */}

            {/** 

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 150, textAlign: 'center' }}> Ingreso con Google </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={{ padding: 30 }}>
                <TouchableOpacity onPress={signInWithGoogle} style={styles.ProjectHomeButton}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}> Ingresar Con Google </Text>
                </TouchableOpacity>
            </View>

            */}

            {/** REGISTER */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text
                        accessibilityLabel="Registror"
                        style={{ width: 80, textAlign: 'center' }}> Registro </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    accessibilityLabel="Email para registrar"
                    placeholder='Email de registro'
                    value={registerEmail}
                    onChangeText={(text) => setRegisterEmail(text)} />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    accessibilityLabel="Contraseña para registrar"
                    placeholder='Contraseña de registro'
                    value={registerPassword}
                    onChangeText={(text) => setRegisterPassword(text)}
                    secureTextEntry />
            </View>

            <TouchableOpacity
                accessibilityLabel="Registrar"
                accessibilityHint="Registra la cuenta con los datos entregados e inicia sesion"
                onPress={() => registerWithEmailAndPassword(auth, registerEmail, registerPassword)} style={styles.ProjectHomeButton}>
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
                <Text
                    accessibilityLabel="Recibimos feedback al correo"
                    style={styles.descriptionText}>Enviar sugerencias y feedback a: easynegociosapp@gmail.com</Text>
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
        width: '90%',
        color: '#000000',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        padding: 20,
    },

    inputText: {
        width: '100%',
        textAlign: 'center',
    },

    inputView: {
        padding: 5,
        backgroundColor: '#dddddd',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 5,
    }

})

export default LoginScreen