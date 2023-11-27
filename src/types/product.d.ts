import { CategoryEnum } from "./enum/category.enum";

type Product = {
  id: number;
  categoria: CategoryEnum;
  descricao: string;
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
