import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ButtonProdutos from './ButtonProdutos';

interface TabData {
  image: React.ReactNode
  label: string;
  content: React.ReactNode; // Pode ser um componente ou uma string
}
const styles = StyleSheet.create({
  imagebox: {
    width: 60, 
    height: 60,
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius:10
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  }
})

const tabsData: TabData[] = [
  {
    image: (
      <View>
        <View style={styles.imagebox}>
          <Image
            source={require('../assets/images/petshopIcon.png')}
            style={styles.image}
          /></View>
      </View>
    ),
    label: 'Petshops',
    content: (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ButtonProdutos categoria="Petshops" />
      </View>
    ),
  },
  {
    image: (
      <View>
        <View style={styles.imagebox}>
          <Image
            source={require('../assets/images/BrinquedosIcon.png')}
            style={styles.image}
          /></View>
      </View>
    ),
    label: 'Brinquedos',
    content: (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ButtonProdutos categoria="Brinquedos" />
      </View>
    ),
  },
  {
    image: (
      <View>
        <View style={styles.imagebox}>
          <Image
            source={require('../assets/images/racaoIcon.png')}
            style={styles.image}
          /></View>
      </View>
    ),
    label: 'Rações',
    content: (
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <ButtonProdutos categoria="Rações" />
      </View>
    ),
  },
  {
    image: (
      <View>
        <View style={styles.imagebox}>
          <Image
            source={require('../assets/images/racaoIcon.png')}
            style={styles.image}
          /></View>
      </View>
    ),
    label: 'Casinhas',
    content: (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ButtonProdutos categoria="Casinhas" />
      </View>
    ),
  },
];


export default tabsData;
