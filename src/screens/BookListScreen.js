import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import sampleBooks from '../data/sampleBooks';

export default function BookListScreen() {
  
  // Función que se encarga de "dibujar" cada fila de la lista
  const renderBookItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.bookCard}>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.genreBadge}>{item.genre}</Text>
            {/* Color del estado dependiendo si está leído, leyendo o pendiente */}
            <Text style={[
              styles.statusText, 
              item.status === 'leído' && { color: Colors.statusRead },
              item.status === 'leyendo' && { color: Colors.statusReading },
              item.status === 'pendiente' && { color: Colors.statusPending },
            ]}>
              • {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.bookActions}>
           {/* Mostrar una estrellita si es favorito */}
           {item.isFavorite ? (
             <Ionicons name="star" size={24} color={Colors.favorite} />
           ) : (
             <Ionicons name="star-outline" size={24} color={Colors.textMuted} />
           )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Componente clave en React Native para listas largas */}
      <FlatList
        data={sampleBooks} // Los datos que va a recorrer
        keyExtractor={(item) => item.id} // Cómo identificar cada elemento
        renderItem={renderBookItem} // La función que dibuja el diseño de un libro
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30, // Espacio al final por la navegación
  },
  bookCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separa el texto de la estrellita
    borderLeftWidth: 4,
    borderLeftColor: Colors.accentGreen, // Detalle verde a la izquierda
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreBadge: {
    backgroundColor: Colors.card,
    color: Colors.textSecondary,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookActions: {
    paddingLeft: 10,
  },
});
