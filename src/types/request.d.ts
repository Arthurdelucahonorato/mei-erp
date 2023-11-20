import { RequestStatusEnum } from "./enum/request.status.enum";
import { Unit } from "./enum/unit.enum";

type RequestItem = {
  id: number;
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  observacao: string;
  valorUnitario: number;
  produto: {
    categoria: any;
    imagensProduto: ProductImages[];
    id: number;
    descricao: string;
    categoria: Category;
    categoriaId: number;
    variacaoId: number;
    unidade: Unit;
  };
};

type Category = {
  id: number;
  descricao: string;
};

type ProductImages = {
  id: number;
  path: string;
};

type OrderRequest = {
  id: number;
  createdAt: Date;
  cliente: Client;
  dataRetirada: Date;
  itensPedido: RequestItem[];
  status: RequestStatusEnum;
  valorTotal: number;
};
