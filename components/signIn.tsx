import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLoginRender } from '../contexts/stateLoginRender';
import { useColorContext } from './ColorContext';
interface AbaSigInProps {
  changeBox: () => Promise<void>;
  changeBar: () => Promise<void>;
}
const AbaSigIn: React.FC<AbaSigInProps> = ({ changeBox, changeBar }) => {
  const { loginRenderType, setLoginRenderType } = useLoginRender();
  const { colorAbaSigIn, toggleColors } = useColorContext();

  const handlePress = async () => {
    if (loginRenderType === 'sign up') {
      // Muda a cor no meio da animação da barra
      setTimeout(() => {
        toggleColors(); // Alterna as cores dos botões
      }, 50);
      changeBar(); // Aguarda a animação de mudança da barra terminar
      await changeBox(); // Aguarda a animação de mudança de box terminar
    }
    setLoginRenderType('sign in'); // Altera para 'sign in' após as animações
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ justifyContent: 'center' }} onPress={handlePress}>
        <Text style={{ color: colorAbaSigIn, marginLeft: 5 }}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default AbaSigIn;
