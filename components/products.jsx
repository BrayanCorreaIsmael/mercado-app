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
  Alert,
  Switch,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProductsScreen() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Pizza clásica con tomate, mozzarella y albahaca fresca",
      price: 12.99,
      originalPrice: 15.99,
      category: "Pizzas",
      image: "https://via.placeholder.com/200x200",
      hasOffer: true,
      offerPercentage: 20,
      stock: 50,
      isActive: true,
    },
    {
      id: "2",
      name: "Hamburguesa Clásica",
      description: "Hamburguesa con carne, lechuga, tomate y queso",
      price: 8.99,
      category: "Hamburguesas",
      image: "https://via.placeholder.com/200x200",
      hasOffer: false,
      stock: 30,
      isActive: true,
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Pizzas",
    hasOffer: false,
    offerPercentage: "",
    stock: "",
    isActive: true,
  })

  const categories = ["Pizzas", "Hamburguesas", "Bebidas", "Postres", "Ensaladas"]

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos")
      return
    }

    const newProduct = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: "https://via.placeholder.com/200x200",
      hasOffer: formData.hasOffer,
      offerPercentage: formData.offerPercentage ? Number.parseInt(formData.offerPercentage) : undefined,
      stock: Number.parseInt(formData.stock),
      isActive: formData.isActive,
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)))
    } else {
      setProducts([...products, newProduct])
    }

    resetForm()
    setIsModalVisible(false)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "Pizzas",
      hasOffer: false,
      offerPercentage: "",
      stock: "",
      isActive: true,
    })
    setEditingProduct(null)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      hasOffer: product.hasOffer,
      offerPercentage: product.offerPercentage?.toString() || "",
      stock: product.stock.toString(),
      isActive: product.isActive,
    })
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    Alert.alert("Eliminar Producto", "¿Estás seguro de que quieres eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setProducts(products.filter((p) => p.id !== id))
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Gestión de Productos</Text>
          <Text style={styles.subtitle}>Administra el catálogo de tu negocio</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm()
            setIsModalVisible(true)
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />

            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              </View>

              <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
              </Text>

              <View style={styles.priceContainer}>
                <View style={styles.priceInfo}>
                  <Text style={styles.price}>${product.price}</Text>
                  {product.originalPrice && <Text style={styles.originalPrice}>${product.originalPrice}</Text>}
                </View>
                <View style={[styles.stockBadge, { backgroundColor: product.stock > 10 ? "#10b981" : "#ef4444" }]}>
                  <Text style={styles.stockText}>Stock: {product.stock}</Text>
                </View>
              </View>

              <View style={styles.productActions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(product)}>
                  <Ionicons name="create-outline" size={16} color="#3b82f6" />
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(product.id)}>
                  <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {product.hasOffer && (
              <View style={styles.offerBadge}>
                <Text style={styles.offerText}>-{product.offerPercentage}%</Text>
              </View>
            )}

            {!product.isActive && (
              <View style={styles.inactiveBadge}>
                <Text style={styles.inactiveText}>Inactivo</Text>
              </View>
            )}
          </View>
        ))}

        {products.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No hay productos</Text>
            <Text style={styles.emptySubtitle}>Comienza agregando tu primer producto al catálogo</Text>
            <TouchableOpacity style={styles.emptyButton} onPress={() => setIsModalVisible(true)}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.emptyButtonText}>Agregar Primer Producto</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Modal para agregar/editar producto */}
      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{editingProduct ? "Editar Producto" : "Agregar Producto"}</Text>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre del Producto *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Ej: Pizza Margherita"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Describe tu producto..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formRow}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Precio ($) *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(text) => setFormData({ ...formData, price: text })}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Stock *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.stock}
                  onChangeText={(text) => setFormData({ ...formData, stock: text })}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Precio Original ($)</Text>
              <TextInput
                style={styles.input}
                value={formData.originalPrice}
                onChangeText={(text) => setFormData({ ...formData, originalPrice: text })}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Producto en oferta</Text>
              <Switch
                value={formData.hasOffer}
                onValueChange={(value) => setFormData({ ...formData, hasOffer: value })}
              />
            </View>

            {formData.hasOffer && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Porcentaje de descuento (%)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.offerPercentage}
                  onChangeText={(text) => setFormData({ ...formData, offerPercentage: text })}
                  placeholder="20"
                  keyboardType="numeric"
                />
              </View>
            )}

            <View style={styles.switchContainer}>
              <Text style={styles.label}>Producto activo</Text>
              <Switch
                value={formData.isActive}
                onValueChange={(value) => setFormData({ ...formData, isActive: value })}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f4f6",
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#6b7280",
  },
  productDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  originalPrice: {
    fontSize: 14,
    color: "#6b7280",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: "center",
  },
  editButtonText: {
    color: "#3b82f6",
    fontWeight: "600",
    marginLeft: 4,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: 4,
  },
  offerBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offerText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  inactiveBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#6b7280",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inactiveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
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
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formGroupHalf: {
    flex: 1,
    marginRight: 10,
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
    height: 80,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
})
