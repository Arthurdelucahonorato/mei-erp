import { DeliveryModalityEnum } from "./enum/deliveryModality.enum";
import { PaymentMethodsEnum } from "./enum/paymentMethods.enum";
import { RequestStatusEnum } from "./enum/request.status.enum";
import { Unit } from "./enum/unit.enum";

type RequestItem = {
  id: number;
  pedidoId: number;
  quantidade: number;
  observacao: string;
  valorUnitario: number;
  produto: {
    id: number;
    categoria: any;
    imagensProduto: ProductImages[];
    descricao: string;
    categoria: Category;
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
  dataPedido: Date;
  dataEntrega: Date;
  itensPedido: RequestItem[];
  status: RequestStatusEnum;
  modalidadeEntrega: DeliveryModalityEnum;
  formaPagamento: PaymentMethodsEnum;
  observacao: string;
  valorTotal: number;
};
