import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import { saveProduct } from '../api'

const ProductFormScreen = ({ navigation }) => {

    const [product, setProduct] = useState({
        product_name: null,
        category_id: null,
        product_description: null,
        net_price: null,
        gross_price: null,
        stock: null,
        measure_unit: null
    });

    const handleChange = (key, value) => setProduct({ ...product, [key]: value });

    const handleSubmit = async () => {
        await saveProduct(product);
        navigation.navigate('Home')
    }

    return (
        <Layout>
            <TextInput
                style={styles.input}
                placeholder='Nombre de Proyecto'
                onChangeText={(text) => handleChange('product_name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Descripcion del Proyecto (Opcional)'
                onChangeText={(text) => handleChange('product_description', text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar Proyecto</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        fontSize: 16,
        marginBottom: 40,
        height: 30,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderBottomColor: '#000000',
        padding: 4,
        flexWrap: 'wrap',
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: '#e0e0e0',
        width: '50%',
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
    }
})

export default ProductFormScreen