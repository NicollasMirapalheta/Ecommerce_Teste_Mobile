import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import useProdutosPorCategoria from '../hooks/useProdutosPorCategoria';
import { Produto } from '../types/produtos.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsNavigationProp } from '../types/navigationProduct.types';

interface ButtonProdutosProps {
  categoria: string;
}

const ButtonProdutos: React.FC<ButtonProdutosProps> = ({ categoria }) => {
  const produtos = useProdutosPorCategoria(categoria);
  const navigation: ProductsNavigationProp = useNavigation();
  const imagensPorCategoria: Record<string, any> = {
    Brinquedos: require('../assets/images/BrinquedosIcon.png'),
    Petshops: require('../assets/images/petshopIcon.png'),
    Rações: require('../assets/images/racaoIcon.png'),
    Casinhas: require('../assets/images/casinhaIcon.png'),
  };

  return (
    <View>
      {produtos.map((produto: Produto, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.touchable}
          onPress={() => navigation.navigate('(screens)/products', { produto })}
        >
          <View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image
                  source={imagensPorCategoria[categoria]}
                  style={styles.icon}
                />
              </View>
              <View>
                <View style={styles.productImageContainer}>
                  <Image
                    source={{ uri: produto.ImagemURL }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.productDetails}>
                <View style={styles.productNameContainer}>
                  <Text>{produto.Nome}</Text>
                </View>
                <View style={styles.priceStockRow}>
                  <View style={styles.priceBadge}>
                    <Text>{`R$ ${produto.Preco}`}</Text>
                  </View>
                  <View style={styles.stockBadgeContainer}>
                    <View style={styles.stockBadge}>
                      <Text>{`(${produto.Estoque})`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    margin: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: '#57CEA7',
    borderRadius: 999,
    width: 25,
    height: 60,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 999,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 5,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    resizeMode: 'cover',
  },
  productDetails: {
    justifyContent: 'space-between',
    paddingBottom: 3,
    flex: 1,
    maxWidth: '90%',
  },
  productNameContainer: {
    maxWidth: '100%',
    marginBottom: 15,
  },
  priceStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceBadge: {
    backgroundColor: '#57CEA7',
    borderRadius: 999,
    paddingHorizontal: 10,
    height: 25,
  },
  stockBadgeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    height: 25,
  },
});

export default ButtonProdutos;
