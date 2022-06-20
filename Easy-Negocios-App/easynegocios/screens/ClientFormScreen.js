import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import { saveClient, getClient, updateClient } from '../api'

const ClientFormScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();

  const [client, setClient] = useState({
    client_name: null,
    client_description: null,
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (key, value) => setClient({ ...client, [key]: value });

  useEffect(() => {
    if (route.params && route.params.object_id) {
      navigation.setOptions({ headerTitle: "Actualizando Cliente" });

      setEditing(true);

      (async () => {
        const object = await getClient(navigation.getState().routes[1].params.project_id, route.params.object_id)
        setClient({
          client_name: object.client_name,
          client_description: object.client_description,
        })
      })();

    }
  }, [isFocused]);

  const handleSubmit = async () => {
    try {
      // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)
      if (editing) {
        await updateClient(route.params.object_id, client, navigation.getState().routes[1].params.project_id)
      } else {
        await saveClient(client, navigation.getState().routes[1].params.project_id);
      }

      navigation.navigate('ClientListScreen', { project_id: navigation.getState().routes[1].params.project_id })

    } catch (error) {

    }
  }

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Nombre de Cliente'
        onChangeText={(text) => handleChange('client_name', text)}
        value={client.client_name}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion del Cliente (Opcional)'
        onChangeText={(text) => handleChange('client_description', text)}
        value={client.client_description}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editing ? "Actualizar Cliente" : "Agregar Cliente"}</Text>
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