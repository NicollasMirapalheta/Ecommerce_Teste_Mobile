import React from 'react';
import { StyleSheet, Image, Animated } from 'react-native';

interface AbaProps {
  position: Animated.Value;
}

const Aba: React.FC<AbaProps> = ({ position }) => (
  <Animated.View style={[styles.container, { top: position }]}>
    <Image
      source={require('../assets/images/aba.png')}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    position: 'absolute',
  },
});

export default Aba;
