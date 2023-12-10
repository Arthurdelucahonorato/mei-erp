import React, { useState } from "react";
import ComboBox from "@/components/ComboBox";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PaymentMethodsEnum } from "@/types/enum/paymentMethods.enum";
import { RequestStatusEnum } from "@/types/enum/request.status.enum";
import toast from "react-hot-toast";
import { requestReport } from "@/services/api/reports/request-report";
import { Input } from "@/components/Input";
import { Box } from "@/components/Box";
import { enumToList } from "@/utils/enumToList";

export default function Relatorios() {
  const validateReportForm = z.object({
    dataInicio: z.string().optional(),
    dataFim: z.string().optional(),
    status: z.nativeEnum(RequestStatusEnum).optional(),
    formaPagamento: z.nativeEnum(PaymentMethodsEnum).optional(),
    clienteId: z.string().optional(),
  });

  type ValidateReport = z.infer<typeof validateReportForm>;

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<ValidateReport>({
    resolver: zodResolver(validateReportForm),
  });

  const submitFormReport = async (data: ValidateReport) => {
    try {
      await toast.promise(requestReport(data), {
        error: (error) => error.message,
        loading: "Gerando Relatório",
        success: (data) => {
          window.open(data, "_blank");

          return "Gerado com sucesso";
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="relative max-w-xl">
      <h2 className="dark:text-white my-2 text-2xl">Relatório de Pedidos</h2>

      <Box>
        <form onSubmit={handleSubmit(submitFormReport)} className="grid gap-4">
          <Input type="datetime-local" label="Data de Inicio" />
          <Input type="datetime-local" label="Data Final" />
          <ComboBox
            label="Status"
            errorMessage={errors.status?.message}
            value={watch("status")}
            values={enumToList(RequestStatusEnum)}
            onChangeValue={(value) =>
              setValue("status", value as RequestStatusEnum)
            }
          />
          <ComboBox
            label="Forma de Pagamento"
            value={watch("formaPagamento")}
            errorMessage={errors.formaPagamento?.message}
            values={enumToList(PaymentMethodsEnum)}
            onChangeValue={(value) =>
              setValue("formaPagamento", value as PaymentMethodsEnum)
            }
          />
          <Input
            {...register("clienteId")}
            errorMessage={errors.clienteId?.message}
            type="text"
            label="Cliente"
            placeholder="Digite o código do cliente"
          />

          <Button>Gerar relatório</Button>
        </form>
      </Box>
    </div>
  );
}
