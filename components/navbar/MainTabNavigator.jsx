import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import Home from "../home" // Usa tu Home.jsx
import ProductsPage from "../products" // Usa tu ProductsPage.jsx
import ProfilePage from "../profile" // Usa tu ProfilePage.jsx
import HomeScreen from "../homeScreen" // Usa tu HomeScreen.jsx

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Inicio") iconName = focused ? "home" : "home-outline"
          else if (route.name === "Productos") iconName = focused ? "cube" : "cube-outline"
          else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline"
          else if (route.name === "PanelUsuario") iconName = focused ? "settings" : "settings-outline"
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Productos" component={ProductsPage} />
      <Tab.Screen name="Perfil" component={ProfilePage} />
      <Tab.Screen name="PanelUsuario" component={HomeScreen} />
    </Tab.Navigator>
  )
}
