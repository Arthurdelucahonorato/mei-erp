import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ButtonTable } from "@/components/Table/ButtonTable";
import { Table } from "@/components/Table/index";
import { deleteClient } from "@/services/api/clients/delete-client";
import {
  GetClients,
  getAllClients,
} from "@/services/api/clients/get-all-clients";
import "moment/locale/pt-br";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCartPlus, BsPencil, BsTrash } from "react-icons/bs";
import FormCliente from "./FormCliente";
import Pagination from "@/components/Pagination";
import { GetServerSidePropsContext } from "next";

type ClienteProps = {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  clientes: {
    content: Client[];
    pagination: Pagination;
  };
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const pageQueries = query as GetClients;

  const clientes = await getAllClients({
    nomeCliente: pageQueries.nomeCliente,
    perPage: pageQueries.perPage,
    page: pageQueries.page,
  });

  return {
    props: {
      clientes: clientes,
    },
  };
};

export default function Clientes({ clientes }: ClienteProps) {
  const [isOpenClienteRegister, setIsOpenClienteRegister] = useState(false);
  const [isOpenClienteEdit, setIsOpenClienteEdit] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client>();

  const { reload, query, push } = useRouter();

  const pageQueries = query as PaginationParams;

  const onPageChange = (page: number) => {
    if (page != Number(pageQueries.page)) {
      push({
        query: {
          page: page,
        },
      });
    }
  };

  const deletarCliente = async (id: number) => {
    try {
      toast.promise(deleteClient(id), {
        loading: "Deletando",
        success: (data) => {
          reload();
          return data.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const setarClienteEdicao = (id: number) => {
    const cliente = clientes.content.find((cliente) => cliente.id == id);
    setClientToEdit(cliente);
    setIsOpenClienteEdit(!isOpenClienteEdit);
  };

  const [searchClients, setSearchClients] = useState({
    nomeCliente: "",
  });

  const search = () => {
    push({
      query: {
        ...pageQueries,
        ...searchClients,
        nomeCliente: searchClients.nomeCliente,
      },
    });
  };

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">
        <FormCliente
          formClienteIsOpen={isOpenClienteRegister}
          titleModal={"Cadastrar Cliente"}
          toggleFormCliente={() => setIsOpenClienteRegister(false)}
        />
        <FormCliente
          formClienteIsOpen={isOpenClienteEdit}
          titleModal={"Editar Cliente"}
          toggleFormCliente={() => setIsOpenClienteEdit(false)}
          clienteEdicao={clientToEdit}
        />

        <div className="flex justify-between my-1 max-h-12">
          <div className="flex items-center h-full gap-2">
            <div className="flex items-center h-full">
              <Input
                value={searchClients.nomeCliente}
                onChange={(e) => {
                  setSearchClients({
                    ...searchClients,
                    nomeCliente: e.target.value,
                  });
                }}
                placeholder="Buscar cliente pelo nome"
              />
            </div>
            {/* <div className="w-full">
              <ComboBox
                className="col-span-1 md:col-span-6"
                value={watch("categoriaId")?.toString()}
                values={categoriasOpt}
                onChangeValue={(value) =>
                  setSearchProduct({
                    ...searchClient,
                    categoria: value,
                  })
                }
              />
            </div> */}
            <div>
              <Button onClick={search}>Buscar</Button>
            </div>
          </div>
          <div className="flex ">
            <Button
              onClick={() => setIsOpenClienteRegister(!isOpenClienteRegister)}
            >
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Cliente
              </div>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-theme-dark.100 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={["ID", "Nome", "Telefone", "E-mail", "Endereço", ""]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {clientes.content.map((cliente) => (
                <Table.Tr
                  key={cliente.id}
                  className="bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.50 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Table.Td className="w-4 p-4">{cliente.id}</Table.Td>
                  <Table.Td
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cliente.nome}
                  </Table.Td>
                  <Table.Td>{cliente.telefone}</Table.Td>
                  <Table.Td>{cliente.email}</Table.Td>
                  <Table.Td>
                    {cliente?.endereco?.cidade +
                      " - " +
                      cliente?.endereco?.bairro +
                      " - " +
                      cliente?.endereco?.rua +
                      " - " +
                      cliente?.endereco?.numero}
                  </Table.Td>
                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable
                        onClick={() => setarClienteEdicao(cliente.id)}
                      >
                        <BsPencil className={"text-lg"} />
                      </ButtonTable>
                      <ButtonTable
                        variant="red"
                        onClick={() => deletarCliente(cliente.id)}
                      >
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
            totalPages={clientes.pagination.totalPages}
            totalItems={clientes.pagination.totalItems}
            nextPage={clientes.pagination.nextPage}
            prevPage={clientes.pagination.prevPage}
            currentPage={Number(clientes.pagination.currentPage)}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </MountTransition>
  );
}
