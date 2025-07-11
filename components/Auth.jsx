import React, { useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Button, Input } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebaseConfig"


export default function Auth() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState("")

  async function signUpWithEmail() {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await fetch("http://TU_BACKEND_URL/users/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.uid,
          nombre: username,
          apellido: "",
          email: user.email,
          rol: "cliente"
        })
      })

      Alert.alert("Registro exitoso", `Bienvenido ${username}`)
      navigation.navigate("Home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithEmail() {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate("Home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}</Text>

          <Input
            label="Email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {isSignUp && (
            <Input
              label="Nombre"
              onChangeText={setUsername}
              value={username}
              autoCapitalize="words"
            />
          )}

          <Input
            label="Contraseña"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <Button
            title={isSignUp ? "Registrarse" : "Iniciar Sesión"}
            disabled={loading}
            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
          />

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text>
              {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    // Puedes usar boxShadow si usas react-native-web o dejar shadow props si es móvil nativo:
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  switchText: {
    color: "#666",
    fontSize: 14,
    marginRight: 4,
  },
  switchLink: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
})
