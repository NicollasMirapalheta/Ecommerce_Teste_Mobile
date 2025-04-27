import { CartContext } from '@/contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Modal } from 'react-native';

const BarBuyEnd = () => {
    const { cartSummary, clearCart } = useContext(CartContext);
    const navigation: any = useNavigation(); // Usando `useNavigation` para acessar a navegação
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    return (
        <View style={{
            position: 'absolute', bottom: 0, width: '100%', alignItems: 'center',
            justifyContent: 'space-between', borderWidth: 1, borderColor: '#F1F1F1',
            flexDirection: 'row', paddingHorizontal: 15, paddingLeft: 20,backgroundColor: '#F8F8F8'
        }}>
            <View>
                <Text>Total sem a entrega</Text>
                <Text>{`R$ ${cartSummary.totalPrice.toFixed(2)} | ${cartSummary.totalQuantity} item`}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                if (cartSummary.totalQuantity !== 0) {
                    setShowSuccessModal(true); // Mostra o modal de sucesso  ao adicionar no carrinho
                    setTimeout(() => {
                        setShowSuccessModal(false)
                        navigation.pop(2); // Volta para a tela anterior
                        clearCart()
                    }, 1000);
                } else {
                    setShowFailModal(true);
                    setTimeout(() => {
                        setShowFailModal(false)
                    }, 1000);
                }

            }}>
                <View style={styles.outerContainer}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Finalizar compra !!</Text>
                </View>
            </TouchableOpacity>
            <Modal
                visible={showSuccessModal} // Controla a visibilidade
                transparent={true} // Permite que o fundo seja transparente
                animationType="fade" // Animação de abertura/fechamento
                onRequestClose={() => setShowSuccessModal(false)} // Fecha o modal ao pressionar "Voltar"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Compra finalizada com sucesso!
                        </Text>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showFailModal} // Controla a visibilidade
                transparent={true} // Permite que o fundo seja transparente
                animationType="fade" // Animação de abertura/fechamento
                onRequestClose={() => setShowFailModal(false)} // Fecha o modal ao pressionar "Voltar"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Não há produtos no carrinho!
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        padding: 10,
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

export default BarBuyEnd;
