type OrderRequest = {
  id: number;
  createdAt: Date;
  cliente: number;
  dataRetirada: Date;
  itensPedido: Product[];
  valorTotal: number;
};
