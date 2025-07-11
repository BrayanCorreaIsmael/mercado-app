import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen({ navigation }) {
  const stats = [
    { label: "Productos Activos", value: "24", icon: "cube", color: "#3b82f6" },
    { label: "Pedidos Hoy", value: "12", icon: "bag", color: "#10b981" },
    { label: "Calificación", value: "4.8", icon: "star", color: "#f59e0b" },
    { label: "Clientes", value: "1,234", icon: "people", color: "#8b5cf6" },
  ]

  const activities = [
    {
      title: "Nuevo producto agregado",
      subtitle: "Pizza Margherita - hace 2 horas",
      icon: "cube",
      color: "#3b82f6",
    },
    {
      title: "Perfil actualizado",
      subtitle: "Horarios de atención - hace 1 día",
      icon: "person",
      color: "#8b5cf6",
    },
    {
      title: "Oferta activada",
      subtitle: "20% descuento en pizzas - hace 3 días",
      icon: "star",
      color: "#f59e0b",
    },
  ]

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido a tu Panel!</Text>
          <Text style={styles.subtitle}>Gestiona tu negocio de manera eficiente</Text>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={32} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Acciones Principales */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Products")}>
            <View style={styles.actionHeader}>
              <Ionicons name="cube" size={24} color="#3b82f6" />
              <Text style={styles.actionTitle}>Gestionar Productos</Text>
            </View>
            <Text style={styles.actionDescription}>
              Agrega, edita y administra el catálogo de productos de tu negocio.
            </Text>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ir a Productos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Profile")}>
            <View style={styles.actionHeader}>
              <Ionicons name="person" size={24} color="#8b5cf6" />
              <Text style={styles.actionTitle}>Perfil del Negocio</Text>
            </View>
            <Text style={styles.actionDescription}>Actualiza la información de tu negocio y datos de contacto.</Text>
            <View style={[styles.actionButton, styles.actionButtonOutline]}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextOutline]}>Ver Perfil</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Actividad Reciente */}
        <View style={styles.activityContainer}>
          <View style={styles.activityHeader}>
            <Ionicons name="trending-up" size={24} color="#10b981" />
            <Text style={styles.activityTitle}>Actividad Reciente</Text>
          </View>

          {activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityContent}>
                <Text style={styles.activityItemTitle}>{activity.title}</Text>
                <Text style={styles.activityItemSubtitle}>{activity.subtitle}</Text>
              </View>
              <Ionicons name={activity.icon} size={20} color={activity.color} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    width: "48%",
    marginRight: "2%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionButtonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  actionButtonTextOutline: {
    color: "#3b82f6",
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 8,
  },
  activityItem: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  activityItemSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
})
