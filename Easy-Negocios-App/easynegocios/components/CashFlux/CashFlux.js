import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getCashInfoInvestments, getCashInfoOrders, getCashInfoSales } from '../../api'

const CashFlux = (props) => {

  const [investmentInfo, setInvestmentInfo] = useState([]);
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [salesInfo, setSalesInfo] = useState([]);

  const isFocused = useIsFocused();

  const loadInvestmentInfo = async (id) => {
    const data = await getCashInfoInvestments(id);
    setInvestmentInfo(data);
  };

  const loadOrdersInfo = async (id) => {
    const data = await getCashInfoOrders(id);
    setOrdersInfo(data);
  };

  const loadSalesInfo = async (id) => {
    const data = await getCashInfoSales(id);
    setSalesInfo(data);
  };

  // Every time the screen loads, the useEffect runs
  useEffect(() => {

    loadInvestmentInfo(props.data.route.params.project_id);
    loadOrdersInfo(props.data.route.params.project_id);
    loadSalesInfo(props.data.route.params.project_id);

  }, [isFocused]);


  // Date Time Picker

  const [dates, setDates] = useState({
    investmentInitial: null,
    investmentFinal: null,
    ordersInitial: null,
    ordersFinal: null,
    salesInitial: null,
    salesFinal: null
  });

  const [show, setShow] = useState({
    investmentInitial: false,
    investmentFinal: false,
    ordersInitial: false,
    ordersFinal: false,
    salesInitial: false,
    salesFinal: false,
  });

  const showDatepicker = (key) => {
    setShow({ ...show, [key]: true });
  };

  const handleChange = (event, selectedDate, key) => {
    setShow({ ...show, [key]: false });
    selectedDate && setDates({ ...dates, [key]: selectedDate });
  }


  return (

    <View>

      <View> {/** Investments View */}

        <View style={styles.itemContainer}>

          <TouchableOpacity
            styles={styles.button}
            onPress={() => showDatepicker('investmentInitial')}>
            <Text style={styles.buttonText}>{dates.investmentInitial ? dates.investmentInitial.toDateString() : "Fecha Inicial"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            styles={styles.button}
            onPress={() => showDatepicker('investmentFinal')}>
            <Text style={styles.buttonText}>{dates.investmentFinal ? dates.investmentFinal.toDateString() : "Fecha Final"}</Text>
          </TouchableOpacity>

          {show.investmentInitial && (
            <DateTimePicker
              testID="dateTimePickerInvestmentInitial"
              value={dates.investmentInitial ? dates.investmentInitial : new Date()}
              mode={'date'}
              is24Hour={true}
              onChange={(event, selectedDate) => handleChange(event, selectedDate, 'investmentInitial')}
            />
          )}

          {show.investmentFinal && (
            <DateTimePicker
              testID="dateTimePickerInvestmentFinal"
              value={dates.investmentFinal ? dates.investmentFinal : new Date()}
              mode={'date'}
              is24Hour={true}
              onChange={(event, selectedDate) => handleChange(event, selectedDate, 'investmentFinal')}
            />
          )}

        </View>

        <View>
          <Text>Investments</Text>
        </View>

      </View>

    </View>

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
  },
  itemContainer: {
    padding: 15,
    marginVertical: 30,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  }
})

export default CashFlux