import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { doc, setDoc} from 'firebase/firestore'
import { db, auth } from '../lib/firebase'
export async function saveUserRole(uid: string, role: 'borracheiro' | 'gerente') {
  await setDoc(doc(db, 'users', uid), { role }, { merge: true })
}
export default function ChooseRoleScreen() {
  const router = useRouter();

async function handleSelect(role: 'borracheiro' | 'gerente') {
  try {
    const uid = auth.currentUser?.uid
    if (!uid) throw new Error('Usuário não autenticado')

    await saveUserRole(uid, role) // 🔥 salva no Firestore

    if (Platform.OS === 'web') {
      localStorage.setItem('userRole', role)
    } else {
      await AsyncStorage.setItem('userRole', role)
    }

    Alert.alert('Perfil selecionado', `Você escolheu: ${role}`)

    // Redireciona para a tela específica
    if (role === 'borracheiro') {
      router.replace('/form_borracheiro')
    } else {
      router.replace('/conferente_form')
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível salvar sua escolha.')
    console.error(error)
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu perfil</Text>

      <TouchableOpacity
        style={[styles.option, { backgroundColor: '#007AFC' }]}
        onPress={() => handleSelect('borracheiro')}
      >
        <Text style={styles.optionText}>Sou Borracheiro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, { backgroundColor: '#fca001' }]}
        onPress={() => handleSelect('gerente')}
      >
        <Text style={styles.optionText}>Sou Gerente</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
    color: '#333',
  },
  option: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
