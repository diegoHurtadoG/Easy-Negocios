import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

import { useNavigation } from '@react-navigation/native'

const OrderProductRelationItem = (props) => {

  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>

      <TouchableOpacity>
        <Text style={styles.itemTitle}>{props.orderProductRelation.client_name}</Text>
        <Text style={styles.itemTitle}>{props.orderProductRelation.cuantity} {props.orderProductRelation.measure_unit}</Text>
        <Text style={styles.itemTitle}>{props.orderProductRelation.productName}</Text>
        <Text style={styles.itemTitle}>{props.orderProductRelation.delivery_date}</Text>
        <Text style={styles.itemTitle}>{props.orderProductRelation.address}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: 'red', borderRadius: 100, padding: 3}}
        onPress={() => props.handleDelete(props.orderProductRelation.project_id, props.orderProductRelation.id)}>
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

  underline: {
    borderBottomColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
  }
})

export default OrderProductRelationItem