import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen';
import ProjectFormScreen from './ProjectFormScreen';
import ProjectHomeScreen from './ProjectHomeScreen';
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;