import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'

import Layout from '../components/Layout'
import { saveProduct, getCategories } from '../api'

const ProductFormScreen = ({ navigation, route }) => {

    const [product, setProduct] = useState({
        product_name: null,
        category_id: null,
        product_description: null,
        net_price: null,
        gross_price: null,
        stock: null,
        measure_unit: null
    });

    const isFocused = useIsFocused();

    const [categories, setCategories] = useState([]);

    const loadCategories = async (id) => {
        const data = await getCategories(id);
        setCategories(data);
    };

    useEffect(() => {
        // When confused, clg with navigation.getState(), maybe state can change and [1] wont be valid
        loadCategories(navigation.getState().routes[1].params.project_id);
    }, [isFocused]);


    const handleChange = (key, value) => setProduct({ ...product, [key]: value });

    const handleSubmit = async () => {
        product.stock = parseInt(product.stock)
        product.net_price = parseInt(product.net_price)
        product.gross_price = parseInt(product.net_price / 1.19)
        if (product.category_id) {
            product.category_id = parseInt(product.category_id)
        }
        await saveProduct(product, navigation.getState().routes[1].params.project_id);
        navigation.navigate('ProductListScreen', { project_id: navigation.getState().routes[1].params.project_id })
    }

    return (
        <Layout>
            <TextInput
                autoCapitalize='words'
                style={styles.input}
                placeholder='Nombre del Producto'
                onChangeText={(text) => handleChange('product_name', text)}
            />
            <Picker
                style={{ width: '90%' }}
                selectedValue={product.category_id}
                onValueChange={(itemValue, itemIndex) =>
                    handleChange('category_id', itemValue)
                }>
                <Picker.Item label="Ninguna" value={null} key="None" />
                {categories !== "" ? (
                    categories.map(category => {
                        return <Picker.Item label={category.category_name} value={category.id} key={category.id} />;
                    })
                ) : (
                    <Picker.Item label="Cargando..." value={null} />
                )}
            </Picker>
            <TextInput
                style={styles.input}
                autoCapitalize='sentences'
                placeholder='Descripcion del Producto (Opcional)'
                onChangeText={(text) => handleChange('product_description', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Precio de venta'
                keyboardType='number-pad'
                onChangeText={(text) => handleChange('net_price', text.replace(/[^0-9]/g, ''))}
            />
            <TextInput
                style={styles.input}
                placeholder='Stock'
                keyboardType='number-pad'
                onChangeText={(text) => handleChange('stock', text.replace(/[^0-9]/g, ''))}
            />
            <TextInput
                style={styles.input}
                placeholder='Unidad de Medida'
                onChangeText={(text) => handleChange('measure_unit', text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar Producto</Text>
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