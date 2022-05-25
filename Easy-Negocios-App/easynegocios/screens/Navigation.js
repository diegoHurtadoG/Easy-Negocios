import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen';
import ProjectFormScreen from './ProjectFormScreen';
import ProjectHomeScreen from './ProjectHomeScreen';
import ProductListScreen from './ProductListScreen';
import ClientListScreen from './ClientListScreen';
import SalesListScreen from './SalesListScreen';
import InvestmentListScreen from './InvestmentListScreen';
import OrderListScreen from './OrderListScreen';
import StockListScreen from './StockListScreen';
import CashFluxScreen from './CashFluxScreen';
import React from 'react';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: 'Easy - Negocios',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProjectForm')}>
                                <Text>Nuevo Proyecto</Text>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen
                    name="ProjectForm"
                    component={ProjectFormScreen}
                    options={() => ({
                        title: 'Crea un Proyecto',
                        headerTitleAlign: 'center',
                    })
                    } />
                <Stack.Screen
                    name="ProjectHomeScreen"
                    component={ProjectHomeScreen}
                    options={({ navigation }) => ({
                        title: 'Administracion',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="ProductListScreen"
                    component={ProductListScreen}
                    options={({ navigation }) => ({
                        title: 'Productos',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="ClientListScreen"
                    component={ClientListScreen}
                    options={({ navigation }) => ({
                        title: 'Clientes',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="SalesListScreen"
                    component={SalesListScreen}
                    options={({ navigation }) => ({
                        title: 'Ventas',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="InvestmentListScreen"
                    component={InvestmentListScreen}
                    options={({ navigation }) => ({
                        title: 'Compras',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="OrderListScreen"
                    component={OrderListScreen}
                    options={({ navigation }) => ({
                        title: 'Pedidos',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="StockListScreen"
                    component={StockListScreen}
                    options={({ navigation }) => ({
                        title: 'Stock',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="CashFluxScreen"
                    component={CashFluxScreen}
                    options={({ navigation }) => ({
                        title: 'Flujo de Caja',
                        headerTitleAlign: 'center',
                    })
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;