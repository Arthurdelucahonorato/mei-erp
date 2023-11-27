import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import { GetServerSidePropsContext } from "next";
import { api } from "@/services/api/api";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import moment from "moment";
import "moment/locale/pt-br";
import {
  BsCartPlus,
  BsPencil,
  BsTrash,
  BsX,
  BsPlus,
  BsSubtract,
} from "react-icons/bs";
import { MountTransition } from "@/components/AnimatedRoutes/MountTransition";
import { Input } from "@/components/Input";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@/components/Table/index";
import { RootTable } from "@/components/Table/RootTable";
import { get, max } from "lodash";
import { getAllRequests } from "@/services/api/requests/get-all-requests";
import { Textarea } from "@/components/Textarea";
import { ButtonTable } from "@/components/Table/ButtonTable";
import Lov from "@/components/Lov";
import ComboBox from "@/components/ComboBox";
import { InputTable } from "@/components/InputTable";
import { getAllProducts } from "@/services/api/products/get-all-products";
import { getAllClients } from "@/services/api/clients/get-all-clients";
import { useRouter } from "next/router";
import { OrderStats, Unit } from "@/types/enum/unit.enum";
import { OrderRequest } from "@/types/request";
import { Product } from "@/types/product";
import toast from "react-hot-toast";
import { editRequest } from "@/services/api/requests/edit-request";
import { registerRequest } from "@/services/api/requests/register-request";

interface FormPedidosType {
  formPedidoIsOpen: boolean;
  titleModal: String;
  toggleFormPedido: () => void;
  pedidoEdicao?: OrderRequest;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const pageQueries = query as PaginationParams;

  const pedidos = await getAllRequests({
    perPage: pageQueries.perPage,
    page: pageQueries.page,
  });

  console.log("produtos");

  return {
    props: {
      pedidos: pedidos,
    },
  };
};

const ValoresFormaPagamento = [
  { value: "PIX", name: "Pix" },
  { value: "A_VISTA", name: "A vista" },
  { value: "CARTAO_CREDITO", name: "Cartão Crédito" },
  { value: "CARTAO_DEBITO", name: "Cartão Débito" },
  { value: "BOLETO", name: "boleto" },
];

