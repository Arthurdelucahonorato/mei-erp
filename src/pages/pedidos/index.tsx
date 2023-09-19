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
    cliente: z.string().nonempty("Campo obrigatório"),
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

  const submitForm = async ({ cliente }: ValidateData) => {
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
        >
          <div>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(submitForm)}>
              <Input
                {...register("cliente")}
                label="Cliente"
                htmlFor="cliente"
                errorMessage={errors.cliente?.message}
                type="text"
                placeholder="Código do cliente"
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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Itens
                </th>
                <th scope="col" className="px-6 py-3">
                  Data Retirada
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto bg-red-400 p">
              {paginatePosts.map((post: any) => (
                <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">{post.id}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {post.cliente}
                  </th>
                  <td className="px-6 py-4">{post.itensPedido.join(", ")}</td>
                  <td className="px-6 py-4">
                    {moment(post.dataRetirada).locale("pt-br").format("L")}
                  </td>
                  <td className="px-6 py-4">R$ {post.valorTotal}</td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => toggleDetails()}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
