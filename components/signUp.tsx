import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLoginRender } from './StateLoginRender';
import { useColorContext } from './ColorContext';

interface AbaSigUpProps {
  changeBox: () => Promise<void>;
  changeBar: () => Promise<void>;
}

const AbaSigUp: React.FC<AbaSigUpProps> = ({ changeBox, changeBar }) => {
  const { loginRenderType, setLoginRenderType } = useLoginRender();
  const { colorAbaSigUp, toggleColors } = useColorContext();

  const handlePress = async () => {
    if (loginRenderType === 'sign in') {
      // Muda a cor no meio da animação da barra
      setTimeout(() => {
        toggleColors(); // Alterna as cores dos botões
      }, 50);
      changeBar(); // Aguarda a animação de mudança da barra terminar
      await changeBox(); // Aguarda a animação terminar
    }
    setLoginRenderType('sign up'); // Altera para 'sign up' após a animação
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ justifyContent: 'center' }} onPress={handlePress}>
        <Text style={{ color: colorAbaSigUp, marginLeft: 5 }}>
          Criar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
  },
});

export default AbaSigUp;
