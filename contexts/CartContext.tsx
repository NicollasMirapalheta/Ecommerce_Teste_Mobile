import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from "@/types/produtos.types";

interface CartItem extends Produto {
    quantity: number; // Quantidade do produto no carrinho
}

interface CartSummary {
    totalPrice: number; // Valor total do carrinho
    totalQuantity: number; // Número total de produtos no carrinho
}

interface CartContextProps {
    cart: CartItem[]; // Lista de produtos no carrinho
    cartSummary: CartSummary; // Resumo do carrinho
    addToCart: (produto: Produto, quantity: number) => void; // Função para adicionar produto ao carrinho
    clearCart: () => void; // Função para limpar o carrinho
    removeByIndex: (index: number) => void; // Função para remover produto pelo índice
    updateQuantityByIndex: (index: number, newQuantity: number) => void; // Função para atualizar a quantidade de um produto pelo índice
}

export const CartContext = createContext<CartContextProps>({
    cart: [],
    cartSummary: { totalPrice: 0, totalQuantity: 0 },
    addToCart: () => {},
    clearCart: () => {},
    removeByIndex: () => {},
    updateQuantityByIndex: () => {},
    
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]); // Estado para armazenar os produtos no carrinho
    const [cartSummary, setCartSummary] = useState<CartSummary>({
        totalPrice: 0,
        totalQuantity: 0,
    });

    // Carregar o carrinho do AsyncStorage ao iniciar o app
    useEffect(() => {
        const loadCart = async () => {
            const cartData = await AsyncStorage.getItem('cart');
            const parsedCart = JSON.parse(cartData || '[]');
            setCart(parsedCart);
        };
        loadCart();
    }, []);

    // Atualizar o resumo do carrinho (preço total e quantidade total) sempre que o carrinho mudar
    useEffect(() => {
        const summary = cart.reduce(
            (accumulator, item) => {
                accumulator.totalPrice += item.Preco * item.quantity; // Soma o preço total
                accumulator.totalQuantity += item.quantity; // Soma a quantidade total
                return accumulator;
            },
            { totalPrice: 0, totalQuantity: 0 } // Inicializa os valores do acumulador
        );
        setCartSummary(summary); // Atualiza o resumo no estado
        AsyncStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho atualizado no AsyncStorage
    }, [cart]);

    // Adicionar produto ao carrinho
    const addToCart = (produto: Produto, quantity: number) => {
        setCart((prevCart) => {
            // Verifica se o produto já está no carrinho
            const existingProductIndex = prevCart.findIndex((item) => item.id === produto.Id);
    
            if (existingProductIndex !== -1) {
                // Produto já existe no carrinho: atualiza a quantidade
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Produto não existe no carrinho: adiciona como novo
                return [...prevCart, { ...produto, quantity }];
            }
        });
    };
    const updateQuantityByIndex = (index: number, newQuantity: number) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            if (newQuantity > 0) {
                updatedCart[index].quantity = newQuantity; // Atualiza a quantidade do item
            } else {
                updatedCart.splice(index, 1); // Remove o item se a quantidade for 0 ou menor
            }
            return updatedCart;
        });
    };
    
   
    const removeByIndex = (index: number) => {
        setCart((prevCart) => {
            // Filtra o carrinho para excluir o item no índice fornecido
            const updatedCart = prevCart.filter((_, i) => i !== index);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        AsyncStorage.removeItem('cart'); // Limpa os dados do AsyncStorage
    };

    return (
        <CartContext.Provider value={{ cart, cartSummary, addToCart, clearCart, removeByIndex, updateQuantityByIndex }}>
            {children}
        </CartContext.Provider>
    );
};
