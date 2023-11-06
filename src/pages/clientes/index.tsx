import { useState } from "react";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
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
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import { api } from "@/services/api/api";
import FormCliente from "./FormCliente";

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


export async function getServerSideProps() {
  const clientes = await api.get("/clients", { data: { perPage: 2, page: 1 } })
  return {
    props: {
      clientes: clientes.data,
    },
  };
}


export default function Clientes({ clientes }: ClienteProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [isOpenClienteRegister, setIsOpenClienteRegister] = useState(false);
  const [isOpenClienteEdit, setIsOpenClienteEdit] = useState(false);
  const [lovIsOpen, setLovIsOpen] = useState(false);
  const [listaClientes, setListaClientes] = useState(clientes);

  const buscarListaClientes = async (pagina: number) => {
    console.log(`Pagina: ${pagina}`)
    const data = { perPage: 2, page: pagina };
    const clientes = await api.get("/clients", { data })
    return clientes.data
  }

  const handlePageChange = async (page: number) => {
    console.log('clientes')
    console.log((await buscarListaClientes(page)));
    setListaClientes((await buscarListaClientes(page)));
  }

  return (
    <MountTransition className="flex flex-1 flex-col h-full justify-between">
      <div className="flex flex-1 flex-col h-full justify-between">

        <FormCliente
          formClienteIsOpen={isOpenClienteRegister}
          titleModal={"Cadastrar Cliente"}
          toogleFormCliente={() => setIsOpenClienteRegister(false)}
        />
        <FormCliente
          formClienteIsOpen={isOpenClienteEdit}
          titleModal={"Editar Cliente"}
          toogleFormCliente={() => setIsOpenClienteEdit(false)}
        />

        <div className="flex justify-between my-1 max-h-12">
          <Input
            className="col-span-2 md:col-span-9 mb-1"
            htmlFor="nome"
            type="text"
            placeholder="Pesquisar"
          />
          <div className="relative"></div>
          <div className="flex aspect-square">
            <Button onClick={() => setIsOpenClienteRegister(!isOpenClienteRegister)}>
              <div className="flex gap-3">
                <BsCartPlus className="text-xl" /> Cadastrar Cliente
              </div>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-700 justify-start overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
          <Table.Root className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
            <Table.Header
              headers={["ID", "Nome", "Telefone", "E-mail", "Endereço"]}
              className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            />
            <Table.Body className="overflow-y-auto">
              {listaClientes.content.map((cliente) => (
                < Table.Tr
                  key={cliente.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                  <Table.Td>{cliente?.endereco?.rua}</Table.Td>
                  <Table.Td isButton={true}>
                    <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                      <ButtonTable onClick={() => console.log('cliquetoogleClienteEdit(cliente)')}>
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
            totalPages={listaClientes.pagination.totalPages}
            perPage={2}
            next={listaClientes.pagination.next}
            prev={listaClientes.pagination.prev}
            lastPage={listaClientes.pagination.lastPage}
            currentPage={listaClientes.pagination.currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </MountTransition >
  );
}
