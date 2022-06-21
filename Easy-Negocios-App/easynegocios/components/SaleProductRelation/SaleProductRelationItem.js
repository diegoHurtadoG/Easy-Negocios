import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

import { useNavigation } from '@react-navigation/native'

const SaleProductRelationItem = (props) => {

  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>

      <TouchableOpacity onPress={() => navigation.navigate('SaleProductRelationFormScreen', { object_id: props.saleProductRelation.id })}>
        <Text style={styles.itemTitle}>{props.saleProductRelation.productName}</Text>
        <Text style={styles.itemTitle}>{props.saleProductRelation.cuantity} {props.saleProductRelation.measure_unit ? props.saleProductRelation.measure_unit : ''}</Text>
        <Text style={styles.itemTitle}>{props.saleProductRelation.sale_description ? props.saleProductRelation.sale_description : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: 'red', borderRadius: 100, padding: 3 }}
        onPress={() => props.handleDelete(props.saleProductRelation.project_id, props.saleProductRelation.id)}>
        <Text style={styles.itemTitle}> X </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e0e0e0',
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

  underline: {
    borderBottomColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  }
})

export default SaleProductRelationItem