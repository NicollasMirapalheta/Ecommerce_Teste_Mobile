import { useFiltro } from '@/contexts/filterContext';
import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const SearchBar: React.FC = () => {
    const { filtro, setFiltro } = useFiltro();
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../assets/images/lupaIcon.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={filtro}
                        onChangeText={(text) => setFiltro(text)}
                        placeholder="O que seu pet precisa hoje?"
                        style={styles.input}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        maxWidth: '80%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 999,
        elevation: 4,
        alignSelf: 'center',
        marginTop: -30,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    icon: {
        width: 40,
        height: 60,
        marginLeft: 10,
        resizeMode: 'cover',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 14,
    },
});

export default SearchBar;
