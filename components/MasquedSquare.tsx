import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const XRayEffect: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* View 1 - View de Fundo */}
      <View style={styles.view1}>
        <Text style={styles.text}>View 1</Text>
      </View>
      
      {/* View 2 - View Preta */}
      <View style={styles.view2} />
      
      {/* View 3 - View com Efeito de "Raio-X" */}
      <View style={styles.view3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  view1: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: 'blue', // Cor para visualização
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: 'black',
    opacity: 0.8, // Ajuste a opacidade conforme necessário
  },
  view3: {
    position: 'absolute',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150, // Ajuste o raio da borda para criar uma área circular
    backgroundColor: 'rgba(0, 0, 0, 0)', // Cor transparente com borda ajustada
    borderColor: 'white',
    borderWidth: 5,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default XRayEffect;
