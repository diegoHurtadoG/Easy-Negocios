import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Layout from '../components/Layout'
import { saveOrderProductRelation, getClients, getProducts, getOrderProductRelation, updateOrderProductRelation } from '../api'

const OrderProductRelationFormScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();

  const [editing, setEditing] = useState(false);

  /* TODO: Add multiple Relations to one Order, to do this, a change in the query must be needed
              a change in the information structure too and also a change in mentality. */
  const [orderProductRelation, setOrderProductRelation] = useState({
    product_id: null,
    cuantity: null,
    client_id: null,
    delivery_date: new Date(),
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

  const handleChange = (key, value) => setOrderProductRelation({ ...orderProductRelation, [key]: value });

  useEffect(() => {
    loadClients(navigation.getState().routes[1].params.project_id)
    loadProducts(navigation.getState().routes[1].params.project_id)

    if (route.params && route.params.object_id) {
      navigation.setOptions({ headerTitle: "Actualizando Pedido" });

      setEditing(true);

      (async () => {
        const object = await getOrderProductRelation(navigation.getState().routes[1].params.project_id, route.params.object_id)
        setOrderProductRelation({
          product_id: object.product_id,
          cuantity: object.cuantity.toString(),
          client_id: object.client_id,
          delivery_date: object.delivery_date ? new Date(object.delivery_date.slice(0, 19)) : new Date(),
          order_description: object.order_description,
          address: object.address
        })
      })();
    }

  }, [isFocused]);



  const handleSubmit = async () => {

    try {

      // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)
      orderProductRelation.cuantity = parseInt(orderProductRelation.cuantity);

      if (orderProductRelation.delivery_date) {
        orderProductRelation.delivery_date = orderProductRelation.delivery_date.toISOString().slice(0, 19).replace('T', ' ')
      } else { // In this case it can be null (valid) or undefined, if its undefined, we need it to be null.
        orderProductRelation.delivery_date = null
      }

      if (editing) {
        await updateOrderProductRelation(route.params.object_id, orderProductRelation, navigation.getState().routes[1].params.project_id);
      } else {
        await saveOrderProductRelation(orderProductRelation, navigation.getState().routes[1].params.project_id);
      }

      navigation.navigate('OrderProductRelationListScreen', { project_id: navigation.getState().routes[1].params.project_id })

    } catch (error) {
      console.error(error);
    }

  }

  // Date Time picker from here below

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    selectedDate && handleChange('delivery_date', selectedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Layout>

      <Picker
        style={{ width: '90%' }}
        selectedValue={orderProductRelation.client_id}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('client_id', itemValue)
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

      {/** DATE TIME BEGINS */}
      <View style={styles.itemContainer}>

        <TouchableOpacity
          styles={styles.button}
          onPress={showDatepicker}>
          <Text style={styles.buttonText}>Selecciona Fecha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          styles={styles.button}
          onPress={showTimepicker}>
          <Text style={styles.buttonText}>Selecciona Hora</Text>
        </TouchableOpacity>

      </View>

      <View>

        <Text>Fecha: {orderProductRelation.delivery_date ? orderProductRelation.delivery_date.toLocaleString() : "No seleccionada"}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePickerORDER"
            value={orderProductRelation.delivery_date ? orderProductRelation.delivery_date : new Date()}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      {/** DATE TIME ENDS */}

      <TextInput
        style={styles.input}
        placeholder='Descripcion de pedido'
        onChangeText={(text) => handleChange('order_description', text)}
        value={orderProductRelation.order_description}
      />

      <TextInput
        style={styles.input}
        placeholder='Direccion de pedido'
        onChangeText={(text) => handleChange('address', text)}
        value={orderProductRelation.address}
      />

      {/* TODO: De aqui para arriba es una order, de aqui para abajo son mas order_product_relations (hacer un boton "+" para agregar) */}
      <Picker
        style={{ width: '90%' }}
        selectedValue={orderProductRelation.product_id}
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
        value={orderProductRelation.cuantity}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editing ? "Actualizar Pedido" : "Guardar Pedido"}</Text>
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
  },
  itemContainer: {
    padding: 15,
    marginVertical: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  }
})

export default OrderProductRelationFormScreen