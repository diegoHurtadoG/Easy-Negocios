import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getCashInfoInvestments, getCashInfoOrders, getCashInfoSales } from '../../api'

const CashFlux = (props) => {

  // Obtain cash info

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
    dateInitial: new Date(2022, 0, 1),
    dateFinal: new Date()
  });

  const [show, setShow] = useState({
    dateInitial: false,
    dateFinal: false
  });

  const showDatepicker = (key) => {
    setShow({ ...show, [key]: true });
  };

  const handleChange = (event, selectedDate, key) => {
    setShow({ ...show, [key]: false });
    selectedDate && setDates({ ...dates, [key]: selectedDate });
  }

  // Proccess Cash info


  const [inDateInvestmentInfo, setInDateInvestmentInfo] = useState([]);
  const [inDateOrdersInfo, setInDateOrdersInfo] = useState([]);
  const [inDateSalesInfo, setInDateSalesInfo] = useState([]);


  /* Investment Info Structure

  Array [
    Object {
      "id": 1,
      "investment_date": "2022-05-25T19:17:30.000Z",
      "investment_ticket": 1,
      "investment_total_gross_price": 150,
      "investment_total_net_price": 1337,
    },
    Object {
      "id": 2,
      "investment_date": "2022-04-16T16:34:20.000Z",
      "investment_ticket": 1,
      "investment_total_gross_price": 1200,
      "investment_total_net_price": 1500,
    },
  ] 

  */

  /* Order Info Structure 

  Array [
    Object {
      "id": 1,
      "order_cuantity": 12,
      "order_delivery_date": "2022-05-25T19:17:30.000Z",
      "order_id": 1,
      "order_product_id": 1,
      "product_gross_price": 888,
      "product_net_price": 1111,
    },
    Object {
      "id": 9,
      "order_cuantity": 50,
      "order_delivery_date": "2022-06-07T00:46:51.000Z",
      "order_id": 30,
      "order_product_id": 9,
      "product_gross_price": 4201,
      "product_net_price": 5000,
    },
  ]
  
  */

  /* Sale Info Structure 
  
  Array [
    Object {
      "id": 1,
      "sale_date": "2022-05-25T19:17:30.000Z",
      "sales_id": 1,
      "sales_ticket": 1,
      "sales_total_gross_price": 850,
      "sales_total_net_price": 1000,
    },
  ]
  
  */


  const filterInvestmentsByDate = (dates) => {
    investmentInfo.forEach(element => {

      if (element['investment_date']) {

        const elementDate = new Date(element['investment_date']);
        if (dates.dateInitial && dates.dateFinal) {

          ((elementDate >= dates.dateInitial) && (elementDate <= dates.dateFinal)) ? setInDateInvestmentInfo(prevArray => [...prevArray, element]) : null

        }
      }
    })
  }

  const filterOrdersByDate = (dates) => {

    ordersInfo.forEach(element => {

      if (element['order_delivery_date']) {

        const elementDate = new Date(element['order_delivery_date']);

        if (dates.dateInitial && dates.dateFinal) {

          ((elementDate >= dates.dateInitial) && (elementDate <= dates.dateFinal)) ? setInDateOrdersInfo(prevArray => [...prevArray, element]) : null

        }
      }
    })
  }

  const filterSalesByDate = (dates) => {
    salesInfo.forEach(element => {

      if (element['sale_date']) {

        const elementDate = new Date(element['sale_date']);

        if (dates.dateInitial && dates.dateFinal) {

          ((elementDate >= dates.dateInitial) && (elementDate <= dates.dateFinal)) ? setInDateSalesInfo(prevArray => [...prevArray, element]) : null

        }
      }
    })
  }

  useEffect(() => {

    // Only runs when closing date modal
    if (!(show.dateFinal || show.dateInitial)) {
      
      setInDateInvestmentInfo([]);
      setInDateOrdersInfo([]);
      setInDateSalesInfo([]);

      filterInvestmentsByDate(dates);
      filterOrdersByDate(dates);
      filterSalesByDate(dates);
    }



  }, [show]);


  return (

    <View>

      {/* <INVESTMENTS> */}
      <View style={styles.itemContainer}>

        <TouchableOpacity
          styles={styles.button}
          onPress={() => showDatepicker('dateInitial')}>
          <Text style={styles.buttonText}>{dates.dateInitial ? dates.dateInitial.toDateString() : "Fecha Inicial"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          styles={styles.button}
          onPress={() => showDatepicker('dateFinal')}>
          <Text style={styles.buttonText}>{dates.dateFinal ? dates.dateFinal.toDateString() : "Fecha Final"}</Text>
        </TouchableOpacity>

        {show.dateInitial ? (
          <DateTimePicker
            testID="dateTimePickerInvestmentInitial"
            value={dates.dateInitial ? dates.dateInitial : new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => handleChange(event, selectedDate, 'dateInitial')}
          />
        ) : null}

        {show.dateFinal ? (
          <DateTimePicker
            testID="dateTimePickerInvestmentFinal"
            value={dates.dateFinal ? dates.dateFinal : new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => handleChange(event, selectedDate, 'dateFinal')}
          />
        ) : null}

      </View>


      <View>
        {/* console.log(inDateInvestmentInfo) */}
        <Text>Investments</Text>
      </View>

      {/* <INVESTMENTS/> */}


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