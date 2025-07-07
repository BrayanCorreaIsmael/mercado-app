import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from "react-native"
import { SafeAreaView } from "react-native"

const { width } = Dimensions.get("window")

// Datos mock para el carrusel de novedades
const newsData = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=350",
    title: "Nueva Promoción de Verano",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=350",
    title: "Descuentos Especiales",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=350",
    title: "Nuevos Restaurantes",
  },
]

// Datos mock para negocios gastronómicos
const restaurantsData = [
  {
    id: 1,
    name: "La Parrilla Argentina",
    rating: 4.5,
    image: "/placeholder.svg?height=100&width=100",
    category: "Parrilla",
  },
  {
    id: 2,
    name: "Pizzería Don Mario",
    rating: 4.2,
    image: "/placeholder.svg?height=100&width=100",
    category: "Pizzería",
  },
  {
    id: 3,
    name: "Sushi Zen",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
    category: "Japonés",
  },
  {
    id: 4,
    name: "Café Central",
    rating: 4.0,
    image: "/placeholder.svg?height=100&width=100",
    category: "Café",
  },
  {
    id: 5,
    name: "Tacos El Mariachi",
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=100",
    category: "Mexicano",
  },
  {
    id: 6,
    name: "Pasta Italiana",
    rating: 4.3,
    image: "/placeholder.svg?height=100&width=100",
    category: "Italiano",
  },
]

// Componente para mostrar estrellas
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

// Componente del carrusel
const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
      >
        {newsData.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <View style={styles.carouselOverlay}>
              <Text style={styles.carouselTitle}>{item.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicadores de puntos */}
      <View style={styles.dotsContainer}>
        {newsData.map((_, index) => (
          <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]} />
        ))}
      </View>
    </View>
  )
}

// Componente principal del Home
export default function Home({ navigation }) {
  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => navigation.navigate("DetailProducts", { producto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCategory}>{item.category}</Text>
        <StarRating rating={item.rating} />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>¡Bienvenido!</Text>
          <Text style={styles.headerSubtitle}>Descubre los mejores sabores</Text>
        </View>

        {/* Sección de Novedades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Novedades</Text>
          <NewsCarousel />
        </View>

        {/* Sección de Restaurantes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurantes Destacados</Text>
          <FlatList
            data={restaurantsData}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginHorizontal: 20,
    color: "#333",
  },
  carouselContainer: {
    height: 220,
  },
  carouselItem: {
    width: width,
    height: 200,
    position: "relative",
  },
  carouselImage: {
    width: "90%",
    height: "100%",
    marginHorizontal: "5%",
    borderRadius: 12,
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
    borderRadius: 8,
  },
  carouselTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: (width - 60) / 2,
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
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantInfo: {
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  restaurantCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starFull: {
    color: "#FFD700",
    fontSize: 16,
  },
  starHalf: {
    color: "#FFD700",
    fontSize: 16,
    opacity: 0.5,
  },
  starEmpty: {
    color: "#ddd",
    fontSize: 16,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
})