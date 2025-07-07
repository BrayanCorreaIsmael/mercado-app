import { createDrawerNavigator } from "@react-navigation/drawer"
import MainTabNavigator from "./navbar/MainTabNavigator"
import CustomDrawerContent from "./navbar/CustomDrawerContent"

const Drawer = createDrawerNavigator()

export default function MainApp() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
      {/* Puedes agregar más screens aquí si lo necesitas */}
    </Drawer.Navigator>
  )
}