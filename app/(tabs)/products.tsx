import ButtonShoppingCart from '@/components/buttonShoppingCart';
import { Produto } from '@/types/produtos.types';
import { useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { CartContext } from '@/contexts/CartContext';
import PriceControl from '@/components/PriceController';

type ProductScreenProps = {
    route: {
        params: {
            produto: Produto;
        };
    };
};
const ProductsScreen: React.FC<ProductScreenProps> = () => {
    const { addToCart } = useContext(CartContext);
    const route = useRoute(); // Usando `useRoute` para acessar os parâmetros da rota
    const { produto } = route.params as { produto: Produto }; // Obtendo o parâmetro `produto`
    const [cont, setCont] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: produto.ImagemURL }}
                            style={styles.image}
                        />
                    </View>
                </View>
                <PriceControl produto={produto} cont={cont} setCont={setCont} customStyles={stylesPriceController} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.productNameText}>{produto.Nome}</Text>
                    <Text style={styles.productCategoryText}>{produto.Categoria}</Text>
                    <Text style={styles.sectionTitle}>Sobre o produto</Text>
                    <Text style={styles.productCategoryText}>{produto.Descricao}</Text>
                    <Text style={styles.sectionTitle}>Informações adicionais</Text>
                    {Object.keys(produto)
                        .filter(
                            (key) =>
                                !["Nome", "Descricao", "Preco", "Estoque", "ImagemURL", "Id"].includes(key) // Filtra apenas características adicionais
                        )
                        .map((key) => {
                            const valor = produto[key];
                            if (typeof valor === "object" && valor !== null) {
                                return (
                                    <View key={key} style={styles.additionalInfoContainer}>
                                        <Text style={styles.additionalInfoValue}>{`${key}: ${JSON.stringify(valor)}`}</Text>
                                        <Text style={styles.additionalInfoValue}></Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={key} style={styles.additionalInfoContainer}>
                                        <Text style={styles.additionalInfoKey}>{`${key}:`}</Text>
                                        <Text style={styles.additionalInfoValue}>{valor}</Text>
                                    </View>
                                );
                            }
                        })}
                </View>
            </ScrollView>
            <View>
                <View style={styles.addIntoCart}>
                    <TouchableOpacity style={styles.buttonAddIntoCart} onPress={() => {
                        addToCart(produto, cont)
                        setCont(1)
                        setShowSuccessModal(true); // Mostra o modal de sucesso  ao adicionar no carrinho
                        setTimeout(() => setShowSuccessModal(false), 2000);
                    }}>
                        <View >
                            <Text style={styles.addCartText}>{`Adicionar ao carrinho`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ButtonShoppingCart />
            </View>
            <Modal
                visible={showSuccessModal} // Controla a visibilidade
                transparent={true} // Permite que o fundo seja transparente
                animationType="fade" // Animação de abertura/fechamento
                onRequestClose={() => setShowSuccessModal(false)} // Fecha o modal ao pressionar "Voltar"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Item adicionado ao carrinho com sucesso!
                        </Text>
                    </View>
                </View>
            </Modal>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 300,
        backgroundColor: '#57CEA7',
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        alignItems: 'center',
        padding: 50,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    addCartText:{
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    addIntoCart: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
        right: 0,

    },
    buttonAddIntoCart: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        height: 50,
        zIndex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    roundBadgeA: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        width: '40%',
        paddingHorizontal: 5,
        height: 50,
        zIndex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonMoreLess: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundBadgeB: {
        backgroundColor: 'white',
        borderRadius: 999,
        width: '40%',
        marginRight: -70,
        marginLeft: -130,
        height: 50,
        zIndex: 2
    },
    roundBadgeC: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        minWidth: '50%',
        height: 50,
        zIndex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    detailsContainer: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1,
        marginBottom: 150
    },
    productNameText: {
        fontSize: 24,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    productCategoryText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    additionalInfoContainer: {
        marginBottom: 10,
        maxWidth: '100%'
    },
    additionalInfoKey: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 5,
    },
    additionalInfoValue: {
        fontSize: 16,
        color: '#555',
        flexShrink: 1, // Permite que o texto se ajuste ao espaço disponível.
        flexWrap: 'wrap', // Quebra o texto em múltiplas linhas, se necessário.
        maxWidth: '85%' // Garante que o texto não ultrapasse o espaço do container.
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    },
    modalContent: {
        padding: 20,
        backgroundColor: '#57CEA7',
        borderRadius: 10,
        alignItems: 'center',
        maxWidth: '70%',

    },
});
const stylesPriceController = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    roundBadgeA: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        width: '40%',
        paddingHorizontal: 5,
        height: 50,
        zIndex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonMoreLess: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    roundBadgeB: {
        backgroundColor: 'white',
        borderRadius: 999,
        width: '40%',
        marginRight: -70,
        marginLeft: -130,
        height: 50,
        zIndex: 2,
    },
    roundBadgeC: {
        backgroundColor: '#57CEA7',
        borderRadius: 999,
        minWidth: '50%',
        height: 50,
        zIndex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    priceText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default ProductsScreen;