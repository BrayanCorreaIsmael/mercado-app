"use client"
import { StyleSheet, SafeAreaView } from "react-native"
import Auth from "./components/Auth"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Auth />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})
