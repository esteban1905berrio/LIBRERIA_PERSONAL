import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useUser } from '../context/UserContext';
import { useBooks } from '../context/BooksContext';

export default function ProfileScreen() {
  const { userData, updateUserInfo } = useUser();
  const { books } = useBooks();

  // Estados locales para el modo edición
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userData.name);
  const [tempBio, setTempBio] = useState(userData.bio);
  const [tempGoal, setTempGoal] = useState(userData.annualGoal.toString());

  // Cálculo de progreso
  const booksRead = books.filter(b => b.status === 'leído').length;
  const progressPercent = Math.min((booksRead / userData.annualGoal) * 100, 100);

  const handleSave = () => {
    const goalNumber = parseInt(tempGoal);
    if (isNaN(goalNumber) || goalNumber <= 0) {
      Alert.alert('Error', 'La meta anual debe ser un número válido mayor a cero.');
      return;
    }

    updateUserInfo({
      name: tempName,
      bio: tempBio,
      annualGoal: goalNumber,
    });
    setIsEditing(false);
    Alert.alert('¡Excelente!', 'Tu perfil ha sido actualizado.');
  };

  const handleCancel = () => {
    setTempName(userData.name);
    setTempBio(userData.bio);
    setTempGoal(userData.annualGoal.toString());
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {isEditing ? (
        /* --- MODO EDICIÓN (FORMULARIO) --- */
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>Edita tu Perfil</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput 
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Escribe tu nombre..."
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breve biografía</Text>
            <TextInput 
              style={[styles.input, styles.textArea]}
              value={tempBio}
              onChangeText={setTempBio}
              multiline
              numberOfLines={3}
              placeholder="Cuéntanos un poco de ti..."
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meta de libros anual</Text>
            <TextInput 
              style={styles.input}
              value={tempGoal}
              onChangeText={setTempGoal}
              keyboardType="number-pad"
              placeholder="Ej: 12"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>

      ) : (
        /* --- MODO VISTA (TABLERO DE LOGROS) --- */
        <View style={styles.viewContainer}>
          <View style={styles.profileHeader}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userBio}>"{userData.bio}"</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Meta Anual de Lectura</Text>
              <Ionicons name="trophy" size={24} color={Colors.accentYellow} />
            </View>

            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                Has leído <Text style={styles.highlight}>{booksRead}</Text> de {userData.annualGoal} libros
              </Text>
              <Text style={styles.percentText}>{Math.round(progressPercent)}%</Text>
            </View>

            {/* BARRA DE PROGRESO PERSONALIZADA RASTA */}
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${progressPercent}%` }
                ]} 
              />
            </View>

            <Text style={styles.statsFooter}>
              {progressPercent >= 100 
                ? '¡Felicidades! Lograste tu meta del año 🦁' 
                : `Te faltan ${userData.annualGoal - booksRead} libros para tu objetivo.`}
            </Text>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={20} color={Colors.surface} />
            <Text style={styles.editProfileBtnText}>Editar Información</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  /* --- ESTILOS MODO VISTA --- */
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.accentYellow,
    textAlign: 'center',
  },
  userBio: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 40,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  progressText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  percentText: {
    color: Colors.accentYellow,
    fontWeight: 'bold',
    fontSize: 20,
  },
  highlight: {
    color: Colors.accentGreen,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accentGreen, // O un gradiente si fuera posible
    borderRadius: 6,
  },
  statsFooter: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 12,
  },
  editProfileBtnText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  /* --- ESTILOS MODO EDICIÓN --- */
  formContainer: {
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accentYellow,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: Colors.textSecondary,
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 0.45,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 0.45,
    backgroundColor: Colors.accentGreen,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
});
