import { useState, useEffect } from 'react';
import produtosJson from '../assets/data/produtos.json'; // Ajuste o caminho conforme necessário
import { Produto } from '../types/produtos.types'; // Ajuste o caminho conforme necessário
import { useFiltro } from '@/contexts/filterContext';

const useProdutosPorCategoria = (categoria: string): Produto[] => {
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
    const { filtro } = useFiltro(); 

    useEffect(() => {
        // Filtra os produtos pela categoria e aplica o filtro de texto
        const filtrarProdutos = () => {
            const produtos = produtosJson.Produtos || [];

            // Filtrando por categoria e texto do filtro
            const filtrados = produtos.filter((produto: Produto) => {
                const pertenceACategoria = produto.Categoria === categoria;
                const textoCorresponde = filtro === '' || produto.Nome.toLowerCase().includes(filtro.toLowerCase());
                return pertenceACategoria && textoCorresponde;
            });

            setProdutosFiltrados(filtrados);
        };

        filtrarProdutos();
    }, [categoria, filtro]); // Atualiza quando a categoria ou filtro mudam

    return produtosFiltrados;
};

export default useProdutosPorCategoria;
