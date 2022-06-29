import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getCashInfoInvestments, getCashInfoOrders, getCashInfoSales } from '../../api';


const CashFlux = (props) => {

  //#region Load main cash info

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

  //#endregion

  //#region Date Picker

  // NOTE: rango de fechas inicial puede ser 1 mes
  const [dates, setDates] = useState({
    dateInitial: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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

  //#endregion

  //#region Filter In-Date info

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

  //#endregion

  //#region Define values to show

  const [investmentTicketTotalNetPrice, setInvestmentTicketTotalNetPrice] = useState(0);
  const [investmentInvoiceTotalNetPrice, setInvestmentInvoiceTotalNetPrice] = useState(0);
  const [ordersTotalNetPrice, setOrderTotalNetPrice] = useState(0);
  const [salesTicketTotalNetPrice, setSalesTicketTotalNetPrice] = useState(0);
  const [salesInvoiceTotalNetPrice, setSalesInvoiceTotalNetPrice] = useState(0);

  const setInvestmentCashInfo = (infoArray) => {
    let sumTicket = 0;
    let sumInvoice = 0;
    infoArray.forEach(element => {
      if (element["investment_ticket"]) {
        sumTicket += element["investment_total_net_price"]
      } else {
        sumInvoice += element["investment_total_net_price"]
      }
    });
    setInvestmentTicketTotalNetPrice(sumTicket);
    setInvestmentInvoiceTotalNetPrice(sumInvoice);
  }

  const setOrdersCashInfo = (infoArray) => {
    let sumValue = 0;
    infoArray.forEach(element => {
      if (element["product_net_price"] && element["order_cuantity"]) {
        sumValue += (element["product_net_price"] * element["order_cuantity"])
      }
    });
    setOrderTotalNetPrice(sumValue);
  }

  const setSalesCashInfo = (infoArray) => {
    let sumTicket = 0;
    let sumInvoice = 0;
    infoArray.forEach(element => {
      if (element["sales_ticket"]) {
        sumTicket += element["sales_total_net_price"]
      } else {
        sumInvoice += element["sales_total_net_price"]
      }
    });
    setSalesTicketTotalNetPrice(sumTicket);
    setSalesInvoiceTotalNetPrice(sumInvoice);
  }


  // NOTE: Probar con async/await como el de editar
  useEffect(() => {

    (async () => {
      setInvestmentCashInfo(inDateInvestmentInfo);
      setOrdersCashInfo(inDateOrdersInfo);
      setSalesCashInfo(inDateSalesInfo);
    })()

  }, [inDateInvestmentInfo]);

  //#endregion

  //#region Filters

  const [ticketFilter, setTicketFilter] = useState("all") // Posible values "all", "ticket", "invoice"
  const [InfoFilter, setInfoFilter] = useState("all") // Possible values "all", "investments", "orders", "sales"

  //#endregion

  return (

    <View>

      <View style={styles.itemPickerContainer}>

        <Picker
          style={styles.picker}
          selectedValue={ticketFilter}
          onValueChange={(itemValue, itemIndex) =>
            setTicketFilter(itemValue)
          }>
          <Picker.Item label="Todos" value="all" key="0" />
          <Picker.Item label="Boleta" value="ticket" key="1" />
          <Picker.Item label="Factura" value="invoice" key="2" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={InfoFilter}
          onValueChange={(itemValue, itemIndex) =>
            setInfoFilter(itemValue)
          }>
          <Picker.Item label="Todos" value="all" key="0" />
          <Picker.Item label="Compras" value="investments" key="1" />
          <Picker.Item label="Pedidos" value="orders" key="2" />
          <Picker.Item label="Ventas" value="sales" key="3" />
        </Picker>

      </View>

      <View style={styles.datePickerContainer}>

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
            testID="dateTimePickerDateInitial"
            value={dates.dateInitial ? dates.dateInitial : new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => handleChange(event, selectedDate, 'dateInitial')}
          />
        ) : null}

        {show.dateFinal ? (
          <DateTimePicker
            testID="dateTimePickerDateFinal"
            value={dates.dateFinal ? dates.dateFinal : new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => handleChange(event, selectedDate, 'dateFinal')}
          />
        ) : null}

      </View>

      {/* INVESTMENT */}
      {((InfoFilter == "all") || (InfoFilter == "investments")) ? (

        <View>

          {((ticketFilter == "all") || (ticketFilter == 'ticket')) ? (

            <View style={styles.itemContainer}>
              <Text style={{ fontWeight: "bold" }}>Gasto neto compras con boleta: </Text>
              {console.log('Changed')}
              <Text>{investmentTicketTotalNetPrice}</Text>
            </View>

          ) : null}

          {((ticketFilter == "all") || (ticketFilter == 'invoice')) ? (

            <View style={styles.itemContainer}>
              <Text style={{ fontWeight: "bold" }}>Gasto neto compras con factura: </Text>
              <Text>{investmentInvoiceTotalNetPrice}</Text>
            </View>

          ) : null}

        </View>) : null}


      {/* ORDERS */}
      {((InfoFilter == "all") || (InfoFilter == "orders")) ? (

        <View>

          <View style={styles.itemContainer}>
            <Text style={{ fontWeight: "bold" }}>Ingreso neto pedidos: </Text>
            <Text>{ordersTotalNetPrice}</Text>
          </View>

        </View>) : null}


      {/* SALES */}
      {((InfoFilter == "all") || (InfoFilter == "sales")) ? (

        <View>

          {((ticketFilter == "all") || (ticketFilter == 'ticket')) ? (

            <View style={styles.itemContainer}>
              <Text style={{ fontWeight: "bold" }}>Ingreso neto ventas con boleta: </Text>
              <Text>{salesTicketTotalNetPrice}</Text>
            </View>

          ) : null}

          {((ticketFilter == "all") || (ticketFilter == 'invoice')) ? (

            <View style={styles.itemContainer}>
              <Text style={{ fontWeight: "bold" }}>Ingreso neto ventas con factura: </Text>
              <Text>{salesInvoiceTotalNetPrice}</Text>
            </View>

          ) : null}

        </View>) : null}

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
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    padding: 20,
    width: '45%'
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  datePickerContainer: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  picker: {
    width: '45%',
    backgroundColor: '#e0e0e0',
  },
  itemPickerContainer: {
    padding: 10,
    marginVertical: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
})

export default CashFlux