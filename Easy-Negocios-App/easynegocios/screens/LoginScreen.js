import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useAuth from '../components/Hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <View>
                <Text style={styles.descriptionText}>Administra tus productos, clientes, ventas, pedidos y mas con esta herramienta</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 100, textAlign: 'center' }}> Iniciar Sesion </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>

            <View style={{ padding: 30 }}>
                <TouchableOpacity onPress={signInWithGoogle} style={styles.ProjectHomeButton}>
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> Ingresar Con Google </Text>
                </TouchableOpacity>
            </View>

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
        width: '75%',
        color: '#000000',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        padding: 30,
    }

})

export default LoginScreen