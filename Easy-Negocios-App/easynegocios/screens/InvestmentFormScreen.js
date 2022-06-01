import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker'

import Layout from '../components/Layout'
import { saveInvestment } from '../api'

const InvestmentFormScreen = ({ navigation }) => {

  const isFocused = useIsFocused();

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
    //
  }, [isFocused]);

  const handleSubmit = async () => {
    investment.cuantity = parseInt(investment.cuantity)
    investment.total_net_price = parseInt(investment.total_net_price)
    investment.total_gross_price = parseInt(investment.total_net_price / 1.19)
    await saveInvestment(investment, navigation.getState().routes[1].params.project_id);
    navigation.navigate('InvestmentListScreen', { project_id: navigation.getState().routes[1].params.project_id })
  }

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Monto (neto) de compra'
        keyboardType='number-pad'
        onChangeText={(text) => handleChange('total_net_price', text.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion de la compra (opcional)'
        onChangeText={(text) => handleChange('investment_description', text)}
      />
      <Picker
        style={{ width: '90%' }}
        selectedValue={investment.ticket}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('ticket', itemValue)
        }>
        <Picker.Item label="Omitir" value={null} key={null} />
        <Picker.Item label="Boleta" value={1} key={1} />
        <Picker.Item label="Factura" value={0} key={0} />
      </Picker>
      <Picker
        style={{ width: '90%' }}
        selectedValue={investment.owned_product}
        onValueChange={(itemValue, itemIndex) =>
          handleChange('owned_product', itemValue)
        }>
        <Picker.Item label="Omitir" value={null} key={null} />
        <Picker.Item label="Compra y Venta" value={1} key={1} />
        <Picker.Item label="No es compra y venta" value={0} key={0} />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder='Cantidad'
        keyboardType='number-pad'
        onChangeText={(text) => handleChange('cuantity', text.replace(/[^0-9]/g, ''))}
      />
      {/* Date Picker Missing, also re-order the fields so the FE is optimal */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Compra</Text>
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