export default function FormPedido({
  formPedidoIsOpen,
  titleModal,
  toggleFormPedido,
  pedidoEdicao,
}: FormPedidosType) {
  const [openModalProducts, setOpenModalProducts] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<PaginatedResult<Product[]>>();
  const [clientes, setClientes] = useState<PaginatedResult<Client[]>>();

  async function buscarProdutos() {
    return await getAllProducts();
  }
  async function buscarClientes() {
    return await getAllClients();
  }
  useLayoutEffect(() => {
    buscarProdutos().then((produto) => setProdutos(produto));
    buscarClientes().then((cliente) => setClientes(cliente));
    console.log("produtos");
  }, []);

  useEffect(() => {
    if (pedidoEdicao) {
      /* 
              id: number;
              createdAt: Date;
              cliente: number;
              dataRetirada: Date;
              itensPedido: Product[];
              valorTotal: number; */

      setValue("codigoCliente", pedidoEdicao.cliente.id);
      // setValue("dataPedido", pedidoEdicao.createdAt);
      //  setValue("dataEntrega", pedidoEdicao.dataRetirada);
    }
  }, [pedidoEdicao]);

  const { reload } = useRouter();

  const onClickLov = (selectedValue: any) => {
    setValue("codigoCliente", selectedValue.id);
    setValue("nomeCliente", selectedValue.nome);
  };
  const onChangeComboBox = (selectedValue: string) => {
    console.log("selectedValue", selectedValue);
    setValue("formaPagamento", selectedValue);
    console.log(getValues("formaPagamento"));
  };

  const validateRegister = z.object({
    codigoCliente: z.number({ required_error: 'Campo obrigatório', invalid_type_error: 'Campo obrigatório' }),
    nomeCliente: z.string({ required_error: 'Campo obrigatório' }),
    dataPedido: z.string().nonempty("Campo obrigatório"),
    dataEntrega: z.string().nonempty("Campo obrigatório"),
    status: z.string({ required_error: 'Campo obrigatório' }),
    formaPagamento: z.string({ required_error: 'Campo obrigatório' }),
    modalidadeEntrega: z.string({ required_error: 'Campo obrigatório' }),
    observacao: z.string().nonempty("Campo obrigatório"),
    itensPedido: z.array(
      z.object({
        id: z.string(),
        produtoId: z.string().transform((value) => Number(value)),
        produtoDescricao: z.string(),
        categoria: z.string(),
        unidade: z.string(),
        quantidade: z.string().transform((value) => Number(value)),
        observacao: z.string(),
        valorUnitario: z.string().transform((value) => Number(value)),
        imagem: z.string(),
      })
    ),
  });

  type ValidateData = z.infer<typeof validateRegister>;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateData>({
    mode: "onSubmit",
    resolver: zodResolver(validateRegister),
  });

  const { append, fields, remove, update, } = useFieldArray({
    name: "itensPedido",
    control: control,
  });

  const removeProduto = (produtoId: number) => {
    const index = fields.findIndex((field) => field.produtoId === produtoId);
    if (index !== -1) {
      remove(index);
    }
  };

  const submitFormRegister = async (data: ValidateData) => {
    try {
      toast.promise(registerRequest(data), {
        loading: "Salvando novo pedido",
        success: (d) => {
          reload();
          return d.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
      return;
    }
  };

  const submitFormEdit = async (id: number, data: ValidateData) => {
    console.log(data);
    try {
      toast.promise(editRequest(id, data), {
        loading: "Salvando alterações do pedido",
        success: (d) => {
          reload();
          return d.message;
        },
        error: (error) => error.response.data.message,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
      return;
    }
  };


  const lovValues = {
    title: "Seleção de Cliente",
    listValues: clientes,
    listLabels: ["ID", "Nome", "Telefone", "E-mail"],
    onClick: onClickLov,
  };
  return (
    <Modal
      isOpen={formPedidoIsOpen}
      toggle={toggleFormPedido}
      title={titleModal}
    >
      <Modal
        isOpen={openModalProducts}
        toggle={() => setOpenModalProducts(false)}
        title={"Buscar produto"}
      >
        <Table.Root>
          <Table.Header
            headers={[
              "ID",
              "Nome",
              "Categoria",
              "Unidade",
              "Ações",
            ]}
          />
          <Table.Body className="overflow-y-auto">
            {produtos?.content?.map((produto) => (
              <Table.Tr
                key={produto.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Table.Td className="w-4 p-4">{produto.id}</Table.Td>
                <Table.Td
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {produto.descricao}
                </Table.Td>
                <Table.Td>{produto.categoria}</Table.Td>
                <Table.Td>{produto.unidade}</Table.Td>
                <Table.Td isButton={true}>
                  <div className="flex flex-1 flex-row justify-center max-w-xs gap-3 mx-2">
                    {fields.some((field) => field.produtoId === produto.id) ? (
                      <Button
                        className="text-black !bg-red-700"
                        onClick={() => removeProduto(produto.id)}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        className="text-black !bg-green-700"
                        onClick={() => {
                          append({
                            id: '',
                            produtoId: produto.id,
                            produtoDescricao: produto.descricao,
                            categoria: produto.categoria,
                            unidade: produto.unidade,
                            observacao: "",
                            quantidade: 1,
                            valorUnitario: 0,
                            imagem: "",
                          });
                        }}
                      >
                        +
                      </Button>
                    )}
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Body>
        </Table.Root>
      </Modal>
      <form
        className="max-w-3xl grid gap-4 grid-cols-3 px-3 md:grid-cols-12"
        onSubmit={handleSubmit((data) =>
          pedidoEdicao
            ? submitFormEdit(pedidoEdicao.id, data)
            : submitFormRegister(data)
        )}
      >
        <Input
          containerClassName="col-span-1 md:col-span-3"
          {...register("codigoCliente")}
          label="Codigo do Cliente"
          htmlFor="codigoCliente"
          errorMessage={errors.codigoCliente?.message}
          type="number"
          placeholder="Codigo do Cliente"
          required
          lovButton={lovValues}
        />
        <Input
          containerClassName="col-span-2 md:col-span-9"
          {...register("nomeCliente")}
          label="Nome"
          htmlFor="nomeCliente"
          errorMessage={errors.nomeCliente?.message}
          type="text"
          placeholder="Nome do Cliente"
          disabled
        />
        <Input
          containerClassName="col-span-1 md:col-span-4"
          {...register("dataPedido")}
          label="Data do Pedido"
          htmlFor="dataPedido"
          errorMessage={errors.dataPedido?.message}
          type="date"
          placeholder="Data do Pedido"
          required
        />
        <ComboBox
          // {...register("formaPagamento")}
          className="col-span-1 md:col-span-4"
          value={watch("formaPagamento")}
          values={ValoresFormaPagamento}
          label="Forma de Pagamento"
          errorMessage={errors.formaPagamento?.message}
          required
          onChangeValue={(value) => {
            setValue("formaPagamento", value);
          }}
        />
        <ComboBox
          // {...register("status")}
          className="col-span-1 md:col-span-4"
          value={watch("status")}
          values={
            //Temporario, arrumar depois isso
            [
              { value: 'ACEITO', name: 'Aceito' },
              { value: 'VALOR 2', name: 'Valor 2' }
            ]
          }
          label="Status"
          errorMessage={errors.status?.message}
          required
          onChangeValue={(value) => {
            setValue("status", value);
          }}
        />
        <Input
          containerClassName="col-span-1 md:col-span-4"
          {...register("dataEntrega")}
          label="Data da Entrega"
          htmlFor="dataEntrega"
          errorMessage={errors.dataEntrega?.message}
          type="date"
          placeholder="Data da Entrega"
          required
        />
        <ComboBox
          // {...register("modalidadeEntrega")}
          className="col-span-1 md:col-span-4"
          value={watch("modalidadeEntrega")}
          values={
            //Temporario, arrumar depois isso
            [
              { value: 'RETIRADA', name: 'Retirar no local' },
              { value: 'DELIVERY', name: 'Entregar' }
            ]
          }
          label="Modalidade Entrega"
          errorMessage={errors.modalidadeEntrega?.message}
          required
          onChangeValue={(value) => {
            setValue("modalidadeEntrega", value);
          }}
        />

        <Input
          {...register("observacao")}
          containerClassName="col-span-3 md:col-span-12"
          label="Observação"
          htmlFor="observacao"
          type="text"
          placeholder="Observação"
        />
        <div className="col-span-3 md:col-span-12 ">
          <div className="max-h-14 max-w-full overflow-y-hidden">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-full">
              <div className="flex flex-row gap-2 sticky top-0 py-2.5 font-bold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-theme-dark.100 dark:text-gray-400 justify-center items-center rounded-lg pr-[8px]">
                <text className="pl-2 w-20">ID</text>
                <text className="pl-2 w-60">Produto</text>
                <text className="pl-2 w-44">Categoria</text>
                <text className="pr-2 w-16 text-end">QTD</text>
                <text className="pr-2 w-32 text-end">Valor</text>
                <text className="pl-2 w-20">UN</text>
                <div className="flex flex-1 flex-row justify-center items-center max-w-md">
                  <button
                    type="button"
                    className="flex justify-center w-6 aspect-square mx-3.5"
                    onClick={
                      () => setOpenModalProducts(true)
                      // append({
                      //   produtoId: 5,
                      //   valorUnitario: 1.0,
                      //   observacao: "Teste",
                      //   quantidade: 6,
                      // })
                    }
                  >

                    <BsPlus
                      className={
                        "text-2xl cursor-pointer text-white bg-primary dark:bg-secondary rounded-lg"
                      }
                    />
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="max-h-32 max-w-full overflow-x-auto mt-1 rounded-lg">
            <ul className="overflow-y-auto">
              {fields.map((itemPedido, index) => (
                <li
                  key={itemPedido.id}
                  className="flex flex-row gap-2 justify-center items-center bg-white border-b dark:bg-theme-dark.150 dark:border-theme-dark.200 hover:bg-gray-50 dark:hover:bg-theme-dark.150"
                >
                  <InputTable disabled
                    className="w-20"
                    {...register(`itensPedido.${index}.id`)}
                  />
                  <InputTable disabled
                    className="w-60 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    {...register(`itensPedido.${index}.produtoDescricao`)}
                  />
                  <InputTable disabled
                    className="w-44"
                    {...register(`itensPedido.${index}.categoria`)}
                  />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-16"
                    {...register(`itensPedido.${index}.quantidade`)}
                  />
                  <InputTable
                    textDirection={"text-end"}
                    className="w-32"
                    {...register(`itensPedido.${index}.valorUnitario`)}
                  />
                  <InputTable
                    disabled
                    className="w-20"
                    {...register(`itensPedido.${index}.unidade`)}

                  />
                  <div className="flex flex-1 flex-row justify-center items-center max-w-md gap-3 mr-2">
                    <ButtonTable variant="red" className="text-white">
                      <BsX className={"text-xl"} />
                    </ButtonTable>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end col-span-3 md:col-span-12">
          <div>
            <Button type="submit">{titleModal}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
