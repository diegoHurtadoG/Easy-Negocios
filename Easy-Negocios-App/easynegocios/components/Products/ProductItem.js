import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native'

const ProductItem = (props) => {

  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>

      <TouchableOpacity onPress={() => navigation.navigate('ProductFormScreen', { object_id: props.product.id })}>
        <Text style={styles.itemTitle}>{props.product.product_name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: 'red', borderRadius: 100, padding: 3}}
        onPress={() => props.handleDelete(props.product.project_id, props.product.id)}>
        <Text style={styles.itemTitle}> X </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e0e0e0' ,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemTitle: {
    fontWeight: 'bold',
    color: '#000000',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
})

export default ProductItem