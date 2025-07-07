import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function CustomDrawerContent({ navigation }) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: "home-outline",
      onPress: () => {
        navigation.navigate("MainTabs", { screen: "Inicio" })
        navigation.closeDrawer()
      },
    },
    {
      title: "Productos",
      icon: "cube-outline",
      onPress: () => {
        navigation.navigate("MainTabs", { screen: "Productos" })
        navigation.closeDrawer()
      },
    },
    {
      title: "Perfil del Negocio",
      icon: "person-outline",
      onPress: () => {
        navigation.navigate("MainTabs", { screen: "Perfil" })
        navigation.closeDrawer()
      },
    },
    {
      title: "Pedidos",
      icon: "bag-outline",
      onPress: () => {
        // Navegar a pantalla de pedidos (por implementar)
        navigation.closeDrawer()
      },
    },
    {
      title: "Clientes",
      icon: "people-outline",
      onPress: () => {
        // Navegar a pantalla de clientes (por implementar)
        navigation.closeDrawer()
      },
    },
    {
      title: "Reportes",
      icon: "bar-chart-outline",
      onPress: () => {
        // Navegar a pantalla de reportes (por implementar)
        navigation.closeDrawer()
      },
    },
    {
      title: "Configuración",
      icon: "settings-outline",
      onPress: () => {
        // Navegar a pantalla de configuración (por implementar)
        navigation.closeDrawer()
      },
    },
  ]

  const businessInfo = {
    name: "Pizzería Don Mario",
    category: "Restaurante",
    logo: "https://via.placeholder.com/60x60/3b82f6/ffffff?text=PDM",
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header del Drawer */}
      <View style={styles.drawerHeader}>
        <Image source={{ uri: businessInfo.logo }} style={styles.businessLogo} />
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>{businessInfo.name}</Text>
          <Text style={styles.businessCategory}>{businessInfo.category}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Menú Principal */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>MENÚ PRINCIPAL</Text>
          {menuItems.slice(0, 3).map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <Ionicons name={item.icon} size={24} color="#3b82f6" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separator} />

        {/* Sección de Gestión */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>GESTIÓN</Text>
          {menuItems.slice(3, 6).map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <Ionicons name={item.icon} size={24} color="#6b7280" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separator} />

        {/* Sección de Configuración */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>
          {menuItems.slice(6).map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <Ionicons name={item.icon} size={24} color="#6b7280" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer del Drawer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="help-circle-outline" size={24} color="#6b7280" />
          <Text style={styles.footerText}>Ayuda y Soporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={[styles.footerText, { color: "#ef4444" }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
  businessLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  businessCategory: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 4,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 12,
  },
})
