type ClientRequest = {
  id: number;
  createdAt: Date;
  cliente: number;
  dataRetirada: Date;
  itensPedido: Product[];
  valorTotal: number;
};
