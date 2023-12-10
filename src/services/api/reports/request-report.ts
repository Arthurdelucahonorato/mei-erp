import { PaymentMethodsEnum } from "@/types/enum/paymentMethods.enum";
import { RequestStatusEnum } from "@/types/enum/request.status.enum";
import { api } from "../api";

type FilterRequestReport = {
  dataInicio?: string;
  dataFim?: string;
  status?: RequestStatusEnum;
  formaPagamento?: PaymentMethodsEnum;
  clienteId?: string;
};

export const requestReport = async (data: FilterRequestReport) => {
  const urlParams = new URLSearchParams({
    ...data,
    clienteId: String(data.clienteId),
  });

  const request = await api.get(`reports/requests?${String(urlParams)}`, {
    responseType: "arraybuffer",
    headers: {
      setContentType: "application/pdf",
    },
  });

  const blob = new Blob([request.data], { type: "application/pdf" });

  // Criar uma URL para o Blob
  const pdfUrl = URL.createObjectURL(blob);

  return pdfUrl;
};
