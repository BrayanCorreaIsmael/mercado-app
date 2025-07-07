import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function CustomHeader({ navigation, options }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={{ uri: "https://via.placeholder.com/40x40/3b82f6/ffffff?text=MB" }} style={styles.logo} />
            <Text style={styles.logoText}>Mi Negocio</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#1f2937" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
})
