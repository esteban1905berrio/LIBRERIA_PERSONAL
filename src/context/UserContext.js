import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const USER_STORAGE_KEY = '@hojas_raices_user';

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Lector Rasta',
    bio: 'Leyendo para conectar con las raíces.',
    annualGoal: 12,
  });
  const [isUserLoading, setIsUserLoading] = useState(true);

  // 1. CARGA INICIAL: Leer perfil del disco duro
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser !== null) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error cargando perfil:', error);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUserData();
  }, []);

  // 2. GUARDADO AUTOMÁTICO
  useEffect(() => {
    const saveUserData = async () => {
      if (!isUserLoading) {
        try {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
          console.error('Error guardando perfil:', error);
        }
      }
    };

    saveUserData();
  }, [userData, isUserLoading]);

  const updateUserInfo = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, isUserLoading, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};
