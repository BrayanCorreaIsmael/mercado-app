"use client"

import { useState } from "react"
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
// Eliminar esta línea:
// import { supabase } from "../lib/supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu email y contraseña")
      return
    }

    setLoading(true)

    // Simular una llamada a la API
    setTimeout(() => {
      setLoading(false)
      Alert.alert("Éxito", "Inicio de sesión exitoso (simulado)")
    }, 2000)
  }

  async function signUpWithEmail() {
    if (!email || !password || !username || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }

    if (username.length < 3) {
      Alert.alert("Error", "El nombre de usuario debe tener al menos 3 caracteres")
      return
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    // Simular una llamada a la API
    setTimeout(() => {
      setLoading(false)
      Alert.alert("Registro exitoso", `Usuario ${username} registrado correctamente (simulado)`)
    }, 2000)
  }

  async function resetPassword() {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu email para recuperar la contraseña")
      return
    }

    setLoading(true)

    // Simular una llamada a la API
    setTimeout(() => {
      setLoading(false)
      Alert.alert("Email enviado", "Revisa tu bandeja de entrada para las instrucciones de recuperación (simulado)")
    }, 1500)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}</Text>

          <View style={styles.inputContainer}>
            <Input
              label="Email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#666",
              }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="tu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
            />
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Input
                label="Nombre de Usuario"
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#666",
                }}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Tu nombre de usuario"
                autoCapitalize="none"
                autoComplete="username"
                inputStyle={styles.inputText}
                labelStyle={styles.inputLabel}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Input
              label="Contraseña"
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: "#666",
              }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Tu contraseña"
              autoCapitalize="none"
              autoComplete="password"
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
            />
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Input
                label="Confirmar Contraseña"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#666",
                }}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder="Confirma tu contraseña"
                autoCapitalize="none"
                autoComplete="password"
                inputStyle={styles.inputText}
                labelStyle={styles.inputLabel}
              />
            </View>
          )}

          {!isSignUp && (
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={resetPassword} disabled={loading}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title={isSignUp ? "Registrarse" : "Iniciar Sesión"}
              disabled={loading}
              onPress={isSignUp ? signUpWithEmail : signInWithEmail}
              buttonStyle={styles.primaryButton}
              titleStyle={styles.primaryButtonText}
              loading={loading}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>{isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp)
                setUsername("") // Limpiar el nombre de usuario al cambiar de modo
                setConfirmPassword("") // Limpiar la confirmación de contraseña al cambiar de modo
              }}
              disabled={loading}
            >
              <Text style={styles.switchLink}>{isSignUp ? "Iniciar Sesión" : "Registrarse"}</Text>
            </TouchableOpacity>
          </View>
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
