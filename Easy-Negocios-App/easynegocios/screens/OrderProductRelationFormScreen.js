import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'

import Layout from '../components/Layout'
import { saveOrderProductRelation, getClients, getProducts } from '../api'

const OrderProductRelationFormScreen = ({ navigation }) => {

  const isFocused = useIsFocused();

/*
  const [orderProductRelation, setOrderProductRelation] = useState({
    order_id: null,
    product_id: null,
    cuantity: null
  });
*/

/*
  const [order, setOrder] = useState({
    client_id: null,
    delivery_date: null,
    order_description: null,
    address: null
  });
*/


/* TODO: Add multiple Relations to one Order, to do this, a change in the query must be needed
            a change in the information structure too and also a change in mentality. */
  const [orderProductRelation, setOrderProductRelation] = useState({
    product_id: null,
    cuantity: null,
    client_id: null,
    delivery_date: null,
    order_description: null,
    address: null
  });

  const [clients, setClients] = useState([]);

  const [products, setProducts] = useState([]);

  const loadClients = async (id) => {
    const data = await getClients(id);
    setClients(data);
  };

  const loadProducts = async (id) => {
    const data = await getProducts(id);
    setProducts(data);
  };

  const handleChangeRelation = (key, value) => setOrderProductRelation({ ...orderProductRelation, [key]: value });
  
  //const handleChange = (key, value) => setOrder({ ...order, [key]: value });

  useEffect(() => {
    loadClients(navigation.getState().routes[1].params.project_id)
    loadProducts(navigation.getState().routes[1].params.project_id)
  }, [isFocused]);



  const handleSubmit = async () => {
    // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)

    saveOrderProductRelation(orderProductRelation, navigation.getState().routes[1].params.project_id);
    navigation.navigate('OrderProductRelationListScreen', { project_id: navigation.getState().routes[1].params.project_id })
  }

  return (
    <Layout>
      <Picker
        style={{ width: '90%' }}
        selectedValue={orderProductRelation.client_id}
        onValueChange={(itemValue, itemIndex) =>
          handleChangeRelation('client_id', itemValue)
        }>
        <Picker.Item label="Seleccione Cliente" value={null} key="None" />
        {clients !== "" ? (
          clients.map(client => {
            return <Picker.Item label={client.client_name} value={client.id} key={client.id} />;
          })
        ) : (
          <Picker.Item label="Cargando..." value={null} />
        )}
      </Picker>
      {/* TODO: Date Picker con fecha de entrega */}
      <TextInput
        style={styles.input}
        placeholder='Descripcion de pedido'
        onChangeText={(text) => handleChangeRelation('order_description', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Direccion de pedido'
        onChangeText={(text) => handleChangeRelation('address', text)}
      />
      {/* TODO: De aqui para arriba es una order, de aqui para abajo son mas order_product_relations (hacer un boton "+" para agregar) */}
      <Picker
        style={{ width: '90%' }}
        selectedValue={orderProductRelation.product_id}
        onValueChange={(itemValue, itemIndex) =>
          handleChangeRelation('product_id', itemValue)
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
        onChangeText={(text) => handleChangeRelation('cuantity', text.replace(/[^0-9]/g, ''))}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Pedido</Text>
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

export default OrderProductRelationFormScreen