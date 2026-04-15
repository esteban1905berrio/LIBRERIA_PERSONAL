import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import sampleBooks from '../data/sampleBooks';

export default function HomeScreen() {
  // Calculamos los totales usando nuestros datos de prueba
  const totalBooks = sampleBooks.length;
  const readBooks = sampleBooks.filter(book => book.status === 'leído').length;
  const readingBooks = sampleBooks.filter(book => book.status === 'leyendo').length;
  const pendingBooks = sampleBooks.filter(book => book.status === 'pendiente').length;

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera / Saludo */}
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola rastafari! 🌿</Text>
        <Text style={styles.subtitle}>Aquí está el resumen de tu biblioteca</Text>
      </View>

      {/* Tarjeta Principal: Total */}
      <View style={[styles.card, styles.totalCard]}>
        <Ionicons name="library" size={40} color={Colors.surface} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardNumberDark}>{totalBooks}</Text>
          <Text style={styles.cardLabelDark}>Libros en tu colección</Text>
        </View>
      </View>

      {/* Fila de Tarjetas (Leídos y Leyendo) */}
      <View style={styles.row}>
        {/* Leídos (Verde) */}
        <View style={[styles.smallCard, { borderBottomColor: Colors.statusRead }]}>
          <Text style={[styles.cardNumber, { color: Colors.statusRead }]}>{readBooks}</Text>
          <Text style={styles.cardLabel}>Leídos</Text>
        </View>
        
        {/* Pensientes (Rojo) */}
        <View style={[styles.smallCard, { borderBottomColor: Colors.statusPending }]}>
          <Text style={[styles.cardNumber, { color: Colors.statusPending }]}>{pendingBooks}</Text>
          <Text style={styles.cardLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Tarjeta inferior (Leyendo - Amarillo) */}
      <View style={[styles.card, styles.readingCard]}>
        <Ionicons name="book-open" size={30} color={Colors.statusReading} />
        <View style={styles.cardInfo}>
          <Text style={[styles.cardNumber, { color: Colors.statusReading }]}>{readingBooks}</Text>
          <Text style={styles.cardLabel}>Actualmente leyendo</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.accentYellow,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3, // Sombra en Android
    shadowOpacity: 0.2, // Sombra en iOS
  },
  totalCard: {
    backgroundColor: Colors.accentGreen,
  },
  readingCard: {
    borderLeftWidth: 5,
    borderLeftColor: Colors.statusReading,
  },
  cardInfo: {
    marginLeft: 15,
  },
  cardNumberDark: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.surface,
  },
  cardLabelDark: {
    fontSize: 14,
    color: Colors.surface,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    width: '48%',
    alignItems: 'center',
    borderBottomWidth: 4,
  },
});
