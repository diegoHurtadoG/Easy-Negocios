import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Navigation from './screens/Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './components/Hooks/useAuth'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>

  )
}

export default App