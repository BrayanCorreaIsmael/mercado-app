"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: "Pizzería Don Mario",
    description:
      "Auténtica pizzería italiana con más de 20 años de experiencia. Especialistas en pizzas artesanales con ingredientes frescos y de la mejor calidad.",
    category: "Restaurante",
    address: "Av. Principal 123, Centro, Ciudad",
    phone: "+1 234 567 8900",
    email: "info@pizzeriadonmario.com",
    website: "www.pizzeriadonmario.com",
    logo: "https://scontent.fcor10-3.fna.fbcdn.net/v/t51.75761-15/475908950_17941432202952915_3220627644318161277_n.jpg?stp=dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TEPc26iAAjsQ7kNvwH4X2uO&_nc_oc=AdmgVnFZroySEAMRBVdcy5hKvLIZvFK8y1G6VNfwKCweEwO7QaalFoRxyxsXDB9q324&_nc_zt=23&_nc_ht=scontent.fcor10-3.fna&_nc_gid=jkL6UmTjvTcKSBoSlTaORQ&oh=00_AfSf119I2YWiuTQw6t8cJN228M8FZ6F0assIG2TpmWO9Og&oe=6871077B",
    coverImage: "https://unsplash.com/es/fotos/un-letrero-de-neon-colgando-del-techo-de-un-edificio-qCGvQDxliS4",
    openingHours: {
      monday: { open: "11:00", close: "22:00", isOpen: true },
      tuesday: { open: "11:00", close: "22:00", isOpen: true },
      wednesday: { open: "11:00", close: "22:00", isOpen: true },
      thursday: { open: "11:00", close: "22:00", isOpen: true },
      friday: { open: "11:00", close: "23:00", isOpen: true },
      saturday: { open: "12:00", close: "23:00", isOpen: true },
      sunday: { open: "12:00", close: "21:00", isOpen: true },
    },
    socialMedia: {
      facebook: "pizzeriadonmario",
      instagram: "@pizzeriadonmario",
      twitter: "@donmariopizza",
    },
  })

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editForm, setEditForm] = useState(profile)

  const stats = [
    { label: "Productos Activos", value: "24", icon: "cube", color: "#3b82f6" },
    { label: "Pedidos Este Mes", value: "156", icon: "trending-up", color: "#10b981" },
    { label: "Calificación", value: "4.8", icon: "star", color: "#f59e0b" },
    { label: "Clientes", value: "1,234", icon: "people", color: "#8b5cf6" },
  ]

  const dayNames = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const handleSaveProfile = () => {
    setProfile(editForm)
    setIsEditModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con imagen de portada */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: profile.coverImage }} style={styles.coverImage} />
          <View style={styles.coverOverlay} />

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setEditForm(profile)
              setIsEditModalVisible(true)
            }}
          >
            <Ionicons name="create" size={20} color="white" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <View style={styles.profileHeader}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: profile.logo }} style={styles.logo} />
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.businessName}>{profile.name}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{profile.category}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Información del Negocio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Negocio</Text>
          <View style={styles.card}>
            <Text style={styles.description}>{profile.description}</Text>

            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="location" size={20} color="#6b7280" />
                <Text style={styles.contactText}>{profile.address}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="call" size={20} color="#6b7280" />
                <Text style={styles.contactText}>{profile.phone}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="mail" size={20} color="#6b7280" />
                <Text style={styles.contactText}>{profile.email}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Horarios */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time" size={20} color="#1f2937" />
            <Text style={styles.sectionTitle}>Horarios de Atención</Text>
          </View>
          <View style={styles.card}>
            {Object.entries(profile.openingHours).map(([day, hours]) => (
              <View key={day} style={styles.scheduleItem}>
                <Text style={styles.dayName}>{dayNames[day]}</Text>
                <Text style={[styles.scheduleTime, { color: hours.isOpen ? "#10b981" : "#ef4444" }]}>
                  {hours.isOpen ? `${hours.open} - ${hours.close}` : "Cerrado"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Redes Sociales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociales</Text>
          <View style={styles.card}>
            {profile.socialMedia.facebook && (
              <View style={styles.socialItem}>
                <Text style={styles.socialLabel}>Facebook</Text>
                <View style={styles.socialBadge}>
                  <Text style={styles.socialText}>{profile.socialMedia.facebook}</Text>
                </View>
              </View>
            )}

            {profile.socialMedia.instagram && (
              <View style={styles.socialItem}>
                <Text style={styles.socialLabel}>Instagram</Text>
                <View style={styles.socialBadge}>
                  <Text style={styles.socialText}>{profile.socialMedia.instagram}</Text>
                </View>
              </View>
            )}

            {profile.socialMedia.twitter && (
              <View style={styles.socialItem}>
                <Text style={styles.socialLabel}>Twitter</Text>
                <View style={styles.socialBadge}>
                  <Text style={styles.socialText}>{profile.socialMedia.twitter}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ver Página Pública</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextOutline]}>Compartir Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextOutline]}>Descargar QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estado del Negocio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado del Negocio</Text>
          <View style={styles.card}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Estado</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Abierto</Text>
              </View>
            </View>
            <Text style={styles.statusSubtext}>Cierra a las 22:00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Edición */}
      <Modal visible={isEditModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre del Negocio</Text>
              <TextInput
                style={styles.input}
                value={editForm.name}
                onChangeText={(text) => setEditForm({ ...editForm, name: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editForm.description}
                onChangeText={(text) => setEditForm({ ...editForm, description: text })}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={editForm.phone}
                onChangeText={(text) => setEditForm({ ...editForm, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editForm.email}
                onChangeText={(text) => setEditForm({ ...editForm, email: text })}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                value={editForm.address}
                onChangeText={(text) => setEditForm({ ...editForm, address: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Sitio Web</Text>
              <TextInput
                style={styles.input}
                value={editForm.website}
                onChangeText={(text) => setEditForm({ ...editForm, website: text })}
                keyboardType="url"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  coverContainer: {
    position: "relative",
    height: 250,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  coverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  editButton: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    marginLeft: 4,
    fontWeight: "600",
  },
  profileHeader: {
    position: "absolute",
    bottom: -40,
    left: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  logoContainer: {
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "white",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3b82f6",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 16,
    marginBottom: 8,
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
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
    fontSize: 20,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 16,
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 12,
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  dayName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: "600",
  },
  socialItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  socialLabel: {
    fontSize: 16,
    color: "#1f2937",
  },
  socialBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  socialText: {
    fontSize: 14,
    color: "#6b7280",
  },
  actionButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 16,
    color: "#1f2937",
  },
  statusBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  statusSubtext: {
    fontSize: 14,
    color: "#6b7280",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cancelButton: {
    color: "#6b7280",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  saveButton: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
})
