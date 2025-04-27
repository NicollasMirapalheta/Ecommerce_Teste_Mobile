// src/components/LoginBody.tsx
import React, { useEffect, useState } from 'react';
import { useLoginRender } from './StateLoginRender';
import { StyleSheet, View, Text, Animated, Alert, Image } from 'react-native';
import InputField from './InputField';
import { login, register } from '../src/services/api';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


interface LoginBodyProps {
    translateX: Animated.Value;
}

const LoginBody: React.FC<LoginBodyProps> = ({ translateX }) => {
    const { loginRenderType } = useLoginRender();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation: any = useNavigation();

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [loginRenderType]);
    

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            navigation.navigate('(screens)/home')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Se for um erro do Axios, podemos acessar o response
                Alert.alert('Erro no Login', error.response?.data?.message || 'Algo deu errado');
                navigation.navigate('(screens)/home')
            } else if (error instanceof Error) {
                // Se for um erro genérico do JavaScript
                Alert.alert('Erro no Login', error.message);
            } else {
                // Se não soubermos o tipo do erro
                Alert.alert('Erro no Login', 'Algo deu errado');
            }
        }
    };

    const handleRegister = async () => {
        try {
            const response = await register(phoneNumber, email, password);
            Alert.alert('Cadastro bem-sucedido', response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert('Erro no Cadastro', error.response?.data?.message || 'Algo deu errado');
            } else if (error instanceof Error) {
                Alert.alert('Erro no Cadastro', error.message);
            } else {
                Alert.alert('Erro no Cadastro', 'Algo deu errado');
            }
        }
    };


    return (
        <>
            {loginRenderType === 'sign in' && (
                <Animated.View style={[styles.boxSignin, { transform: [{ translateX }] }]}>
                    <Text style={{ color: '#57CEA7', fontSize: 22, marginTop: 80, marginBottom: 40 }}>Acesse sua conta</Text>
                    <InputField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        icon={require('../assets/images/User.png')}
                    />
                    <InputField
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        icon={require('../assets/images/Lock.png')}
                    />
                    <View style={styles.button} onTouchEnd={handleLogin}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Entrar</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '70%', height: 20, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 5, backgroundColor: '#57CEA7', borderRadius: 999 }} />
                        <Text style={{ color: 'black', marginHorizontal: 5, opacity: 0.30 }}>OU</Text>
                        <View style={{ width: 80, height: 5, backgroundColor: '#57CEA7', borderRadius: 999 }} />
                    </View>
                    <View style={{ backgroundColor: '#E7E7E7', width: '75%', height: 50, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 15 }}>
                        <Image
                            source={require('../assets/images/instagram.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                        <Image
                            source={require('../assets/images/linkedin.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                        <Image
                            source={require('../assets/images/Google.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                    </View>
                </Animated.View>
            )}
            {loginRenderType === 'sign up' && (
                <Animated.View style={[styles.boxSignup, { transform: [{ translateX }] }]}>
                    <Text style={{ color: '#57CEA7', fontSize: 22, marginTop: 30, marginBottom: 30 }}>Crie sua conta</Text>
                    <InputField
                        placeholder="Numero de celular"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        icon={require('../assets/images/smartphone.png')}
                    />
                    <InputField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        icon={require('../assets/images/User.png')}
                    />
                    <InputField
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        icon={require('../assets/images/Lock.png')}
                    />
                    <View style={styles.button} onTouchEnd={handleRegister}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Registrar</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '70%', height: 20, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 5, backgroundColor: '#57CEA7', borderRadius: 999 }} />
                        <Text style={{ color: 'black', marginHorizontal: 5, opacity: 0.30 }}>OU</Text>
                        <View style={{ width: 80, height: 5, backgroundColor: '#57CEA7', borderRadius: 999 }} />
                    </View>
                    <View style={{ backgroundColor: '#E7E7E7', width: '75%', height: 50, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 15 }}>
                        <Image
                            source={require('../assets/images/instagram.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                        <Image
                            source={require('../assets/images/linkedin.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                        <Image
                            source={require('../assets/images/Google.png')}
                            style={{ width: 30, height: 30, marginHorizontal: 10 }}
                        />
                    </View>
                </Animated.View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    boxSignin: {
        width: '75%',
        height: '75%',
        marginLeft: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    boxSignup: {
        width: '75%',
        height: '75%',
        marginLeft: 15,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#57CEA7',
        width: '65%',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default LoginBody;
function createNavigationContainerRef() {
    throw new Error('Function not implemented.');
}

