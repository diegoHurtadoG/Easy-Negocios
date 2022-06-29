import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import { saveCategory, getCategory, updateCategory } from '../api'

const CategoryFormScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();

  const [category, setCategory] = useState({
    category_name: null,
    category_description: null,
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (key, value) => setCategory({ ...category, [key]: value });

  useEffect(() => {
    if (route.params && route.params.object_id) {
      navigation.setOptions({ headerTitle: "Actualizando Categoría" });

      setEditing(true);

      (async () => {
        const object = await getCategory(navigation.getState().routes[1].params.project_id, route.params.object_id)
        setCategory({
            category_name: object.category_name,
            category_description: object.category_description,
        })
      })();

    }
  }, [isFocused]);

  const handleSubmit = async () => {
    try {
      // TODO: VALIDATE INFORMATION (nulls, empties, types, etc)
      if (editing) {
        await updateCategory(route.params.object_id, category, navigation.getState().routes[1].params.project_id)
      } else {
        await saveCategory(category, navigation.getState().routes[1].params.project_id);
      }

      navigation.navigate('CategoryListScreen', { project_id: navigation.getState().routes[1].params.project_id })

    } catch (error) {

    }
  }

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Nombre de Categoría'
        onChangeText={(text) => handleChange('category_name', text)}
        value={category.category_name}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion del Categoría (Opcional)'
        onChangeText={(text) => handleChange('category_description', text)}
        value={category.category_description}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editing ? "Actualizar Categoría" : "Agregar Categoría"}</Text>
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

export default CategoryFormScreen