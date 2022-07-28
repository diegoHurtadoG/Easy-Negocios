import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import Layout from "../components/Layout"

import { useNavigation } from '@react-navigation/native'

const ProjectHomeScreen = (props) => {

    const navigation = useNavigation()

    useEffect(() => {
        if (props.route.params && props.route.params.project_id) {
            props.navigation.setOptions({ title: props.route.params.project_name });
        }
    })

    return (
        <Layout>
            <View style={styles.itemContainer}>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Productos"
                    accessibilityHint="Ir a pantalla de productos"
                    onPress={() => navigation.navigate('ProductListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Productos</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Clientes"
                    accessibilityHint="Ir a pantalla de clientes"
                    onPress={() => navigation.navigate('ClientListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Clientes</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Ventas"
                    accessibilityHint="Ir a pantalla de Ventas"
                    onPress={() => navigation.navigate('SaleProductRelationListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Ventas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Compras"
                    accessibilityHint="Ir a pantalla de Compras"
                    onPress={() => navigation.navigate('InvestmentListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Compras</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Pedidos"
                    accessibilityHint="Ir a pantalla de Pedidos"
                    onPress={() => navigation.navigate('OrderProductRelationListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ProjectHomeButton}
                    accessibilityLabel="Stock"
                    accessibilityHint="Ir a pantalla de Stock"
                    onPress={() => navigation.navigate('StockListScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Stock</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.GenerateCashFlux}
                    accessibilityLabel="Generar Flujo de Caja"
                    accessibilityHint="Genera un flujo de caja con la informacion del proyecto"
                    onPress={() => navigation.navigate('CashFluxScreen', { project_id: props.route.params.project_id })}>
                    <Text style={styles.ProjectHomeText}>Generar Flujo de Caja</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        marginVertical: 30,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    ProjectHomeButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        padding: 20,
        width: '45%'
    },

    ProjectHomeText: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    GenerateCashFlux: {
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        padding: 20,
        width: '100%'
    }
})

export default ProjectHomeScreen