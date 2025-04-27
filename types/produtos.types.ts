export interface Produto {
    Id: number;
    Categoria: string;
    Nome: string;
    Descricao: string;
    Preco: number;
    Estoque: number;
    [key: string]: any; // Para propriedades adicionais, se necessário
    ImagemURL: string; // Adicionando a propriedade ImagemURL
  }
  