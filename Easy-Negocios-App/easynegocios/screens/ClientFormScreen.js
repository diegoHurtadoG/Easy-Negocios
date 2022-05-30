import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import { saveClient } from '../api'

const ClientFormScreen = ({navigation}) => {

  const [client, setClient] = useState({
    client_name: null,
    client_description: null,
  });

  const handleChange = (key, value) => setClient({ ...client, [key]: value });

  const handleSubmit = async () => {
    await saveClient(client);
    navigation.navigate('Home')
  }

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Nombre de Proyecto'
        onChangeText={(text) => handleChange('client_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion del Proyecto (Opcional)'
        onChangeText={(text) => handleChange('client_description', text)}
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

export default ClientFormScreen