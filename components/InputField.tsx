// src/components/InputField.tsx
import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    icon: any;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText, icon }) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                value={value}
                onChangeText={onChangeText}
                maxLength={50} // Limite de caracteres (opcional)
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E7E7E7',
        width: '75%',
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden', // Evita que o conteúdo ultrapasse os limites
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    input: {
        flex: 1, // Ocupa o espaço disponível
        height: '90%',
        fontSize: 16,
        paddingHorizontal: 10, // Adiciona um pouco de espaço interno
    },
});

export default InputField;
