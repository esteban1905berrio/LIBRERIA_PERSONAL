import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';

// Mantenemos una referencia a nuestra imagen local de respaldo
const DEFAULT_COVER = require('../../assets/default-cover.png');

export default function SmartImage({ uri, style, resizeMode = 'cover' }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Si no hay URI, mostramos el respaldo de inmediato
  if (!uri) {
    return <Image source={DEFAULT_COVER} style={style} resizeMode={resizeMode} />;
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={hasError ? DEFAULT_COVER : { uri }}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
      
      {isLoading && !hasError && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={Colors.accentYellow} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
