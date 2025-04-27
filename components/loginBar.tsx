import React, { useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { useLoginRender } from '../contexts/stateLoginRender';
import AbaSigUp from '@/components/SignUp';
import AbaSigIn from '@/components/SignIn';
import Aba from '@/components/Aba';
import { ColorProvider } from './ColorContext';
interface LoginBarProps {
  changeBox: () => Promise<void>;
}

const LoginBar: React.FC<LoginBarProps> = ({ changeBox }) => {
  const { loginRenderType } = useLoginRender();
  const positionBar = useRef(new Animated.Value(0)).current;
  const [currentPosition, setCurrentPosition] = useState(0); // Estado para armazenar a posição atual

  const changeBar = (): Promise<void> => {
    return new Promise((resolve) => {
      const moveTo = currentPosition === 0 ? 50 : 0; // Alterna entre 0 e 50 pixels
      Animated.timing(positionBar, {
        toValue: moveTo,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setCurrentPosition(moveTo); // Atualiza o estado após a animação
        resolve(); // Resolve a Promise quando a animação terminar
      });
    });
  };

  return (
    <ColorProvider>
    <View style={{ height: 100, justifyContent: 'flex-start' }}>
      <Aba position={positionBar} />
      <View style={{ flex: 1, justifyContent: 'space-between', marginLeft: 3 }}>
        <AbaSigIn changeBox={changeBox} changeBar={changeBar} />
        <AbaSigUp changeBox={changeBox} changeBar={changeBar} />
      </View>
    </View>
    </ColorProvider>
  );
};

export default LoginBar;
