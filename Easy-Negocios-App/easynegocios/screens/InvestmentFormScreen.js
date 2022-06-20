import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker'

import Layout from '../components/Layout'
import { saveInvestment, getInvestment, updateInvestment } from '../api'

const InvestmentFormScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();

  const [editing, setEditing] = useState(false);

  const [investment, setInvestment] = useState({
    total_net_price: null,
    total_gross_price: null,
    ticket: null,
    investment_description: null,
    owned_product: null,
    cuantity: null
  });

  const handleChange = (key, value) => setInvestment({ ...investment, [key]: value });

  useEffect(() => {
    if (route.params && route.params.object_id) {
      navigation.setOptions({ headerTitle: "Actualizando Compra" });

      setEditing(true);

      (async () => {
        const object = await getInvestment(navigation.getState().routes[1].params.project_id, route.params.object_id)
        setInvestment({
          total_net_price: object.total_net_price.toString(),
          total_gross_price: object.total_gross_price.toString(),
          ticket: object.ticket,
          investment_description: object.investment_description,
          owned_product: object.owned_product,
          cuantity: object.cuantity.toString()
        })
      })();
    }
  }, [isFocused]);

  const handleSubmit = async () => {

    try {
      // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)

      investment.cuantity = parseInt(investment.cuantity)
      investment.total_net_price = parseInt(investment.total_net_price)
      investment.total_gross_price = parseInt(investment.total_net_price / 1.19)

      console.log(investment)

      if (editing) {
        await updateInvestment(route.params.object_id, investment, navigation.getState().routes[1].params.project_id)
      } else {
        await saveInvestment(investment, navigation.getState().routes[1].params.project_id);
      }
      navigation.navigate('InvestmentListScreen', { project_id: navigation.getState().routes[1].params.project_id })

    } catch (error) {

    }

  }

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Monto (neto) de compra'
        keyboardType='number-pad'
        onChangeText={(text) => handleChange('total_net_price', text.replace(/[^0-9]/g, ''))}
        value={investment.total_net_price}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion de la compra (opcional)'
        onChangeText={(text) => handleChange('investment_description', text)}
        value={investment.investment_description}
      />
      <Picker
        style={{ width: '90%' }}
        selectedValue={investment.ticket}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('ticket', itemValue)
        }>
        <Picker.Item label="Boleta" value={1} key={1} />
        <Picker.Item label="Factura" value={0} key={0} />
        <Picker.Item label="Omitir" value={null} key={null} />
        <Picker.Item label="Boleta o Factura" value={null} key={null} />
      </Picker>
      <Picker
        style={{ width: '90%' }}
        selectedValue={investment.owned_product}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('owned_product', itemValue)
        }>
        <Picker.Item label="Compra y Venta" value={1} key={1} />
        <Picker.Item label="No es compra y venta" value={0} key={0} />
        <Picker.Item label="Omitir" value={0} key={null} />
        <Picker.Item label="Tipo de Compra" value={0} key={null} />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder='Cantidad'
        keyboardType='number-pad'
        onChangeText={(text) => handleChange('cuantity', text.replace(/[^0-9]/g, ''))}
        value={investment.cuantity}
      />
      {/* TODO: Date Picker Missing, also re-order the fields so the FE is optimal */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editing ? "Actualizar Compra" : "Guardar Compra"}</Text>
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

export default InvestmentFormScreen