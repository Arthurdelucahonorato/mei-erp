import { RequestStatusEnum } from "./enum/request.status.enum";
import { Unit } from "./enum/unit.enum";

type OrderRequest = {
  id: number;
  createdAt: Date;
  cliente: Client;
  dataRetirada: Date;
  itensPedido: {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    observacao: string;
    valorUnitario: number;
    produto: {
      id: number;
      descricao: "teste produto xesq";
      categoriaId: number;
      variacaoId: number;
      unidade: Unit;
    };
  }[];
  status: RequestStatusEnum;
  valorTotal: number;
};
