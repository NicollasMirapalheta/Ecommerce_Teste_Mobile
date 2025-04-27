import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import tabsData from '@/components/TabsData';
import { FiltroProvider } from '@/contexts/filterContext';
import SearchBar from '@/components/searchBr';
import ButtonShoppingCart from '@/components/buttonShoppingCart';

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlineLeft = useRef(new Animated.Value(0)).current;
  const [scrollX, setScrollX] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);


  const tabsRef = useRef<Array<React.ElementRef<typeof View> | null>>([]);
  const scrollViewRef = useRef<ScrollView | null>(null); // Certificando-se de que é nulo inicialmente
  useEffect(() => {
    const layout = tabLayouts[selectedIndex];
    if (layout) {
      const reducedWidth = layout.width * 0.7; // Reduzindo a largura para 60% (ajuste conforme necessário)
      const offset = (layout.width - reducedWidth) / 2; // Calculando o deslocamento para centralizar

      Animated.parallel([
        Animated.timing(underlineLeft, {
          toValue: layout.x + offset, // Ajusta a posição centralizada
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(underlineWidth, {
          toValue: reducedWidth, // Define a nova largura
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [selectedIndex, tabLayouts]);


  return (
    <View style={styles.container}>
      <ScrollView>
        <FiltroProvider>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 100, height: 100, marginLeft: 20 }}
              />
              <View>
                <Text style={{ color: 'white', fontSize: 18 }}>O melhor para o seu </Text>
                <Text style={{ color: 'white', fontSize: 18 }}>MELHOR AMIGO!</Text>
              </View>
            </View>
            <SearchBar />
            <View style={{ marginHorizontal: 16, marginTop: 30 }}>
              <ScrollView
                ref={scrollViewRef} // Usando a referência correta para o ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 5 }}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => setScrollX(event.nativeEvent.contentOffset.x)}
                scrollEventThrottle={16}
              >

                {tabsData.map((tab, idx) => (
                  <View
                    key={idx}
                    onLayout={(event) => {
                      const { x, width } = event.nativeEvent.layout;
                      setTabLayouts((prev) => {
                        const newLayouts = [...prev];
                        newLayouts[idx] = { x, width };
                        return newLayouts;
                      });
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedIndex(idx)}
                      style={styles.tabButton}
                    >
                      <View>{tab.image}</View>
                      <Text style={styles.tabText}>{tab.label}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <Animated.View
                  style={[
                    styles.underline,
                    {
                      left: underlineLeft,
                      width: underlineWidth,
                    },
                  ]}
                />
              </ScrollView>
            </View>
            <View style={styles.contentContainer}>
              {tabsData[selectedIndex].content}
            </View>
          </View>
        </FiltroProvider>
      </ScrollView>
      <ButtonShoppingCart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: 'white'
  },
  header:{ 
    flexDirection: 'row', 
    width: '100%', 
    height: 175, 
    backgroundColor: '#57CEA7', 
    borderBottomEndRadius: 40, 
    borderBottomStartRadius: 40, 
    alignItems: 'center' 
  },
  underline: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#57CEA7',
    bottom: 0,
    borderRadius: 20
  },
  tabButton: {
    marginHorizontal: 10,
    backgroundColor: '#E7E7E7',
    borderRadius: 20,
    width: 80,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 13,
  },
  contentContainer: {
    height: '100%',
    padding: 16,
    marginBottom: 100
  },
});
