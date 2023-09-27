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

interface ClienteProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  clientes: ClientRequest[];
}

export async function getServerSideProps() {
  const clientes = await getAllRequests("clientes");

  return {
    props: {
      clientes: clientes,
    },
  };
}

export default function Clientes({ clientes }: ClienteProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenSale, setIsOpenSale] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  const toggleSale = () => {
    setIsOpenSale(!isOpenSale);
  };

  const validateRegister = z.object({
    codigoCliente: z.string().nonempty("Campo obrigatório"),
    nomeCliente: z.string().nonempty("Campo obrigatório"),
    codigoProduto: z.string().nonempty("Campo obrigatório"),
    telefone: z.string().nonempty("Campo obrigatório"),
    dataPedido: z.string().nonempty("Campo obrigatório"),
    quantidade: z.string().nonempty("Campo obrigatório"),
    valorTotal: z.string().nonempty("Campo obrigatório"),
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

  const submitForm = async ({
    codigoCliente,
    nomeCliente,
    codigoProduto,
    telefone,
    dataPedido,
    quantidade,
    valorTotal,
  }: ValidateData) => {
    try {
      console.log("algo");
    } catch (error: any) {
      return;
    }
  };

  const paginateClientes = paginate(clientes, currentPage, pageSize);

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <Modal
          isOpen={isOpenDetails}
          toggle={toggleDetails}
          title={"Detalhes do Cliente"}
        >
          Conteudo do modal
        </Modal>
        <Modal
          isOpen={isOpenSale}
          toggle={toggleSale}
          title={"Cadastrar Cliente"}
        >
          <form
            className="grid gap-4 lg:grid-cols-3 px-3"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* <Input
                  {...register("codigoCliente")}
                  label="Código Cliente"
                  htmlFor="codigoCliente"
                  errorMessage={errors.codigoCliente?.message}
                  type="number"
                  placeholder="Código do cliente"
                  className="w-40"
                /> */}
              <Input
                {...register("nomeCliente")}
                label="Nome"
                htmlFor="nomeCliente"
                errorMessage={errors.nomeCliente?.message}
                type="text"
                placeholder="Nome do Cliente"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                {...register("telefone")}
                label="Telefone"
                htmlFor="telefone"
                errorMessage={errors.telefone?.message}
                type="number"
                placeholder="Telefone"
              />
            </div>
            <Input
              {...register("valorTotal")}
              label="Valor"
              htmlFor="valorTotal"
              errorMessage={errors.valorTotal?.message}
              type="number"
              placeholder="Valor Total"
            />
            <Input
              className="col-span-2 lg:col-span-1"
              {...register("dataPedido")}
              label="Data do Pedido"
              htmlFor="dataPedido"
              errorMessage={errors.dataPedido?.message}
              type="date"
              placeholder="Data do Pedido"
            />
            <Textarea
              className="col-span-3 !h-fit resize-none"
              label="Observações"
              placeholder="Detalhes do pedido"
            />
            <div className="ml-auto col-span-3">
              <Button>Finalizar Pedido</Button>
            </div>
          </form>
        </Modal>
        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => toggleSale()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Cliente
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <Table.Header
              headers={[
                "ID",
                "Nome",
                "Telefone",
                "E-mail",
                "Endereço",
                "Editar",
                "Deletar",
              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {paginateClientes.map((cliente) => (
                <Table.Tr key={cliente.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Table.Td className="w-4 p-4">{cliente.id}</Table.Td>
                  <Table.Td scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">{cliente.nome}</Table.Td>
                  <Table.Td>{cliente.telefone}</Table.Td>
                  <Table.Td>{cliente.email}</Table.Td>
                  <Table.Td>{cliente.endereco}</Table.Td>
                  <Table.Td>
                    <button
                      onClick={() => toggleDetails()}
                      className="font-medium text-gray-500 dark:text-white bg-gray-100 dark:bg-gray-700 p-2 rounded-xl aspect-square"
                    >
                      <BsPencil className={"text-lg"} />
                    </button>
                  </Table.Td>
                  <Table.Td>
                    <button
                      className="font-medium text-white bg-red-600 p-2 rounded-xl aspect-square"
                    >
                      <BsTrash className={"text-lg"} />
                    </button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="sticky bottom-2 mt-4">
          <Pagination
            items={clientes.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}
