"use client"

import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Importar tus pantallas
import MainTabNavigator from "./components/navbar/MainTabNavigator"
import Auth from "./components/Auth"
import ProductsPage from "./components/products"
import ProfilePage from "./components/profile"
import HomeScreen from "./components/homeScreen"
import Home from "./components/home"
import DetailProducts from "./components/detailProducts"
import ChatScreen from "./components/chatScreen"

const Drawer = createDrawerNavigator()

// Configuración de linking
const linking = {
  prefixes: ["/"],
  config: {
    screens: {
      Auth: "",
      Products: "products",
      Profile: "profile",
      Home: "home",
      HomeScreen: "homeScreen",
      DetailProducts: "detailProducts/:productoId",
      ChatScreen: "chat",
    },
  },
}

// MENÚ LATERAL SIMPLE
function MyDrawerContent({ navigation }) {
  const menuItems = [
    { title: "Inicio", icon: "home-outline", screen: "Home" },
    { title: "Panel", icon: "grid-outline", screen: "HomeScreen" },
    { title: "Productos", icon: "cube-outline", screen: "Products" },
    { title: "Perfil", icon: "person-outline", screen: "Profile" },
    { title: "Mensajes", icon: "chatbubble-outline", screen: "Chat" },
  ]

  return (
    <SafeAreaView style={styles.drawer}>
      {/* Header del drawer */}
      <View style={styles.drawerHeader}>
        <Image source={{ uri: "https://scontent.fcor10-3.fna.fbcdn.net/v/t51.75761-15/475908950_17941432202952915_3220627644318161277_n.jpg?stp=dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TEPc26iAAjsQ7kNvwH4X2uO&_nc_oc=AdmgVnFZroySEAMRBVdcy5hKvLIZvFK8y1G6VNfwKCweEwO7QaalFoRxyxsXDB9q324&_nc_zt=23&_nc_ht=scontent.fcor10-3.fna&_nc_gid=jkL6UmTjvTcKSBoSlTaORQ&oh=00_AfSf119I2YWiuTQw6t8cJN228M8FZ6F0assIG2TpmWO9Og&oe=6871077B" }} style={styles.drawerLogo} />
        <View>
          <Text style={styles.businessName}>Pizzeria Don Mario</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Opciones del menú */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.screen)
              navigation.closeDrawer()
            }}
          >
            <Ionicons name={item.icon} size={24} color="#3b82f6" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("ChatScreen")
            navigation.closeDrawer()
          }}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Mensajes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Info", "Pedidos próximamente")}>
          <Ionicons name="bag-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Info", "Clientes próximamente")}>
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Clientes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            Alert.alert("Cerrar Sesión", "¿Estás seguro?", [
              { text: "Cancelar" },
              {
                text: "Sí",
                onPress: () => {
                  navigation.navigate("Auth")
                  navigation.closeDrawer()
                },
              },
            ])
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={[styles.menuText, { color: "#ef4444" }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// NAVEGADOR PRINCIPAL
function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="auto" />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <MyDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
            elevation: 1,
            shadowOpacity: 0.1,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#1f2937",
          },
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={24} color="#1f2937" />
              </TouchableOpacity>
              <Image
                source={require("./assets/LogoMercado.jpg")} style={styles.headerLogo}
              />
              <Text style={styles.headerTitle}>Mercado Movil</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#1f2937" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          ),
          headerTitle: "",
          drawerStyle: {
            width: 280,
          },
        })}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Products" component={ProductsPage} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
        <Drawer.Screen name="DetailProducts" component={DetailProducts} />
        <Drawer.Screen name="Auth" component={Auth} />
        <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
        <Drawer.Screen name="ChatScreen" component={ChatScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

// COMPONENTE PRINCIPAL
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  )
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  // Header
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
    marginRight: 15,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Drawer
  drawer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  drawerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  businessName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  businessType: {
    fontSize: 12,
    color: "#6b7280",
  },
  menuContainer: {
    flex: 1,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 10,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 10,
    backgroundColor: "white",
  },
})
