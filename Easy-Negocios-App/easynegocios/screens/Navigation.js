import { View, Text, TouchableOpacity } from 'react-native'
import { getPathFromState, NavigationContainer, useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen';
import ProjectFormScreen from './ProjectFormScreen';
import ProjectHomeScreen from './ProjectHomeScreen';
import ProductListScreen from './ProductListScreen';
import ProductFormScreen from './ProductFormScreen';
import ClientListScreen from './ClientListScreen';
import ClientFormScreen from './ClientFormScreen';
import SaleProductRelationListScreen from './SaleProductRelationListScreen';
import SaleProductRelationFormScreen from './SaleProductRelationFormScreen';
import InvestmentListScreen from './InvestmentListScreen';
import InvestmentFormScreen from './InvestmentFormScreen';
import OrderProductRelationListScreen from './OrderProductRelationListScreen';
import OrderProductRelationFormScreen from './OrderProductRelationFormScreen';
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
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('ProductFormScreen')}>
                                <Text>Agregar</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                />
                <Stack.Screen
                    name="ProductFormScreen"
                    component={ProductFormScreen}
                    options={({ navigation }) => ({
                        title: 'Nuevo Producto',
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
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('ClientFormScreen')}>
                                <Text>Agregar</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                />
                <Stack.Screen
                    name="ClientFormScreen"
                    component={ClientFormScreen}
                    options={({ navigation }) => ({
                        title: 'Nuevo Cliente',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="SaleProductRelationListScreen"
                    component={SaleProductRelationListScreen}
                    options={({ navigation }) => ({
                        title: 'Ventas',
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('SaleProductRelationFormScreen')}>
                                <Text>Agregar</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                />
                <Stack.Screen
                    name="SaleProductRelationFormScreen"
                    component={SaleProductRelationFormScreen}
                    options={({ navigation }) => ({
                        title: 'Nueva venta',
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
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('InvestmentFormScreen')}>
                                <Text>Agregar</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                />
                <Stack.Screen
                    name="InvestmentFormScreen"
                    component={InvestmentFormScreen}
                    options={({ navigation }) => ({
                        title: 'Nueva Inversion',
                        headerTitleAlign: 'center',
                    })
                    }
                />
                <Stack.Screen
                    name="OrderProductRelationListScreen"
                    component={OrderProductRelationListScreen}
                    options={({ navigation }) => ({
                        title: 'Pedidos',
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('OrderProductRelationFormScreen')}>
                                <Text>Agregar</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                />
                <Stack.Screen
                    name="OrderProductRelationFormScreen"
                    component={OrderProductRelationFormScreen}
                    options={({ navigation }) => ({
                        title: 'Nuevo Pedido',
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