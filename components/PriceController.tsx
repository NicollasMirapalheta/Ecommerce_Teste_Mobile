import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Produto } from '@/types/produtos.types';

interface PriceControlProps {
    produto: Produto; // Produto sendo manipulado
    cont: number; // Quantidade compartilhada
    setCont?: React.Dispatch<React.SetStateAction<number>>; // Função para atualizar quantidade
    updateQuantityByIndex?: (index: number, newQuantity: number) => void; // Função opcional para atualizar a quantidade de um produto pelo índice
    index?: number; // Índice do produto na lista (opcional)
    customStyles?: { // Adiciona a capacidade de passar stylesheets personalizados
        infoContainer?: object;
        roundBadgeA?: object;
        roundBadgeB?: object;
        roundBadgeC?: object;
        buttonMoreLess?: object;
        priceText?: object;
        contText?: object;
        iconImage?: object;
    };
}

const PriceControl: React.FC<PriceControlProps> = ({ produto, cont, setCont, updateQuantityByIndex, index, customStyles = {} }) => {
    const [price, setPrice] = useState(produto.Preco * cont); // Preço inicial baseado na quantidade e preço do produto
    useEffect(() => {
        setPrice(produto.Preco * cont); // Atualiza o preço sempre que a quantidade mudar    
    }, [cont]); 
    const acrescentarPreco = () => {
        if (cont < produto.Estoque) {
            if (setCont) {
                setCont((prevCont) => {
                    const newCont = prevCont + 1;
                    setPrice(produto.Preco * newCont);
                    return newCont;
                });
            }
            if (updateQuantityByIndex && index !== undefined && index !== null) {
                updateQuantityByIndex(index, cont + 1);
                setPrice(produto.Preco * (cont + 1));
            }
        }
    };

    const diminuirPreco = () => {
        if (cont > 1) {
            if (setCont) {
                setCont((prevCont) => {
                    const newCont = prevCont - 1;
                    setPrice(produto.Preco * newCont);
                    return newCont;
                });
            }
            if (updateQuantityByIndex && index !== undefined && index !== null) {
                updateQuantityByIndex(index, cont - 1);        
                setPrice(produto.Preco * (cont - 1));
            }
        }
    };

    return (
        <View style={customStyles.infoContainer}>
            <View style={customStyles.roundBadgeA}>
                <TouchableOpacity onPress={diminuirPreco} style={customStyles.buttonMoreLess}>
                    <Image source={require('../assets/images/menosIcon.png')} style={customStyles.iconImage} />
                </TouchableOpacity>
                <Text style={customStyles.contText}>{cont}</Text>
                <TouchableOpacity onPress={acrescentarPreco} style={customStyles.buttonMoreLess}>
                    <Image source={require('../assets/images/maisIcon.png')} style={customStyles.iconImage} />
                </TouchableOpacity>
            </View>
            <View style={customStyles.roundBadgeB} />
            <View style={customStyles.roundBadgeC}>
                <View style={{ width: '30%' }} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={customStyles.priceText}>{`R$ ${price.toFixed(2)}`}</Text>
                </View>
            </View>
        </View>
    );
};



export default PriceControl;
