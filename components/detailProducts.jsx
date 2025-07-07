"use client - RestaurantDetail"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { SafeAreaView } from "react-native"

const { width } = Dimensions.get("window")

// Datos mock para productos del restaurante
const getProductsForRestaurant = (restaurantId) => {
  const products = {
    1: [
      // La Parrilla Argentina
      {
        id: 1,
        name: "Bife de Chorizo",
        price: "$2500",
        image: "/placeholder.svg?height=150&width=150",
        description: "Jugoso bife de chorizo a la parrilla",
      },
      {
        id: 2,
        name: "Asado de Tira",
        price: "$2200",
        image: "/placeholder.svg?height=150&width=150",
        description: "Costillas de res a la parrilla",
      },
      {
        id: 3,
        name: "Choripán",
        price: "$800",
        image: "/placeholder.svg?height=150&width=150",
        description: "Chorizo criollo con pan casero",
      },
      {
        id: 4,
        name: "Provoleta",
        price: "$1200",
        image: "/placeholder.svg?height=150&width=150",
        description: "Queso provolone a la parrilla",
      },
    ],
    2: [
      // Pizzería Don Mario
      {
        id: 5,
        name: "Pizza Margherita",
        price: "$1800",
        image: "/placeholder.svg?height=150&width=150",
        description: "Tomate, mozzarella y albahaca",
      },
      {
        id: 6,
        name: "Pizza Napolitana",
        price: "$2000",
        image: "/placeholder.svg?height=150&width=150",
        description: "Tomate, mozzarella, jamón y tomates",
      },
    ],
    3: [
      // Sushi Zen
      {
        id: 7,
        name: "Salmón Roll",
        price: "$1500",
        image: "/placeholder.svg?height=150&width=150",
        description: "Roll de salmón fresco con palta",
      },
      {
        id: 8,
        name: "Nigiri Variado",
        price: "$2800",
        image: "/placeholder.svg?height=150&width=150",
        description: "Selección de nigiri del chef",
      },
    ],
  }

  return products[restaurantId] || []
}

// Componente para mostrar estrellas (reutilizado)
const StarRating = ({ rating }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Text key={i} style={styles.starFull}>
          ★
        </Text>,
      )
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Text key={i} style={styles.starHalf}>
          ★
        </Text>,
      )
    } else {
      stars.push(
        <Text key={i} style={styles.starEmpty}>
          ☆
        </Text>,
      )
    }
  }

  return (
    <View style={styles.starsContainer}>
      {stars}
      <Text style={styles.ratingText}>({rating})</Text>
    </View>
  )
}

export default function DetailProducts({ route, navigation }) {
  const { producto: restaurant } = route.params || {}

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.noProductsText}>No se encontró el restaurante.</Text>
      </View>
    )
  }

  const [products] = useState(getProductsForRestaurant(restaurant.id))

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
        </View>

        {/* Información del restaurante */}
        <View style={styles.restaurantHeader}>
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCategory}>{restaurant.category}</Text>
            <StarRating rating={restaurant.rating} />
          </View>
        </View>

        {/* Lista de productos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestros Productos</Text>
          {products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noProductsText}>Próximamente agregaremos productos para este restaurante</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  restaurantHeader: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  restaurantInfo: {
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  restaurantCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    marginTop: 50,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starFull: {
    color: "#FFD700",
    fontSize: 18,
  },
  starHalf: {
    color: "#FFD700",
    fontSize: 18,
    opacity: 0.5,
  },
  starEmpty: {
    color: "#ddd",
    fontSize: 18,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
})