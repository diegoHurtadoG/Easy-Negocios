import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

const InvestmentItem = (props) => {

  const [modalShow, setModalShow] = useState(false);
  const navigation = useNavigation()

  return (

    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalShow}
          onRequestClose={() => {
            setModalShow(!modalShow);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.itemTitle}> Confirmar la eliminacion de la Compra </Text>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    props.handleDelete(props.investment.project_id, props.investment.id)
                    setModalShow(!modalShow)
                  }}
                >
                  <Text style={styles.textStyle}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalShow(!modalShow)
                  }}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.itemContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('InvestmentFormScreen', { object_id: props.investment.id })}>
          <Text style={styles.itemTitle}>{props.investment.investment_description}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: 'red', borderRadius: 100, padding: 3 }}
          onPress={() => setModalShow(true)}>
          <Text style={styles.itemTitle}> X </Text>
        </TouchableOpacity>

      </View>
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
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: 'stretch',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

export default InvestmentItem