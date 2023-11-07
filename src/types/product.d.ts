type Product = {
  id: number;
  categoria: {
    id: number;
    descricao: string;
  };
  descricao: string;
  variacao: {
    id: number;
    descricao: string;
  };
  quantidade: number;
  observacao: string;
  valor: number;
  unidade: string;
  imagensProduto: [
    {
      id: number;
      path: string;
      produtoId: number;
    }
  ];
};
