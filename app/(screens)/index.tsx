import { Image, StyleSheet, View, Text, Animated,  ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import BackgroudLogin from '@/assets/svg/backgroudLogin';
import LoginBar from '@/components/LoginBar';
import { LoginRenderProvider } from '@/contexts/stateLoginRender';
import LoginBody from '@/components/LoginBody';
import { useRef } from 'react';

export default function HomeScreen() {
  const translateX = useRef(new Animated.Value(0)).current;
  const changeBox = (): Promise<void> => {
    return new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -300, // Anima o componente para fora da tela
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        resolve(); // Resolve a Promise quando a animação termina
      });
    });
  };
  return (
    <ThemedView style={{ flex: 1 }} >
      <ScrollView>
        <View style={styles.loginContainer}>
          <LoginRenderProvider>
            <View style={styles.loginContainerA}>
              <View style={styles.loginContainerB}>
                <BackgroudLogin />
                <LoginBar changeBox={changeBox} />
              </View>
            </View>
            <View style={styles.LogoPlusText}>
              <View style={styles.headerGreenBar} />
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo} />
              <Text style={styles.textWelcome}>Bem Vindo!</Text>
            </View>
            <LoginBody translateX={translateX} />
          </LoginRenderProvider>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  LogoPlusText: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: '20%', paddingTop: 20
  },
  logo: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  loginContainer: {
    minHeight: '100%',
    backgroundColor: '#57CEA7'
  },
  loginContainerA: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end'
  },
  loginContainerB: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerGreenBar:{
    minWidth: '100%', 
    minHeight: '110%', 
    position: 'absolute', 
    top: 0, 
    backgroundColor: '#57CEA7', 
    borderBottomStartRadius: 50 
  },
  
  textWelcome: {
    color: '#EEEEEE', 
    fontSize: 28, 
    marginLeft: -5
  }
});
