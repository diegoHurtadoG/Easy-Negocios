import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import { saveProject } from '../api'
import useAuth from '../components/Hooks/useAuth'

const ProjectFormScreen = ({ navigation }) => {

  const [project, setProject] = useState({
    project_name: null,
    project_description: null,
    user_uid: null,
  });

  const { user } = useAuth();

  const handleChange = (key, value) => setProject({ ...project, [key]: value });

  useEffect(() => {
    handleChange('user_uid', user.uid);
  }, [user]);

  const handleSubmit = async () => {
    await saveProject(project);
    navigation.navigate('Home')
  }

  return (
    <Layout>
      <TextInput
        autoCapitalize='words'
        style={styles.input}
        placeholder='Nombre de Proyecto'
        onChangeText={(text) => handleChange('project_name', text)}
      />
      <TextInput
        autoCapitalize='words'
        style={styles.input}
        placeholder='Descripcion del Proyecto (Opcional)'
        onChangeText={(text) => handleChange('project_description', text)}
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

export default ProjectFormScreen