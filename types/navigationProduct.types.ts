import { Produto } from '../types/produtos.types'; // Ajuste o caminho conforme necessário
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    "(tabs)/products": { produto: Produto }; // Tipagem da rota 'Products' com um objeto Produto como parâmetro
    Home: undefined; // Exemplo de rota que não espera parâmetros
};

export type ProductsNavigationProp = NativeStackNavigationProp<RootStackParamList, '(tabs)/products'>;
