import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import Layout from '../components/Layout'
import { saveSaleProductRelation, getProducts } from '../api'

const SaleProductRelationFormScreen = ({navigation}) => {
  
  const isFocused = useIsFocused();

  const [saleProductRelation, setSaleProductRelation] = useState({
    product_id: null,
    cuantity: null,
    total_net_price: null,
    total_gross_price: null,
    ticket: true,
    sale_description: null,
    sale_date: null
  });

  const [products, setProducts] = useState([]);

  const loadProducts = async (id) => {
    const data = await getProducts(id);
    setProducts(data);
  };

  useEffect(() => {
    loadProducts(navigation.getState().routes[1].params.project_id)
  }, [isFocused]);

  const handleChange = (key, value) => setSaleProductRelation({ ...saleProductRelation, [key]: value });

  const handleSubmit = async () => {
    // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)

    // This forEach might need a change when adding multiple relations to a sale. For may be used in the saleProductRelation
    products.forEach(product => {
      if (product.id == saleProductRelation.product_id) {
        saleProductRelation.total_net_price = product.net_price * saleProductRelation.cuantity
        saleProductRelation.total_gross_price = parseInt(saleProductRelation.total_net_price / 1.19)
      }
    });

    await saveSaleProductRelation(saleProductRelation, navigation.getState().routes[1].params.project_id);
    navigation.navigate('SaleProductRelationListScreen', { project_id: navigation.getState().routes[1].params.project_id })
  }

  return (
    <Layout>
      <Picker
        style={{ width: '90%' }}
        selectedValue={saleProductRelation.product_id}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('product_id', itemValue)
        }>
        <Picker.Item label="Seleccione Producto" value={null} key="None" />
        {products !== "" ? (
          products.map(product => {
            return <Picker.Item label={product.product_name} value={product.id} key={product.id} />;
          })
        ) : (
          <Picker.Item label="Cargando..." value={null} />
        )}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType='number-pad'
        onChangeText={(text) => handleChange('cuantity', text.replace(/[^0-9]/g, ''))}
      />
      {/* TODO: Date Picker con fecha de entrega */}
      <Picker
        style={{ width: '90%' }}
        selectedValue={saleProductRelation.ticket}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('ticket', itemValue)
        }>
        <Picker.Item label="Boleta" value={true} key="1" />
        <Picker.Item label="Factura" value={false} key="0" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder='Descripcion de venta'
        onChangeText={(text) => handleChange('sale_description', text)}
      />
      {/* TODO: Separar lo que es una sale (ticket, descripcion) de la relacion (producto, cantidad) para guardar bien en la BDD */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Venta</Text>
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

export default SaleProductRelationFormScreen