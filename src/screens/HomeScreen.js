import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useBooks } from '../context/BooksContext';
import { useUser } from '../context/UserContext';

export default function HomeScreen() {
  // Obtenemos los libros desde la "Burbuja" de datos (Contexto)
  const { books } = useBooks();
  // Obtenemos el perfil del usuario
  const { userData } = useUser();

  // Calculamos los totales usando los datos del contexto
  const totalBooks = books.length;
  const readBooks = books.filter(book => book.status === 'leído').length;
  const readingBooks = books.filter(book => book.status === 'leyendo').length;
  const pendingBooks = books.filter(book => book.status === 'pendiente').length;

  // Progreso de la meta
  const progressPercent = Math.min((readBooks / (userData.annualGoal || 1)) * 100, 100);

  return (
    <ImageBackground 
      source={require('../../assets/rasta_books_bg.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Capa oscura más suave (aprox 50% de opacidad en vez de 80%) para dejar ver la imagen */}
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          {/* Cabecera / Saludo Dinámico */}
          <View style={styles.header}>
            <Text style={styles.greeting}>¡Hola, {userData.name}! 🌿</Text>
            <Text style={styles.subtitle}>Aquí está el resumen de tu biblioteca</Text>
          </View>

          {/* Mini Dashboard de Meta Anual */}
          <View style={styles.goalBanner}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalText}>Meta del año: {readBooks} / {userData.annualGoal} libros</Text>
              <Text style={styles.goalPercent}>{Math.round(progressPercent)}%</Text>
            </View>
            <View style={styles.miniProgressBarBg}>
              <View style={[styles.miniProgressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* Tarjeta Principal: Total */}
          <View style={[styles.card, styles.totalCard]}>
            <Ionicons name="library" size={40} color={Colors.textPrimary} />
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.45)', // Filtro mucho más suave para dejar pasar la luz
  },
  container: {
    flex: 1,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#EFEFEF', // Mas claro para que no se pierda en el fondo
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.75)', // Efecto cristal oscuro
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  totalCard: {
    backgroundColor: 'rgba(0, 168, 107, 0.85)', // Verde Rasta pero semitransparente
    borderColor: 'rgba(0, 168, 107, 1)',
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
  goalBanner: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalText: {
    color: '#EFEFEF',
    fontSize: 14,
    fontWeight: '600',
  },
  goalPercent: {
    color: Colors.accentYellow,
    fontWeight: 'bold',
  },
  miniProgressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  miniProgressBarFill: {
    height: '100%',
    backgroundColor: Colors.accentYellow,
  },
});
