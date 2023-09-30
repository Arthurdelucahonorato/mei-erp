import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment from "moment";
import "moment/locale/pt-br";
import { BsCartPlus, BsPencil, BsTrash } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { max } from "lodash";
import { getAllRequests } from "@/services/api/adm/get-all-requests";
import { Textarea } from "@/components/Textarea";
import { ButtonTable } from "@/components/Table/ButtonTable";

interface PedidosProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pedidos: ClientRequest[];
}

export async function getServerSideProps() {
  const pedidos = await getAllRequests("pedidos");

  return {
    props: {
      pedidos: pedidos,
    },
  };
}

export default function Pedidos({ pedidos }: PedidosProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenPedidoEdit, setIsOpenPedidoEdit] = useState(false);
  const [isOpenPedidoRegister, setIsOpenPedidoRegister] = useState(false);
  const [isOpenPedidoDetails, setIsOpenPedidoDetails] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDetails = () => {
    setIsOpenPedidoDetails(!isOpenPedidoDetails);
  };

  const togglePedidoRegister = () => {
    setIsOpenPedidoRegister(!isOpenPedidoRegister);
  };

  const togglePedidoEdit = () => {
    setIsOpenPedidoEdit(!isOpenPedidoEdit);
  };

  const validateRegister = z.object({
    codigoCliente: z.string().nonempty("Campo obrigatório"),
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    dataPedido: z.string().nonempty("Campo obrigatório"),
    dataEntrega: z.string().nonempty("Campo obrigatório"),
    status: z.string().nonempty("Campo obrigatório"),
    formaPagamento: z.string().nonempty("Campo obrigatório"),
    modalidadeEntrega: z.string().nonempty("Campo obrigatório"),
    observacao: z.string().nonempty("Campo obrigatório"),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const submitFormRegister = async ({
    codigoCliente,
    nomeCliente,
    dataPedido,
    dataEntrega,
    status,
    formaPagamento,
    modalidadeEntrega,
    observacao,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };
  const submitFormEdit = async ({
    codigoCliente,
    nomeCliente,
    dataPedido,
    dataEntrega,
    status,
    formaPagamento,
    modalidadeEntrega,
    observacao,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };

  const paginatePedidos = paginate(pedidos, currentPage, pageSize);

  interface FormPedidoType {
    formPedidoIsOpen: boolean;
    titleModal: String;
    toogleFormPedido: () => void;
    submitFormPedido: () => void;
  }

  const FormPedido = ({ formPedidoIsOpen, titleModal, toogleFormPedido, submitFormPedido, ...props }: FormPedidoType) => {
    return (
      <Modal
        isOpen={formPedidoIsOpen}
        toggle={toogleFormPedido}
        title={titleModal}
      >
        <form
          className="max-w-2xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
          onSubmit={submitFormPedido}
        >
          <Input className="col-span-1 md:col-span-3"
            {...register("codigoCliente")}
            label="Codigo do Cliente"
            htmlFor="codigoCliente"
            errorMessage={errors.codigoCliente?.message}
            type="text"
            placeholder="Codigo do Cliente"
            required
          />
          <Input className="col-span-2 md:col-span-9"
            {...register("nomeCliente")}
            label="Nome"
            htmlFor="nomeCliente"
            errorMessage={errors.nomeCliente?.message}
            type="text"
            placeholder="Nome do Cliente"
            disabled
          />

          <Input
            className="col-span-1 md:col-span-4"
            {...register("dataPedido")}
            label="Data do Pedido"
            htmlFor="dataPedido"
            errorMessage={errors.dataPedido?.message}
            type="date"
            placeholder="Data do Pedido"
            required
          />

          <Input className="col-span-1 md:col-span-4"
            {...register("formaPagamento")}
            label="Forma de Pagamento"
            htmlFor="formaPagamento"
            errorMessage={errors.formaPagamento?.message}
            type=""
            placeholder="Forma de Pagamento"
            required
          />

          <Input
            {...register("status")}
            className="col-span-1 md:col-span-4"
            label="Status"
            htmlFor="status"
            errorMessage={errors.status?.message}
            type="text"
            placeholder="Status"
            required
          />


          <Input
            className="col-span-1 md:col-span-4"
            {...register("dataEntrega")}
            label="Data da Entrega"
            htmlFor="dataEntrega"
            errorMessage={errors.dataEntrega?.message}
            type="date"
            placeholder="Data da Entrega"
            required
          />

          <Input
            className="col-span-1 md:col-span-4"
            {...register("modalidadeEntrega")}
            label="Modalidade da Entrega"
            htmlFor="modalidadeEntrega"
            errorMessage={errors.modalidadeEntrega?.message}
            type="number"
            placeholder="Modalidade da Entrega"
            required
          />

          <Input
            {...register("observacao")}
            className="col-span-3 md:col-span-12"
            label="Observação"
            htmlFor="observacao"
            type="text"
            placeholder="Observação"
          />
          <div className="flex justify-center col-span-3 md:col-span-12">
            <div>
              <Button onClick={() => submitFormPedido()}>{titleModal}</Button>
            </div>
          </div>
        </form>
      </Modal>
    );

  }
  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <FormPedido
          formPedidoIsOpen={isOpenPedidoRegister}
          toogleFormPedido={togglePedidoRegister}
          titleModal={"Cadastrar Pedido"}
          submitFormPedido={handleSubmit(submitFormRegister)}
        />
        <FormPedido
          formPedidoIsOpen={isOpenPedidoEdit}
          toogleFormPedido={togglePedidoEdit}
          titleModal={"Editar Pedido"}
          submitFormPedido={handleSubmit(submitFormEdit)}
        />
        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => togglePedidoRegister()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Pedido
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={[
                "ID",
                "Cliente",
                "Itens",
                "Data Retirada",
                "Valor Total",
              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {paginatePedidos.map((pedido) => (
                <Table.Tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Table.Td className="w-4 p-4">{pedido.id}</Table.Td>
                  <Table.Td scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">{pedido.cliente}</Table.Td>
                  <Table.Td>{pedido.itensPedido.join(", ")}</Table.Td>
                  <Table.Td>{moment(pedido.dataRetirada).locale("pt-br").format("L")}</Table.Td>
                  <Table.Td>{pedido.valorTotal}</Table.Td>
                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable onClick={() => togglePedidoEdit()} >
                        <BsPencil className={"text-lg"} />
                      </ButtonTable>
                      <ButtonTable className="bg-red-600 dark:bg-red-600 text-white">
                        <BsTrash className={"text-lg"} />
                      </ButtonTable>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="sticky bottom-2 mt-4">
          <Pagination
            items={pedidos.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}
