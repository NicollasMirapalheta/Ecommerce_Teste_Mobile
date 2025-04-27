import { Produto } from '@/types/produtos.types';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CartContext } from '@/contexts/cartContext';
import PriceControl from '@/components/PriceController';
import BarBuyEnd from '@/components/BarBuyEnd';

const ShoppingCartScreen = () => {
    const { cart, removeByIndex, updateQuantityByIndex } = useContext(CartContext);
    const produtos = cart || [];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Carrinho</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.productsContainer}>
                    {produtos.map((produto: Produto, index: number) => (
                        <View style={styles.productRow} key={index}>
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
                                <View>
                                    <View style={styles.productNameRow}>
                                        <Text>{produto.Nome}</Text>
                                    </View>
                                    <PriceControl
                                        key={index}
                                        produto={produto}
                                        cont={produto.quantity}
                                        updateQuantityByIndex={updateQuantityByIndex}
                                        index={index}
                                        customStyles={stylesPriceController}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => removeByIndex(index)}>
                                    <View style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Excluir</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <BarBuyEnd />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderColor: '#f0f0f0',
    },
    productsContainer: {
        marginBottom: 100,
    },
    productRow: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderColor: '#f0f0f0',
        marginBottom: 10,
        paddingRight: 5,
        width: '90%',
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
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
        resizeMode: 'cover',
    },
    productDetails: {
        justifyContent: 'space-between',
        paddingVertical: 3,
        flex: 1,
        maxWidth: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButton: {
        borderWidth: 1,
        borderRadius: 999,
        paddingHorizontal: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        fontSize: 14,
    },
});

const stylesPriceController = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        resizeMode: 'contain',
    },
    roundBadgeA: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 3,
        height: 25,

    },
    buttonMoreLess: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    roundBadgeB: {
        backgroundColor: 'white',
        borderRadius: 999,
        width: 80,
        height: 25,
        zIndex: 2,
        marginRight: -40,
        marginLeft: -75,

    },
    roundBadgeC: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        minWidth: '50%',
        height: 25,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
    },
    priceText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    contText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});




export default ShoppingCartScreen;