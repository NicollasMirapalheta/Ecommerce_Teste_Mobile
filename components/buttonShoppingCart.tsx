import { CartContext } from '@/contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const ButtonShoppingCart = () => {
    const { cartSummary } = useContext(CartContext);
    const navigation:any = useNavigation(); // Usando `useNavigation` para acessar a navegação
    return (
        <View style={styles.container}>
            <View>
                <Text>Total sem a entrega</Text>
                <Text>{`R$ ${cartSummary.totalPrice.toFixed(2)} | ${cartSummary.totalQuantity} item`}</Text>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate('(tabs)/shoppingCart')}}>
                <View style={styles.outerContainer}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Ver carrinho</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: '#F8F8F8', 
        borderWidth: 1, 
        borderColor: '#F1F1F1',
        flexDirection: 'row', 
        paddingHorizontal: 40
    },
    outerContainer: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#57CEA7',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center', padding: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ButtonShoppingCart;
