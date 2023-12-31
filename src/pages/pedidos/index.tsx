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
import { BsCartPlus, BsPencil, BsTrash, BsX, BsPlus, BsBoxArrowInUpRight } from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { any, z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { get, max } from "lodash";
import {
  GetRequests,
  getAllRequests,
} from "@/services/api/requests/get-all-requests";
import { Textarea } from "@/components/Textarea";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import ComboBox from "@/components/ComboBox";
import { InputTable } from "@/components/InputTable";
import { getAllProducts } from "@/services/api/products/get-all-products";
import { getAllClients } from "@/services/api/clients/get-all-clients";
import FormPedido from "./FormPedido";
import { useRouter } from "next/router";
import { error } from "console";
import toast from "react-hot-toast";
import { deleteRequest } from "@/services/api/requests/delete-requests";
import { OrderRequest, RequestItem } from "@/types/request";
import { tr } from "@faker-js/faker";
import { Product } from "@/types/product";
import ProductCard from "@/components/CardProduct/CardStack";
import { enumDecode } from "@/utils/enumDecode";
import { RequestStatusEnum } from "@/types/enum/request.status.enum";
import { enumEncode } from "@/utils/enumEncode";
import { CategoryEnum } from "@/types/enum/category.enum";
import { enumToList } from "@/utils/enumToList";

type PedidosProps = {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pedidos: {
    content?: OrderRequest[];
    pagination: Pagination;
  };
  clientes?: {
    content?: Client[];
    pagination: Pagination;
  };
  produtos: Product[];
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const pageQueries = query as GetRequests;

  const pedidos = await getAllRequests({
    cliente: pageQueries.cliente,
    perPage: pageQueries.perPage,
    page: pageQueries.page,
  });

  const produtos = await getAllProducts();

  const clientes = await getAllClients({
    perPage: pageQueries.perPage,
    page: pageQueries.page,
  });

  return {
    props: {
      pedidos: pedidos,
      produtos: produtos,
      clientes: clientes,
    },
  };
};

export default function Pedidos({ pedidos, clientes, produtos }: PedidosProps) {
  const [isOpenPedidoEdit, setIsOpenPedidoEdit] = useState(false);
  const [isOpenPedidoRegister, setIsOpenPedidoRegister] = useState(false);
  const [isOpenPedidoDetails, setIsOpenPedidoDetails] = useState(false);
  const [pedidoToEdit, setPedidoToEdit] = useState<OrderRequest>();

  const [listaItensDoPedido, setListaItensDoPedido] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const { reload, push, query } = useRouter();

  const pageQueries = query;

  const handlePageChange = (page: any) => {
    query.page = page;
    push({
      query: query,
    });
  };

  const deletarPedido = async (id: number) => {
    try {
      toast.promise(deleteRequest(id), {
        loading: "Deletando",
        success: (data) => {
          reload();
          return data.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      toast.error(error.responde.data.message);
    }
  };
  const setarPedidoEdicao = (id: number) => {
    const pedido = pedidos.content?.find((pedido) => pedido.id == id);
    console.log(pedido)
    setPedidoToEdit(pedido);
    setIsOpenPedidoEdit(!isOpenPedidoEdit);
  };
  const onPageChange = (page: number) => {
    if (page != Number(pageQueries.page)) {
      push({
        query: {
          ...pageQueries,
          page: page ?? "",
        },
      });
    }
  };

  const [searchProducts, setSearchProduct] = useState({
    cliente: "",
    //categoria: ""
  });

  const search = () => {
    push({
      query: {
        ...pageQueries,
        ...searchProducts,
        cliente: searchProducts.cliente,
        // categoria: searchProducts.categoria
      },
    });
  };

  /* 
  interface FormPedidoType {
    formPedidoIsOpen: boolean;
    titleModal: String;
    toogleFormPedido: () => void;
    submitFormPedido: () => void;
  }
   */

  const [showItensModal, setShowItensModal] = useState<boolean>(false);
  const [itensModal, setItensModal] = useState<RequestItem[]>();

  const toggleShowModalItens = (idPedido: number) => {
    const pedido = pedidos.content?.find((pedido) => pedido.id == idPedido);

    const itensPedido = pedido?.itensPedido;

    setItensModal(itensPedido);

    setShowItensModal(true);
  };
  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <FormPedido
          formPedidoIsOpen={isOpenPedidoRegister}
          toggleFormPedido={() => setIsOpenPedidoRegister(false)}
          titleModal={"Cadastrar Pedido"}
        />
        <FormPedido
          formPedidoIsOpen={isOpenPedidoEdit}
          toggleFormPedido={() => setIsOpenPedidoEdit(false)}
          titleModal={"Editar Pedido"}
          pedidoEdicao={pedidoToEdit}
        />
        <div className="flex justify-between m-1 max-h-12">
          <div className="flex items-center h-full gap-2">
            <div className="flex items-center h-full">
              <Input
                value={searchProducts.cliente}
                onChange={(e) => {
                  setSearchProduct({
                    ...searchProducts,
                    cliente: e.target.value,
                  });
                }}
                placeholder="Buscar pedido por cliente"
              />
            </div>
            {/*            <div className="w-full">
              <ComboBox
                className="col-span-1 md:col-span-6"
                value={searchProducts.categoria}
                values={([{ value: "", name: "Todos" }]).concat(enumToList(CategoryEnum))}
                onChangeValue={(value) =>
                  setSearchProduct({ ...searchProducts, categoria: value })
                }
              />
            </div> */}
            <div>
              <Button onClick={search}>Buscar</Button>
            </div>
          </div>
          <div className="flex">
            <Button
              onClick={() => setIsOpenPedidoRegister(!isOpenPedidoRegister)}
            >
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Pedido
              </div>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-theme-dark.100 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={[
                "ID",
                "Cliente",
                "Itens",
                " ",
                "Data Entrega",
                "Status",
                "Valor Total",
                "Ações",
              ]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {pedidos.content?.map((pedido) => (
                <>
                  <Modal
                    isOpen={showItensModal}
                    title={`Itens do pedido ${pedido.id}`}
                    toggle={() => setShowItensModal(false)}
                    classname="bg-opacity-[0.08]"
                  >
                    <div className="flex gap-4">
                      {itensModal?.map((item) => {
                        const images = item.produto.imagensProduto.map(
                          (images) => images.path
                        );
                        return (
                          <div className="flex flex-col">
                            <ProductCard
                              category={item.produto.categoria?.descricao}
                              name={item.produto.descricao}
                              images={images}
                              requestInfos={{ quantidade: item.quantidade, valorUnitario: item.valorUnitario, unidade: item.produto.unidade, observacao: item.observacao }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Modal>
                  <Table.Tr
                    key={pedido.id}
                    className="bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.50 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <Table.Td className="w-4 p-4">{pedido.id}</Table.Td>
                    <Table.Td
                      scope="row"
                      className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {pedido.cliente.nome}
                    </Table.Td>
                    <Table.Td>
                      {pedido.itensPedido.map((value) => value.produto.descricao.concat(' / '))}
                    </Table.Td>
                    <Table.Td>
                      <ButtonTable
                        onClick={() => toggleShowModalItens(pedido.id)}
                      >
                        <BsBoxArrowInUpRight className={"text-lg"} />
                      </ButtonTable>
                    </Table.Td>
                    <Table.Td>
                      {moment(pedido.dataEntrega)
                        .locale("pt-br")
                        .format("DD/MM/YYYY")}
                    </Table.Td>
                    <Table.Td>{enumDecode(RequestStatusEnum, pedido.status)}</Table.Td>
                    <Table.Td>R$ {pedido.valorTotal.toFixed(2)}</Table.Td>
                    <Table.Td isButton={true}>
                      <div className="flex gap-3 mx-2">
                        <ButtonTable
                          onClick={() => setarPedidoEdicao(pedido.id)}
                        >
                          <BsPencil className={"text-lg"} />
                        </ButtonTable>
                        <ButtonTable
                          variant="red"
                          onClick={() => deletarPedido(pedido.id)}
                        >
                          <BsTrash className={"text-lg"} />
                        </ButtonTable>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                </>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <div className="sticky bottom-2 mt-4">
          <Pagination
            totalPages={pedidos.pagination?.totalPages}
            totalItems={pedidos.pagination?.totalItems}
            nextPage={pedidos.pagination?.nextPage}
            prevPage={pedidos.pagination?.prevPage}
            currentPage={Number(pedidos.pagination?.currentPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}
