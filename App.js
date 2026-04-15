import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from './src/constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Ícono representativo */}
      <Text style={styles.icon}>🌿📚</Text>

      {/* Nombre de la app */}
      <Text style={styles.title}>Hojas & Raíces</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>Tu biblioteca personal</Text>

      {/* Versión del proyecto */}
      <Text style={styles.version}>v1.0.0 — Taller Integrador</Text>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  version: {
    fontSize: 12,
    color: Colors.textMuted,
    position: 'absolute',
    bottom: 40,
  },
});
