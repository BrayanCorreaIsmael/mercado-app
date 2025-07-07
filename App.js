"use client"

import { StyleSheet, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Auth from "./components/Auth"
import ProductsPage from "./components/products"
import ProfilePage from "./components/profile"
import HomeScreen from "./components/homeScreen"
import Home from "./components/home"
import DetailProducts from "./components/detailProducts"

const Stack = createStackNavigator()

// Configuración de linking (solo afecta web)
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Auth: '',
      Products: 'products',
      Profile: 'profile',
      Home: 'home',
      HomeScreen: 'panelUsuario',
      DetailProducts: 'detailProducts/:productoId',
    },
  },
}

function AppNavigator() {
  return (
    <NavigationContainer linking={linking} fallback={<SafeAreaView><></></SafeAreaView>}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Products" component={ProductsPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="PanelUsuario" component={HomeScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailProducts" component={DetailProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})
