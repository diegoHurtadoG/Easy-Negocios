import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native'

import Layout from '../components/Layout';
import ProductList from '../components/Products/ProductList';

const ProductListScreen = (props) => {

    const navigation = useNavigation()

    return (
    <Layout>

        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('CategoryListScreen', { project_id: props.route.params.project_id })}>
            <Text style={styles.ButtonText}>Administrar Categorías</Text>
        </TouchableOpacity>

        <ProductList data={props} />
    </Layout>
    )
};

const styles = StyleSheet.create({

    Button: {
        backgroundColor: '#c0c0c0',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        borderWidth: 1
    },

    ButtonText: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    itemTitle: {
        fontWeight: 'bold',
        color: '#000000',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
      },
})

export default ProductListScreen;