import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  async function handleAuth() {
    try {
      if (!email || !password) {
        return Alert.alert("Atenção", "Informe os campos obrigatórios!");
      }

      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Cadastro realizado com sucesso!");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Login feito com sucesso!");
      }

      const token = userCredential.user.uid;

      if (Platform.OS === "web") {
        localStorage.setItem("token", token);
      } else {
        await AsyncStorage.setItem("token", token);
      }

      router.replace("/choose-role");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha na autenticação");
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputGroup}>
          <MaterialIcons name="email" size={24} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputGroup}>
          <MaterialIcons name="key" size={24} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isRegistering ? "Cadastrar" : "Entrar"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          {isRegistering ? "Já tem uma conta? " : "Não tem uma conta? "}
          <Text
            style={styles.switchLink}
            onPress={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Entrar" : "Registre"}
          </Text>
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f2391d",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFC",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  switchText: {
    textAlign: "center",
    marginTop: 16,
    color: "#666",
    fontSize: 14,
  },
  switchLink: {
    color: "#fca001",
    fontWeight: "600",
  },
});
