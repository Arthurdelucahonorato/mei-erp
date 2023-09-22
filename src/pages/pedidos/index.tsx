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
import { BsCartPlus } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { max } from "lodash";

interface PedidosProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pedidos: any[];
}

export async function getServerSideProps() {
  const request = await api.get("/pedidos");

  const pedidos = await request.data;

  console.log(pedidos);

  return {
    props: {
      pedidos: pedidos,
    },
  };
}

export default function Pedidos({ pedidos }: PedidosProps): JSX.Element {
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
    nomeProduto: z.string().nonempty("Campo obrigatório"),
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

  const submitForm = async ({ codigoCliente, nomeCliente, codigoProduto, nomeProduto, dataPedido, quantidade, valorTotal }: ValidateData) => {
    try {
      console.log("algo")
    } catch (error: any) {
      return;
    }
  };

  const paginatePosts = paginate(pedidos, currentPage, pageSize);

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <Modal
          isOpen={isOpenDetails}
          toggle={toggleDetails}
          title={"Detalhes do Pedidos"}
        >
          Conteudo do modal
        </Modal>
        <Modal
          isOpen={isOpenSale}
          toggle={toggleSale}
          title={"Cadastrar Pedido"}
          className="w-[30rem] h-[33em]"
        >
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitForm)}>
              <div className="flex flex-row gap-4">
                <Input
                  {...register("codigoCliente")}
                  label="Código Cliente"
                  htmlFor="codigoCliente"
                  errorMessage={errors.codigoCliente?.message}
                  type="number"
                  placeholder="Código do cliente"
                  className="w-40"
                />
                <Input
                  {...register("nomeCliente")}
                  label="Nome Cliente"
                  htmlFor="nomeCliente"
                  errorMessage={errors.nomeCliente?.message}
                  type="text"
                  placeholder="Nome do Cliente"
                  className="w-64"
                />
              </div>
              <div className="flex flex-row gap-4">
                <Input
                    {...register("codigoProduto")}
                    label="Código Produto"
                    htmlFor="codigoProduto"
                    errorMessage={errors.codigoProduto?.message}
                    type="number"
                    placeholder="Codigo do Produto"
                    className="w-40"
                  />
                <Input
                    {...register("nomeProduto")}
                    label="Nome Produto"
                    htmlFor="nomeProduto"
                    errorMessage={errors.nomeProduto?.message}
                    type="number"
                    placeholder="Nome do Produto"
                    className="w-64"
                  />
              </div>

              <Input
                {...register("dataPedido")}
                label="Data do Pedido"
                htmlFor="dataPedido"
                errorMessage={errors.dataPedido?.message}
                type="date"
                placeholder="Data do Pedido"
                className="w-64"
              />
              <Input
                {...register("quantidade")}
                label="Quantidade"
                htmlFor="quantidade"
                errorMessage={errors.quantidade?.message}
                type="number"
                placeholder="Quantidade"
                className="w-64"
              />
              <Input
                {...register("valorTotal")}
                label="Valor Total"
                htmlFor="valorTotal"
                errorMessage={errors.valorTotal?.message}
                type="number"
                placeholder="Valor Total"
                className="w-64"
              />

              
            </form>
          </div>
        </Modal>
        <div className="flex justify-between m-1 max-h-12">
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => toggleSale()}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Pedido
              </div>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <Table.Header headers={["ID","Cliente","Itens","Data Retirada","Valor Total", "Action"]} className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" />
              <Table.Body className="overflow-y-auto bg-red-400 p">
                {paginatePosts.map((post: any) => (
                  <Table.Tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <Table.Td className="w-4 p-4">{post.id}</Table.Td>
                    <Table.Td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{post.cliente}</Table.Td>
                    <Table.Td className="px-6 py-4">{post.itensPedido.join(", ")}</Table.Td>
                    <Table.Td className="px-6 py-4">{moment(post.dataRetirada).locale("pt-br").format("L")}</Table.Td>
                    <Table.Td className="px-6 py-4">{post.valorTotal}</Table.Td>
                    <Table.Td className="px-6 py-4">
                    <a
                        onClick={() => toggleDetails()}
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Detalhes
                      </a>
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
